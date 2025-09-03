
import { getEquipment } from "./actions";
import { EquipmentRentalClient } from "./components/equipment-rental-client";
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';
import { getProfile } from "../profile/actions";

export default async function EquipmentRentalPage() {
    const locale = await getLocaleFromCookie();
    const t = await getDictionary(locale);
    const equipment = await getEquipment();
    const profile = await getProfile();

    return <EquipmentRentalClient initialEquipment={equipment} t={t} profile={profile} />;
}
