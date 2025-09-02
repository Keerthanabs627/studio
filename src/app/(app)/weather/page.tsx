
import { WeatherClient } from './components/weather-client';
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';
import { getWeather } from '../dashboard/actions';

export default async function WeatherPage() {
    const locale = getLocaleFromCookie();
    const t = await getDictionary(locale);
    
    const initialWeatherResult = await getWeather({ location: 'Belagavi' });
    const initialWeatherData = initialWeatherResult.data || null;

    return <WeatherClient t={t} initialWeatherData={initialWeatherData} initialLocation="Belagavi" />;
}
