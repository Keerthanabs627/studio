'use server';

/**
 * @fileOverview A flow to get weather forecast for a location.
 *
 * - getWeatherForecast - A function that returns a 3-day weather forecast.
 * - WeatherInput - The input type for the getWeatherForecast function.
 * - WeatherOutput - The return type for the getWeatherForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherInputSchema = z.object({
  location: z.string().describe('The location to get the weather forecast for.'),
});
export type WeatherInput = z.infer<typeof WeatherInputSchema>;

const WeatherDataSchema = z.object({
    day: z.string(),
    icon: z.enum(["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Heavy Rain", "Thunderstorm", "Snow", "Fog"]),
    temp: z.string().describe("Temperature in Celsius, e.g., 25°C"),
    condition: z.string(),
    wind: z.string().describe("Wind speed, e.g., 10 km/h"),
});

const WeatherOutputSchema = z.object({
  forecast: z.array(WeatherDataSchema).length(3).describe('A 3-day weather forecast.'),
});
export type WeatherOutput = z.infer<typeof WeatherOutputSchema>;

export async function getWeatherForecast(input: WeatherInput): Promise<WeatherOutput> {
  return weatherFlow(input);
}

const weatherPrompt = ai.definePrompt({
  name: 'weatherPrompt',
  input: {schema: WeatherInputSchema},
  output: {schema: WeatherOutputSchema},
  prompt: `You are a weather forecasting service.
  Generate a real-time, accurate 3-day weather forecast for the following location: {{{location}}}.
  The forecast should include today, tomorrow, and the day after.
  Provide real weather conditions for each day based on current meteorological data.
  If the location is fictional or you cannot retrieve real data, provide a realistic but clearly marked as estimated forecast.
  `,
});

const weatherFlow = ai.defineFlow(
  {
    name: 'weatherFlow',
    inputSchema: WeatherInputSchema,
    outputSchema: WeatherOutputSchema,
  },
  async input => {
    const {output} = await weatherPrompt(input);
    return output!;
  }
);
