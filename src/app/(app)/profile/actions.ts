// @ts-nocheck
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export interface Profile {
  name: string;
  phone: string;
}

// This is a temporary in-memory "database" for the prototype.
// In a real application, this would be a database like Firestore and tied to a user session.
let userProfile: Profile = {
  name: "Rakesh Sharma",
  phone: "+91 98765 43210",
};

export async function getProfile(): Promise<Profile> {
  // In a real app, you'd fetch this from a database for the logged-in user.
  return Promise.resolve(userProfile);
}

const profileSchema = z.object({
    name: z.string().min(1, 'Name cannot be empty.'),
    phone: z.string().min(1, 'Phone cannot be empty.'),
});


export async function updateProfile(data: Profile) {
  const validatedFields = profileSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  // In a real app, you'd update this in a database.
  userProfile = {
      name: validatedFields.data.name,
      phone: validatedFields.data.phone
  };

  revalidatePath('/profile');
  
  return { data: userProfile };
}
