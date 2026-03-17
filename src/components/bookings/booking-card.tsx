"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { Booking } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plane,
  ArrowRight,
  Clock,
  User,
  Armchair,
  UtensilsCrossed,
  Edit,
  Trash2,
  Bell,
} from "lucide-react";

interface BookingCardProps {
  booking: Booking;
}

const statusColors: Record<Booking['status'], string> = {
    'On Time': 'bg-green-500',
    'Delayed': 'bg-yellow-500',
    'Cancelled': 'bg-red-500',
    'Boarding': 'bg-blue-500',
    'Gate Change': 'bg-purple-500',
}

export function BookingCard({ booking }: BookingCardProps) {
  const [currentBooking, setCurrentBooking] = useState(booking);
  const [status, setStatus] = useState<Booking["status"]>(booking.status);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
        return;
    }
    // Simulate real-time status updates
    const statuses: Booking["status"][] = ['On Time', 'Delayed', 'Gate Change', 'Boarding'];
    const interval = setInterval(() => {
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setStatus(newStatus);
    }, 15000 * Math.random() + 5000); // Update every 5-20 seconds

    return () => clearInterval(interval);
  }, [isClient]);

  return (
    <Card className="shadow-md transition-shadow hover:shadow-xl">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-2xl">
                    {currentBooking.flight.origin.city} to {currentBooking.flight.destination.city}
                </CardTitle>
                <CardDescription>
                    Flight {currentBooking.flight.flightNumber} with {currentBooking.flight.airline}
                </CardDescription>
            </div>
            <Badge variant={status === 'Cancelled' ? 'destructive' : 'default'} className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${statusColors[status]}`}></span>
                {status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-4 text-sm bg-muted p-4 rounded-lg">
          <div className="text-center">
            <p className="font-bold text-2xl">{currentBooking.flight.origin.code}</p>
            <p className="text-muted-foreground">
              {isClient ? format(new Date(currentBooking.flight.departureTime), "MMM d, HH:mm") : ''}
            </p>
          </div>
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                {currentBooking.flight.duration}
            </div>
            <Separator className="my-1" />
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl">{currentBooking.flight.destination.code}</p>
            <p className="text-muted-foreground">
              {isClient ? format(new Date(currentBooking.flight.arrivalTime), "MMM d, HH:mm") : ''}
            </p>
          </div>
        </div>

        <div>
            <h4 className="font-semibold mb-2 text-md">Passenger & Preferences</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground"/> <span>{currentBooking.passengerName}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Armchair className="w-4 h-4 text-muted-foreground"/> <span>{currentBooking.seatPreference.charAt(0).toUpperCase() + currentBooking.seatPreference.slice(1)} seat</span>
                </div>
                 <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-muted-foreground"/> <span>{currentBooking.dietaryRestrictions || "No restrictions"}</span>
                </div>
            </div>
             {currentBooking.otherAccommodations && <p className="text-sm mt-2 text-muted-foreground">Other: {currentBooking.otherAccommodations}</p>}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-4 flex justify-end gap-2 rounded-b-lg">
          <Button variant="ghost" size="sm"><Edit className="mr-2 h-4 w-4"/> Modify</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/> Cancel</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently cancel your flight booking.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Back</AlertDialogCancel>
                  <AlertDialogAction>Confirm Cancellation</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
      </CardFooter>
    </Card>
  );
}
