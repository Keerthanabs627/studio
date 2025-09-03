
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { adminDb } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface Profile {
  name: string;
  phone: string;
  notifications: {
    sms: boolean;
    whatsapp: boolean;
  };
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
      notifications: {
        sms: true,
        whatsapp: false,
      }
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


const notificationSchema = z.object({
    sms: z.boolean(),
    whatsapp: z.boolean(),
});

export async function updateNotificationPreferences(data: Profile['notifications']) {
    const validatedFields = notificationSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const profileDocRef = doc(adminDb, 'profiles', PROFILE_ID);
    await setDoc(profileDocRef, { notifications: validatedFields.data }, { merge: true });
    
    revalidatePath('/notifications');
    revalidatePath('/profile');
    
    const updatedProfile = await getProfile();
    return { data: updatedProfile };
}

export async function saveFCMToken(token: string) {
    if (!token) {
        return { error: 'Invalid token provided.' };
    }
    try {
        const tokenDocRef = doc(adminDb, "fcm_tokens", token);
        await setDoc(tokenDocRef, {
            token: token,
            createdAt: serverTimestamp(),
        });
        return { success: true, message: 'Token saved successfully.' };

    } catch (error) {
        console.error("Error saving FCM token:", error);
        return { error: 'Could not save FCM token.' };
    }
}
