import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import prisma from "@/app/_lib/db";
import { Booking, Cabin, Guest, Prisma } from "@prisma/client";

/////////////
// GET

export async function getCabin(id: number) {
  try {
    const data = await prisma.cabin.findUnique({
      where: {
        id,
      },
    });

    if (!data) throw new Error(`cabin ${id} not found`);
    return data;
  } catch (e: any) {
    console.log(e.message);
    notFound();
  }
}

export async function getCabinPrice(id: number) {
  try {
    const data = await prisma.cabin.findUnique({
      where: {
        id,
      },
    });
    if (!data) throw new Error(`cabin ${id} not found`);

    return { regularPrice: data.regularPrice, discount: data.discount };
  } catch (e: any) {
    console.error(e.message);
  }
}

export const getCabins = async function () {
  try {
    const data = await prisma.cabin.findMany();
    return data;
  } catch (e: any) {
    console.error(e);
    throw new Error("Cabins could not be loaded");
  }
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  try {
    const data = await prisma.guest.findFirst({
      where: {
        email,
      },
    });
    if (!data) throw new Error(`Guest with email ${email} not found`);

    return data;
  } catch (e: any) {
    console.error(e.message);
  }
}

export async function getBooking(id: number) {
  try {
    const data = await prisma.booking.findUnique({
      where: {
        id,
      },
    });

    if (!data) throw new Error(`Booking ${id} not found`);
    return data;
  } catch (e: any) {
    console.log(e.message);
    throw new Error("Booking could not get loaded");
  }
}

export async function getBookings(guestId: number) {
  try {
    const data = await prisma.booking.findMany({
      select: {
        id: true,
        createdAt: true,
        startDate: true,
        endDate: true,
        numNights: true,
        numGuests: true,
        totalPrice: true,
        guestId: true,
        cabinId: true,
        cabin: true,
      },
      where: {
        guestId,
      },
      orderBy: {
        startDate: "desc",
      },
    });
    return data;
  } catch (e: any) {
    console.log(e.message);
    throw new Error("Booking could not get loaded");
  }
}

export async function getBookedDatesByCabinId(cabinId: number) {
  let date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  const today = date.toISOString();

  // Getting all bookings
  try {
    const data = await prisma.booking.findMany({
      where: {
        cabinId,
        OR: [
          {
            startDate: {
              gte: today,
            },
            status: "unconfirmed",
          },
        ],
      },
    });

    // Converting to actual dates to be displayed in the date picker
    const bookedDates = data
      .map((booking) => {
        return eachDayOfInterval({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        });
      })
      .flat();

    return bookedDates;
  } catch (e: any) {
    console.error(e);
    throw new Error("Bookings could not get loaded");
  }
}

export async function getSettings() {
  try {
    const data = await prisma.setting.findFirst();

    if (!data) throw new Error("Settings could not be loaded");

    return data;
  } catch (e: any) {
    console.log(e.message);
    throw new Error("Settings could not be loaded");
  }
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

// export async function createGuest(newGuest: Guest) {
//   try {
//     const data = await prisma.guest.create({
//       data: newGuest,
//     });

//     return data;
//   } catch (e: any) {
//     console.error(e.message);
//     throw new Error("Guest could not be created");
//   }
// }

// export async function createBooking(newBooking: Booking) {
//   try {
//     const data = await prisma.booking.create({
//       data: newBooking,
//     });

//     return data;
//   } catch (e: any) {
//     console.error(e.message);
//     throw new Error("Booking could not be created");
//   }
// }

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
// export async function updateGuest(id: number, updatedFields: Guest) {
//   try {
//     const data = await prisma.guest.update({
//       where: {
//         id,
//       },
//       data: updatedFields,
//     });

//     return data;
//   } catch (e: any) {
//     console.error(e.message);
//     throw new Error("Guest could not be updated");
//   }
// }

// export async function updateBooking(id: number, updatedFields: Booking) {
//   try {
//     const data = await prisma.booking.update({
//       where: {
//         id,
//       },
//       data: updatedFields,
//     });

//     return data;
//   } catch (e: any) {
//     console.error(e.message);
//     throw new Error("Booking could not be updated");
//   }
// }

/////////////
// DELETE

// export async function deleteBooking(id: number) {
//   try {
//     const data = await prisma.booking.delete({
//       where: {
//         id,
//       },
//     });

//     return data;
//   } catch (e: any) {
//     console.error(e.message);
//     throw new Error("Booking could not be deleted");
//   }
// }
