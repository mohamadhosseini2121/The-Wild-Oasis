"use server";

import { SignInFormSchema } from "@/app/_lib/definitions";
import { auth, signIn } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { Booking } from "@prisma/client";

export async function signInAction(state: any, formData: FormData) {
  const validationResults = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResults.success) {
    return {
      errors: validationResults.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn("credentials", validationResults.data, {
      redirectTo: "/account",
    });
  } catch (e: any) {
    console.log("error: ", e.message);
    if (isRedirectError(e)) {
      redirect("/account");
    } else {
      return {
        errors: { password: ["Password is Invalid"] },
      };
    }
  }
}

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in");

  const fullName = formData.get("fullname")?.toString() || "";
  const nationalID = formData.get("nationalID")?.toString() || "";
  const [nationality, countryFlag] = formData
    .get("nationality")
    ?.toString()
    .split("%") || ["", ""];

  const updateData = { fullName, nationality, countryFlag, nationalID };

  try {
    const data = await prisma.guest.update({
      where: {
        id: Number(session.user.id),
      },
      data: updateData,
    });
    revalidatePath("/account");
    return data;
  } catch (e: any) {
    console.log("error: ", e.message);
    throw new Error("Guest could not be updated");
  }
}

export async function createBooking(bookingData: Booking, formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in");

  const newBooking: Booking = {
    ...bookingData,
    guestId: Number(session.user.id),
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.toString().slice(0, 1000) || "",
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  let data;

  try {
    data = await prisma.booking.create({
      data: newBooking,
    });
    revalidatePath(`/cabins/${bookingData.cabinId}`);

    // return data;
  } catch (e: any) {
    console.error(e.message);
    throw new Error("Booking could not be created");
  }

  if (data) redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in");

  const guestBookings = await getBookings(Number(session.user.id));
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  try {
    await prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });

    revalidatePath("/account/reservations");
  } catch (e: any) {
    console.error(e.message);
    throw new Error("Booking could not be deleted");
  }
}

export async function updateBooking(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in");

  const bookingId = Number(formData.get("bookingId")?.toString()) || 0;
  const guestBookings = await getBookings(Number(session.user.id));
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const numGuests = Number(formData.get("numGuests")?.toString()) || 0;
  const observations = formData.get("observations")?.toString() || "";
  const updateData = { numGuests, observations };

  try {
    await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: updateData,
    });
    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath(`/account/reservations`);
  } catch (e: any) {
    console.log("error: ", e.message);
    throw new Error("Reservations could not be updated");
  }
}
