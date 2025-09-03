
"use server";

import { weatherData } from './data';
import { z } from 'zod';

export type WeatherData = typeof weatherData[0];

export async function getWeather(location?: string): Promise<{ data?: WeatherData[]; error?: string }> {
  try {
    // In a real app, this might fetch from a weather API using the location.
    // For this prototype, we return consistent mock data regardless of location.
    return { data: weatherData };
  } catch (e: any) {
    console.error('Weather Data Error:', e);
    return { error: 'An unexpected error occurred while fetching weather data.' };
  }
}
