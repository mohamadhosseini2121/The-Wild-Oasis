"use client";

import ReservationCard from "./ReservationCard";
import { deleteBooking } from "@/app/_lib/actions";
import { Booking } from "@prisma/client";
import { useOptimistic } from "react";

type props = {
  bookings: Booking[];
};

function ReservationList({ bookings }: props) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking as any}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
