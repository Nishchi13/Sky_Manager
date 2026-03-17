import { FlightSearch } from "@/components/flights/flight-search";

export default function Home() {
  return (
    <div className="w-full">
      <header className="bg-card p-6 rounded-lg shadow-sm mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Find Your Next Adventure
        </h1>
        <p className="text-muted-foreground mt-2">
          Search for flights, book your ticket, and manage your journey all in one place.
        </p>
      </header>
      <FlightSearch />
    </div>
  );
}
