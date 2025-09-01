// @ts-nocheck
'use server';

import { schemes } from './data';
import { revalidatePath } from 'next/cache';

export interface Scheme {
  id: number;
  title: string;
  description: string;
  eligibility: string;
  benefits: string[];
  link: string;
}

export async function getSchemes(): Promise<Scheme[]> {
  // In a real app, you'd fetch this from a database or a government API.
  return Promise.resolve(schemes);
}
