import { WeatherClient } from './components/weather-client';
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';
import { getWeather } from '../dashboard/actions';

export default async function WeatherPage() {
    const locale = await getLocaleFromCookie();
    const t = await getDictionary(locale);
    
    // This fetch is for the initial server-side render.
    // The client-side component will handle its own fetching and caching.
    let initialWeatherData = null;
    try {
        const initialWeatherResult = await getWeather({ location: 'Belagavi' });
        initialWeatherData = initialWeatherResult.data || null;
    } catch (e) {
        console.error("Initial weather fetch failed", e);
    }
    
    return <WeatherClient t={t} initialWeatherData={initialWeatherData} initialLocation="Belagavi" />;
}
