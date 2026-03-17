"use client";

import type { Flight } from "@/lib/types";
import { FlightCard } from "./flight-card";
import { Plane } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FlightResultsListProps {
  flights: Flight[];
}

export function FlightResultsList({ flights }: FlightResultsListProps) {
  if (flights.length === 0) {
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
        <div className="mx-auto bg-secondary w-16 h-16 rounded-full flex items-center justify-center">
            <Plane className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">No flights found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
       <h2 className="text-2xl font-bold tracking-tight">Available Flights</h2>
      <AnimatePresence>
        {flights.map((flight, index) => (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FlightCard flight={flight} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
