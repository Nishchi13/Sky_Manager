import { bookings } from "@/lib/data";
import { BookingCard } from "./booking-card";
import { Ticket } from "lucide-react";
import Link from 'next/link';
import { Button } from "../ui/button";

export function MyBookingsList() {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
        <div className="mx-auto bg-secondary w-16 h-16 rounded-full flex items-center justify-center">
            <Ticket className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">No Bookings Yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Your booked flights will appear here.
        </p>
        <Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/">Find a Flight</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
