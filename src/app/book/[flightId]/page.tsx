import { flights } from "@/lib/data";
import { BookingForm } from "@/components/bookings/booking-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { notFound } from "next/navigation";

export default function BookFlightPage({
  params,
}: {
  params: { flightId: string };
}) {
  const flight = flights.find((f) => f.id === params.flightId);

  if (!flight) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">Complete Your Booking</CardTitle>
                <CardDescription>
                    You're one step away from your trip to {flight.destination.city}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BookingForm flight={flight} />
            </CardContent>
        </Card>
    </div>
  );
}
