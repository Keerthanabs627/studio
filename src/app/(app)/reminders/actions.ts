// @ts-nocheck
'use server';

interface Reminder {
  id: number;
  task: string;
  date: string;
}

const reminders: Reminder[] = [
    { id: 1, task: 'Apply first dose of Urea to wheat crop', date: '2024-07-25' },
    { id: 2, task: 'Scout for pests in the cotton field', date: '2024-07-28' },
];

export async function getReminders(): Promise<{ data: Reminder[] }> {
  // In a real app, you'd fetch this from a database.
  return Promise.resolve({ data: reminders });
}
