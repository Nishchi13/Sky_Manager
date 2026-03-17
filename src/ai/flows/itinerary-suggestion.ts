'use server';

/**
 * @fileOverview A travel itinerary suggestion AI agent.
 *
 * - suggestItinerary - A function that handles the itinerary suggestion process.
 * - SuggestItineraryInput - The input type for the suggestItinerary function.
 * - SuggestItineraryOutput - The return type for the suggestItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestItineraryInputSchema = z.object({
  destination: z.string().describe('The destination city for the itinerary.'),
  flightDetails: z
    .string()
    .describe(
      'Details about the flight, including origin, arrival, departure time, and arrival time.'
    ),
  interests: z
    .string()
    .describe(
      'A comma separated list of interests, used to customize the itinerary, such as museums, historical sites, food, outdoors, etc.'
    ),
  travelDate: z.string().describe('The date of travel.'),
});
export type SuggestItineraryInput = z.infer<typeof SuggestItineraryInputSchema>;

const SuggestItineraryOutputSchema = z.object({
  itinerary: z
    .string()
    .describe(
      'A detailed travel itinerary including transportation options, estimated travel times, and points of interest.'
    ),
});
export type SuggestItineraryOutput = z.infer<typeof SuggestItineraryOutputSchema>;

export async function suggestItinerary(input: SuggestItineraryInput): Promise<SuggestItineraryOutput> {
  return suggestItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestItineraryPrompt',
  input: {schema: SuggestItineraryInputSchema},
  output: {schema: SuggestItineraryOutputSchema},
  prompt: `You are a travel planning expert. A user is traveling to {{destination}} on {{travelDate}} and needs an itinerary.

The flight details are as follows: {{flightDetails}}.

The user is interested in the following: {{interests}}.

Create a detailed itinerary, including transportation options, estimated travel times, and specific points of interest.  The itinerary should have times associated with each item.

Itinerary:`,
});

const suggestItineraryFlow = ai.defineFlow(
  {
    name: 'suggestItineraryFlow',
    inputSchema: SuggestItineraryInputSchema,
    outputSchema: SuggestItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
