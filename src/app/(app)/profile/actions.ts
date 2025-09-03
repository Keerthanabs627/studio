// @ts-nocheck
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';

export interface Profile {
  name: string;
  phone: string;
  notifications: {
    sms: boolean;
    whatsapp: boolean;
  };
}

// This is a temporary in-memory "database" for the prototype.
// In a real application, this would be a database like Firestore and tied to a user session.
let userProfile: Profile = {
  name: "Vijay Kumar",
  phone: "+91 98765 43210",
  notifications: {
    sms: true,
    whatsapp: false,
  }
};

export async function getProfile(): Promise<Profile> {
  // In a real app, you'd fetch this from a database for the logged-in user.
  return Promise.resolve(userProfile);
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
  
  userProfile = {
      ...userProfile,
      name: validatedFields.data.name,
      phone: validatedFields.data.phone
  };

  revalidatePath('/profile');
  
  return { data: userProfile };
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

    userProfile.notifications = validatedFields.data;
    
    revalidatePath('/notifications');
    revalidatePath('/profile');
    
    return { data: userProfile };
}

export async function saveFCMToken(token: string) {
    if (!token) {
        return { error: 'Invalid token provided.' };
    }
    try {
        // You might want to check if the token already exists to avoid duplicates
        await addDoc(collection(db, "fcm_tokens"), {
            token: token,
            createdAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error("Error saving FCM token:", error);
        return { error: 'Could not save FCM token.' };
    }
}
