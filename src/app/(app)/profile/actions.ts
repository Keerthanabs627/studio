// @ts-nocheck
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export interface Profile {
  name: string;
  phone: string;
}

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format.'),
});

// This is a mock function. In a real app, you would save this to a database.
export async function getProfile(): Promise<Profile> {
  // For now, we return a default profile.
  return {
    name: 'Ramesh Kumar',
    phone: '919876543210',
  };
}

// This is a mock function. In a real app, you would save this to a database.
export async function updateProfile(
  formData: Profile
): Promise<{ success: boolean; message: string; errors?: any }> {
  const validatedFields = profileSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data provided.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate saving the data
  console.log('Saving profile:', validatedFields.data);

  revalidatePath('/profile');

  return {
    success: true,
    message: 'Profile updated successfully.',
  };
}
