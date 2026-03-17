
"use client";

import { useState } from "react";
import type { Flight } from "@/lib/types";
import { flights as allFlights } from "@/lib/data";
import { FlightSearchForm, type SearchData } from "./flight-search-form";
import { FlightResultsList } from "./flight-results-list";
import { Card, CardContent } from "../ui/card";
import { AnimatePresence, motion } from "framer-motion";

export function FlightSearch() {
  const [searchedFlights, setSearchedFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (data: SearchData) => {
    // Permissive search: filters primarily by origin and destination to ensure availability
    const results = allFlights.filter(
      (flight) =>
        flight.origin.code === data.origin &&
        flight.destination.code === data.destination
    );
    setSearchedFlights(results);
    setHasSearched(true);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <FlightSearchForm onSearch={handleSearch} />
        </CardContent>
      </Card>

      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FlightResultsList flights={searchedFlights} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
