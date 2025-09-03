
'use client';

import { WeatherClient } from './components/weather-client';

export default function WeatherPage() {
    return <WeatherClient initialWeatherData={null} initialLocation="Search location" />;
}
