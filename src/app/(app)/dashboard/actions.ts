
"use server";

import { getWeatherForecast } from '@/ai/flows/weather-flow';
import { weatherScenarios } from './data';
import { z } from 'zod';

export type WeatherData = {
    day: string;
    icon: "Sunny" | "Partly Cloudy" | "Cloudy" | "Light Rain" | "Heavy Rain" | "Thunderstorm" | "Snow" | "Fog";
    temp: string;
    condition: string;
    wind: string;
};

export async function getWeather(location: string = "Belagavi"): Promise<{ data?: WeatherData[]; error?: string }> {
  try {
    const result = await getWeatherForecast({ location });
    return { data: result.forecast };
  } catch (e: any) {
    console.error('Weather Data Error:', e);
    // Fallback to mock data if AI flow fails
    const randomIndex = Math.floor(Math.random() * weatherScenarios.length);
    const selectedScenario = weatherScenarios[randomIndex];
    return { 
        data: selectedScenario, 
        error: 'Could not fetch live weather, showing an example forecast.' 
    };
  }
}
