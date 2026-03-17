import Link from "next/link";
import { format } from "date-fns";
import type { Flight } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plane, ArrowRight, Sparkles, Clock } from "lucide-react";
import { ItineraryGenerator } from "@/components/itinerary/itinerary-generator";

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-muted rounded-full">
                    <Plane className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <p className="font-bold text-lg">{flight.airline}</p>
                    <p className="text-sm text-muted-foreground">
                        Flight {flight.flightNumber}
                    </p>
                </div>
            </div>
            
            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="text-center">
                <p className="font-bold text-xl">{flight.origin.code}</p>
                <p className="text-muted-foreground">
                  {format(new Date(flight.departureTime), "HH:mm")}
                </p>
              </div>

              <div className="flex-1 text-center">
                <div className="flex items-center justify-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {flight.duration}
                </div>
                <Separator className="my-1" />
                <p className="text-xs text-muted-foreground">Direct</p>
              </div>

              <div className="text-center">
                <p className="font-bold text-xl">{flight.destination.code}</p>
                <p className="text-muted-foreground">
                  {format(new Date(flight.arrivalTime), "HH:mm")}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:border-l md:pl-6 flex flex-col justify-center items-center md:items-end text-center md:text-right">
            <p className="text-3xl font-bold text-primary mb-2">${flight.price}</p>
            <p className="text-sm text-muted-foreground mb-4">per person</p>
            <div className="flex flex-col sm:flex-row md:flex-col w-full gap-2">
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={`/book/${flight.id}`}>
                  Book Flight <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <ItineraryGenerator flight={flight}>
                <Button variant="outline" className="w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Itinerary
                </Button>
              </ItineraryGenerator>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
