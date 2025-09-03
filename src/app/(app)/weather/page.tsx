
import { WeatherClient } from './components/weather-client';
import { getWeather } from '../dashboard/actions';

export default async function WeatherPage() {
    const initialWeatherResult = await getWeather();
    
    return <WeatherClient initialWeatherData={initialWeatherResult.data || null} initialLocation="Belagavi" />;
}
