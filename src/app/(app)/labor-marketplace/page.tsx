
import { getJobs } from './actions';
import { LaborMarketplaceClient } from './components/labor-marketplace-client';
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';
import { getProfile } from '../profile/actions';

export default async function LaborMarketplacePage() {
    const jobs = await getJobs();
    const locale = await getLocaleFromCookie();
    const t = await getDictionary(locale);
    const profile = await getProfile();

    return <LaborMarketplaceClient initialJobs={jobs} t={t} profile={profile} />;
}
