
import { getEquipment } from "./actions";
import { EquipmentRentalClient } from "./components/equipment-rental-client";
import { getDictionary } from '@/locales/dictionaries';
import { i18n, type Locale } from '@/locales/config';
import { cookies } from 'next/headers';

export default async function EquipmentRentalPage() {
    const equipment = await getEquipment();
    const cookieStore = cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
    const locale = i18n.locales.includes(localeCookie as Locale) ? (localeCookie as Locale) : i18n.defaultLocale;
    const t = await getDictionary(locale);

    return <EquipmentRentalClient initialEquipment={equipment} profile={null} t={t} />;
}
