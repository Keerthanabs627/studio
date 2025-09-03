
'use server';

import { revalidatePath } from 'next/cache';
import { getProfile } from '../profile/actions';
import { type Job } from './data';
import { adminDb } from '@/lib/firebase/admin';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";


export async function getJobs(): Promise<Job[]> {
  const jobsCollection = collection(adminDb, 'jobs');
  const q = query(jobsCollection, orderBy('createdAt', 'desc'));
  const jobsSnapshot = await getDocs(q);
  
  const jobs: Job[] = jobsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
    } as Job
  });

  return jobs;
}

export async function addJob(job: Omit<Job, 'id' | 'posterName' | 'avatar' | 'createdAt'>): Promise<Job> {
  const profile = await getProfile();
  
  if (!profile || !profile.name) {
      throw new Error("User not authenticated or name is missing");
  }

  const newJob = {
    posterName: profile.name,
    avatar: "https://picsum.photos/40/40?random=0",
    createdAt: serverTimestamp(),
    ...job,
  };
  
  const docRef = await addDoc(collection(adminDb, "jobs"), newJob);

  revalidatePath('/labor-marketplace');
  
  return {
    id: docRef.id,
    ...job,
    posterName: profile.name,
    avatar: "https://picsum.photos/40/40?random=0",
    createdAt: new Date(),
  } as Job;
}


export async function deleteJob(id: string) {
    await deleteDoc(doc(adminDb, "jobs", id));
    revalidatePath('/labor-marketplace');
    return Promise.resolve();
}
