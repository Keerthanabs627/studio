
// @ts-nocheck
'use server';

import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

export interface Reminder {
  id: string;
  task: string;
  date: string;
  time: string;
  createdAt: any;
}

export async function getReminders(): Promise<Reminder[]> {
  const remindersCollection = collection(adminDb, 'reminders');
  const q = query(remindersCollection, orderBy('createdAt', 'desc'));
  const remindersSnapshot = await getDocs(q);
  
  const reminders: Reminder[] = remindersSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
      }
  });

  return reminders;
}

export async function addReminder(reminder: Omit<Reminder, 'id' | 'createdAt'>) {
    const newReminder = {
        ...reminder,
        createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(adminDb, "reminders"), newReminder);
    revalidatePath('/reminders');
    return {
        ...newReminder,
        id: docRef.id,
        createdAt: new Date(),
    };
}

export async function deleteReminder(id: string) {
    await deleteDoc(doc(adminDb, "reminders", id));
    revalidatePath('/reminders');
    return Promise.resolve();
}
