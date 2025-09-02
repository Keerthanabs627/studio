
import { getJobs } from './actions';
import { LaborMarketplaceClient } from './components/labor-marketplace-client';
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';

export default async function LaborMarketplacePage() {
    const jobs = await getJobs();
    const locale = getLocaleFromCookie();
    const t = await getDictionary(locale);

    return <LaborMarketplaceClient initialJobs={jobs} t={t} />;
}
