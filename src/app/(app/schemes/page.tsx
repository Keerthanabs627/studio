
import { getSchemes } from './actions';
import { SchemesClient } from './components/schemes-client';

export default async function SchemesPage() {
    const schemes = await getSchemes();

    return <SchemesClient schemes={schemes} />;
}
