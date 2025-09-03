
import { getEquipment } from "./actions";
import { EquipmentRentalClient } from "./components/equipment-rental-client";

export default async function EquipmentRentalPage() {
    const equipment = await getEquipment();

    return <EquipmentRentalClient initialEquipment={equipment} profile={null} />;
}
