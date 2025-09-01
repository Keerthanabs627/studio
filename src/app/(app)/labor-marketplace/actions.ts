// @ts-nocheck
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { getProfile } from '../profile/actions';

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  rate: string;
  contact: string;
  posterName: string;
  avatar: string;
  createdAt: any;
}

export async function getJobs(): Promise<Job[]> {
  const jobsCollection = collection(db, 'labor_jobs');
  const q = query(jobsCollection, orderBy('createdAt', 'desc'));
  const jobSnapshot = await getDocs(q);
  const jobsList = jobSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
          id: doc.id,
          ...data,
      } as Job
  });
  return jobsList;
}

export async function addJob(job: Omit<Job, 'id' | 'posterName' | 'avatar' | 'createdAt'>) {
  const profile = await getProfile();
  
  const newJob = {
    posterName: profile.name,
    avatar: "https://picsum.photos/40/40?random=0",
    createdAt: serverTimestamp(),
    ...job,
  };

  await addDoc(collection(db, "labor_jobs"), newJob);
  
  revalidatePath('/labor-marketplace');
}
