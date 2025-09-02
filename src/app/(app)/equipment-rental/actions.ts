
// @ts-nocheck
'use server';

import { equipment, type Equipment } from './data';
import { revalidatePath } from 'next/cache';
import { getProfile } from '../profile/actions';

export type { Equipment };

export async function getEquipment(): Promise<Equipment[]> {
  // In a real app, you'd fetch this from a database.
  return Promise.resolve(equipment);
}

export async function addEquipment(item: Omit<Equipment, 'id' | 'owner' | 'avatar'>): Promise<Equipment> {
  const profile = await getProfile();
  
  const newEquipment: Equipment = {
    id: equipment.length + 1,
    owner: profile.name,
    avatar: "https://picsum.photos/40/40?random=0",
    ...item,
  };
  equipment.unshift(newEquipment);
  revalidatePath('/equipment-rental');
  return Promise.resolve(newEquipment);
}
