
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { adminDb } from '@/lib/firebase/admin';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface Profile {
  name: string;
  phone: string;
}

const PROFILE_ID = "shared_profile"; // Using a fixed ID for the single shared profile

export async function getProfile(): Promise<Profile> {
  const profileDocRef = doc(adminDb, 'profiles', PROFILE_ID);
  const profileSnap = await getDoc(profileDocRef);

  if (profileSnap.exists()) {
    return profileSnap.data() as Profile;
  } else {
    // Return a default empty profile if it doesn't exist
    return {
      name: "",
      phone: "",
    };
  }
}

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'),
});


export async function updateProfile(data: Pick<Profile, 'name' | 'phone'>) {
  const validatedFields = profileSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const currentProfile = await getProfile();
  const updatedProfile = {
      ...currentProfile,
      name: validatedFields.data.name,
      phone: validatedFields.data.phone
  };

  const profileDocRef = doc(adminDb, 'profiles', PROFILE_ID);
  await setDoc(profileDocRef, updatedProfile, { merge: true });

  revalidatePath('/profile');
  
  return { data: updatedProfile };
}
