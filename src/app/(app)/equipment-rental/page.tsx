
import { getEquipment } from "./actions";
import { EquipmentRentalClient } from "./components/equipment-rental-client";
import { getProfile } from "../profile/actions";

export default async function EquipmentRentalPage() {
    const equipment = await getEquipment();
    const profile = await getProfile();

    return <EquipmentRentalClient initialEquipment={equipment} profile={profile} />;
}
