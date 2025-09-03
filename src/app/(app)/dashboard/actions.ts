
"use server";

import { weatherScenarios } from './data';
import { z } from 'zod';

export type WeatherData = typeof weatherScenarios[0][0];

export async function getWeather(location?: string): Promise<{ data?: WeatherData[]; error?: string }> {
  try {
    // In a real app, this might fetch from a weather API using the location.
    // For this prototype, we return a random scenario from our mock data.
    const randomIndex = Math.floor(Math.random() * weatherScenarios.length);
    const selectedScenario = weatherScenarios[randomIndex];
    return { data: selectedScenario };
  } catch (e: any) {
    console.error('Weather Data Error:', e);
    return { error: 'An unexpected error occurred while fetching weather data.' };
  }
}
