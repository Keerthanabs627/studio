
'use client';

import { WeatherClient } from './components/weather-client';
import { weatherScenarios } from '../dashboard/data';

export default function WeatherPage() {
    const initialWeatherData = weatherScenarios[0];
    return <WeatherClient initialWeatherData={initialWeatherData} initialLocation="Search location" />;
}
