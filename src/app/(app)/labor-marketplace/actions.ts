
// @ts-nocheck
'use server';

import { revalidatePath } from 'next/cache';
import { getProfile } from '../profile/actions';
import { jobs as initialJobs, type Job } from './data';

export type { Job };

let jobs: Job[] = [...initialJobs];

export async function getJobs(): Promise<Job[]> {
  // In a real app, you'd fetch this from a database.
  // For this prototype, we use an in-memory array.
  return Promise.resolve(jobs);
}

export async function addJob(job: Omit<Job, 'id' | 'posterName' | 'avatar' | 'createdAt'>) {
  const profile = await getProfile();
  
  if (!profile) {
      throw new Error("User not authenticated");
  }

  const newJob: Job = {
    id: new Date().toISOString(),
    posterName: profile.name,
    avatar: "https://picsum.photos/40/40?random=0",
    createdAt: new Date(),
    ...job,
  };

  jobs.unshift(newJob);
  revalidatePath('/labor-marketplace');
  return Promise.resolve(newJob);
}


export async function deleteJob(id: string) {
    jobs = jobs.filter(job => job.id !== id);
    revalidatePath('/labor-marketplace');
    return Promise.resolve();
}
