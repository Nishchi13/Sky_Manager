import { MyBookingsList } from "@/components/bookings/my-bookings-list";
import { Suspense } from 'react';

function SuccessToast({ status }: { status?: string }) {
    if (status !== 'success') {
        return null;
    }
    // This is a placeholder. A real implementation would use useToast in a client component.
    // Since this is a server component, we'll just show a message.
    return (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700 rounded-lg">
            Booking successful! Your new trip is now listed below.
        </div>
    );
}

export default function BookingsPage({ searchParams }: { searchParams: { status?: string } }) {
  return (
    <div className="w-full">
      <header className="bg-card p-6 rounded-lg shadow-sm mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          My Bookings
        </h1>
        <p className="text-muted-foreground mt-2">
          View, manage, and track your upcoming flights.
        </p>
      </header>
      
      <Suspense fallback={null}>
        <SuccessToast status={searchParams.status} />
      </Suspense>

      <MyBookingsList />
    </div>
  );
}
