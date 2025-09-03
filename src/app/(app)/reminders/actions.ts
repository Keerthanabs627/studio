
// @ts-nocheck
'use server';

import { revalidatePath } from 'next/cache';

export interface Reminder {
  id: string;
  task: string;
  date: string;
  time: string;
  createdAt: any;
}

// In a real app, this would be a database call.
// For this prototype, we're simulating it with an in-memory array.
// This data will be managed on the client-side component.
let reminders: Reminder[] = [
    {
        id: "1",
        task: "Check irrigation pump",
        date: new Date().toISOString().split('T')[0],
        time: "08:00",
        createdAt: new Date()
    },
    {
        id: "2",
        task: "Buy new batch of seeds",
        date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
        time: "14:00",
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1))
    }
];

export async function getReminders(): Promise<Reminder[]> {
  // This function is now just for initial data for the prototype.
  // The client will manage its own state.
  return Promise.resolve(reminders);
}

// The following functions are not used in the new client-side implementation
// but are kept here to show what a server-based implementation would look like.
export async function addReminder(reminder: Omit<Reminder, 'id' | 'createdAt'>) {
    const newReminder = {
        ...reminder,
        id: new Date().toISOString(),
        createdAt: new Date(),
    };
    reminders.push(newReminder);
    revalidatePath('/reminders');
    return Promise.resolve(newReminder);
}

export async function deleteReminder(id: string) {
    reminders = reminders.filter(r => r.id !== id);
    revalidatePath('/reminders');
    return Promise.resolve();
}
