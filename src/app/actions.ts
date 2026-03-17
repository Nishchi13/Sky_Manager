"use server";

import { suggestItinerary, type SuggestItineraryInput } from "@/ai/flows/itinerary-suggestion";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function generateItineraryAction(input: SuggestItineraryInput) {
  try {
    const output = await suggestItinerary(input);
    return { itinerary: output.itinerary };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unknown error occurred." };
  }
}

export async function createBookingAction(prevState: any, formData: FormData) {
    // This is a mock action. In a real app, you would:
    // 1. Validate the form data.
    // 2. Save the booking to a database.
    // 3. Process payment, etc.
    console.log("New booking created:", Object.fromEntries(formData.entries()));

    // For the demo, we'll just revalidate the bookings path and redirect.
    revalidatePath("/bookings");
    redirect("/bookings?status=success");
}
