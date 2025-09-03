
import { WeatherClient } from './components/weather-client';
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';
import { getWeather } from '../dashboard/actions';

export default async function WeatherPage() {
    const locale = await getLocaleFromCookie();
    const t = await getDictionary(locale);
    
    const initialWeatherResult = await getWeather();
    
    return <WeatherClient t={t} initialWeatherData={initialWeatherResult.data || null} initialLocation="Belagavi" />;
}
