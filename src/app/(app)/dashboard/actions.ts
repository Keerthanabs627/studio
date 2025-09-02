
"use server";

import { getWeatherForecast } from "@/ai/flows/weather-flow";
import { z } from 'zod';

const weatherSchema = z.object({
  location: z.string().min(1, 'Location cannot be empty.'),
});

export type WeatherData = {
  day: string;
  icon: string;
  temp: string;
  condition: string;
  wind: string;
};

export async function getWeather(input: { location: string }): Promise<{ data?: WeatherData[]; error?: string }> {
  const validatedInput = weatherSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map((e) => e.message).join(', ');
    return { error: errorMessage };
  }

  try {
    const output = await getWeatherForecast({ location: validatedInput.data.location });
     if (!output || !output.forecast) {
      return { error: 'Failed to retrieve a valid forecast from the AI model.' };
    }
    return { data: output.forecast };
  } catch (e: any) {
    console.error('Weather Flow Error:', e);
    const errorMessage = e.message || 'An unexpected error occurred while fetching weather data. Please try again later.';
    return { error: errorMessage };
  }
}
