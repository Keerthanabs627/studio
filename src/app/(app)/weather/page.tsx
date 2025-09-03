
'use client';

import { WeatherClient } from './components/weather-client';

export default function WeatherPage() {
    // The WeatherClient component now handles all its own data fetching.
    return <WeatherClient initialWeatherData={null} initialLocation="Belagavi" />;
}
