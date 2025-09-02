// @ts-nocheck
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export interface Reminder {
  id: string;
  task: string;
  date: string;
  time: string;
  createdAt: any;
}

export async function getReminders(): Promise<Reminder[]> {
  const remindersCollection = collection(db, 'reminders');
  const q = query(remindersCollection, orderBy('createdAt', 'desc'));
  const reminderSnapshot = await getDocs(q);
  const remindersList = reminderSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Reminder));
  return remindersList;
}

export async function addReminder(reminder: Omit<Reminder, 'id' | 'createdAt'>) {
    await addDoc(collection(db, "reminders"), {
        ...reminder,
        createdAt: serverTimestamp(),
    });
    revalidatePath('/reminders');
}

export async function deleteReminder(id: string) {
    await deleteDoc(doc(db, "reminders", id));
    revalidatePath('/reminders');
}
