
import { getJobs } from './actions';
import { LaborMarketplaceClient } from './components/labor-marketplace-client';
import { getProfile } from '../profile/actions';

export default async function LaborMarketplacePage() {
    const jobs = await getJobs();
    const profile = await getProfile();

    return <LaborMarketplaceClient initialJobs={jobs} profile={profile} />;
}
