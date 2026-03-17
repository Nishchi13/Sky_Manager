"use client";

import { useState, useTransition, type ReactNode } from "react";
import { generateItineraryAction } from "@/app/actions";
import type { Flight } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { format } from "date-fns";

interface ItineraryGeneratorProps {
  flight: Flight;
  children: ReactNode;
}

export function ItineraryGenerator({
  flight,
  children,
}: ItineraryGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [interests, setInterests] = useState(
    "museums, historical sites, local food"
  );
  const [itinerary, setItinerary] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = async () => {
    startTransition(async () => {
      const flightDetails = `Flying from ${flight.origin.city} (${flight.origin.code}) to ${flight.destination.city} (${flight.destination.code}). Arrival time: ${format(new Date(flight.arrivalTime), 'PPpp')}.`;
      
      const result = await generateItineraryAction({
        destination: flight.destination.city,
        flightDetails,
        interests,
        travelDate: format(new Date(flight.departureTime), "yyyy-MM-dd"),
      });

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error Generating Itinerary",
          description: result.error,
        });
      } else if (result.itinerary) {
        setItinerary(result.itinerary);
      }
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
        setItinerary("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Generate AI-Powered Itinerary</DialogTitle>
          <DialogDescription>
            Let our AI craft a personalized itinerary for your trip to{" "}
            {flight.destination.city}. Tell us what you're interested in!
          </DialogDescription>
        </DialogHeader>

        {isPending ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">Crafting your adventure...</p>
            <p className="text-sm text-muted-foreground">This may take a moment.</p>
          </div>
        ) : itinerary ? (
            <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto rounded-md border bg-muted p-4 whitespace-pre-wrap">
                <h3 className="text-lg font-semibold mb-2 flex items-center"><Sparkles className="w-4 h-4 mr-2 text-accent"/>Your Itinerary for {flight.destination.city}</h3>
                <p>{itinerary}</p>
            </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="interests">
                What are your interests? (comma-separated)
              </Label>
              <Textarea
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., museums, hiking, local cuisine, nightlife"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Close
          </Button>
          {!itinerary && !isPending && (
            <Button
              onClick={handleGenerate}
              disabled={isPending}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
