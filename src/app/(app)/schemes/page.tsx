
import { getSchemes } from './actions';
import { SchemesClient } from './components/schemes-client';
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';

export default async function SchemesPage() {
    const locale = await getLocaleFromCookie();
    const t = await getDictionary(locale);
    const schemes = await getSchemes();

    return <SchemesClient schemes={schemes} t={t} />;
}
