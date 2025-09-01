
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
    return { data: output.forecast };
  } catch (e) {
    console.error('Weather Flow Error:', e);
    return { error: 'An unexpected error occurred while fetching weather data. Please try again later.' };
  }
}
