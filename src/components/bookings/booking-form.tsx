"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import type { Flight } from "@/lib/types";
import { createBookingAction } from "@/app/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, ArrowRight, User, Mail, Armchair, UtensilsCrossed, PlusCircle, Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const BookingSchema = z.object({
  passengerName: z.string().min(2, "Name must be at least 2 characters."),
  passengerEmail: z.string().email("Invalid email address."),
  seatPreference: z.enum(["window", "aisle", "middle"]),
  dietaryRestrictions: z.string().optional(),
  otherAccommodations: z.string().optional(),
});

type BookingFormData = z.infer<typeof BookingSchema>;

interface BookingFormProps {
  flight: Flight;
}

export function BookingForm({ flight }: BookingFormProps) {
  const { toast } = useToast();
  const [state, formAction] = useActionState(createBookingAction, null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      passengerName: "",
      passengerEmail: "",
      seatPreference: "window",
      dietaryRestrictions: "",
      otherAccommodations: "",
    },
  });

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Booking Submitted",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Form {...form}>
          <form
            action={formAction}
            className="space-y-8"
          >
            <input type="hidden" name="flightId" value={flight.id} />

            <div className="space-y-4">
                 <h3 className="text-lg font-semibold flex items-center"><User className="mr-2 h-5 w-5"/>Passenger Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="passengerName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="passengerEmail"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            </div>

            <div className="space-y-4">
                 <h3 className="text-lg font-semibold flex items-center"><PlusCircle className="mr-2 h-5 w-5"/>Preferences & Accommodations</h3>
                <FormField
                    control={form.control}
                    name="seatPreference"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Seat Preference</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Armchair className="mr-2 h-4 w-4"/>
                                <SelectValue placeholder="Select a seat preference" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="window">Window</SelectItem>
                                <SelectItem value="aisle">Aisle</SelectItem>
                                <SelectItem value="middle">Middle</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dietaryRestrictions"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Dietary Restrictions</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <UtensilsCrossed className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                                <Textarea placeholder="e.g., Vegetarian, Gluten-Free" {...field} className="pl-10" />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="otherAccommodations"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Other Accommodations</FormLabel>
                        <FormControl>
                            <Textarea placeholder="e.g., Wheelchair assistance" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/80 text-lg py-6">
              Confirm Booking <Ticket className="ml-2"/>
            </Button>
          </form>
        </Form>
      </div>

      <div className="md:col-span-1">
        <Card className="sticky top-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Flight Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background rounded-full"><Plane className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="font-semibold">{flight.airline}</p>
                <p className="text-sm text-muted-foreground">Flight {flight.flightNumber}</p>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{flight.origin.code}</p>
                <p className="text-sm text-muted-foreground">{flight.origin.city}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-bold text-lg text-right">{flight.destination.code}</p>
                <p className="text-sm text-muted-foreground text-right">{flight.destination.city}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Departure</p>
              <p className="text-sm text-muted-foreground">{format(new Date(flight.departureTime), "eeee, MMM d, yyyy 'at' HH:mm")}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Arrival</p>
              <p className="text-sm text-muted-foreground">{format(new Date(flight.arrivalTime), "eeee, MMM d, yyyy 'at' HH:mm")}</p>
            </div>
            <Separator />
            <div className="flex justify-between items-baseline">
              <p className="font-semibold">Total Price</p>
              <p className="text-2xl font-bold text-primary">${flight.price}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
