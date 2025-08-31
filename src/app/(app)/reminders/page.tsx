"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Reminder {
  id: number;
  task: string;
  date: string;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, task: 'Apply first dose of Urea to wheat crop', date: '2024-07-25' },
    { id: 2, task: 'Scout for pests in the cotton field', date: '2024-07-28' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const { toast } = useToast();

  const handleAddReminder = () => {
    if (!newTask.trim() || !newDate) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter a task and select a date.",
      });
      return;
    }
    const newReminder: Reminder = {
      id: Date.now(),
      task: newTask,
      date: newDate,
    };
    setReminders([...reminders, newReminder].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setNewTask('');
    setNewDate('');
    toast({
      title: "Reminder Added",
      description: `Task "${newTask}" scheduled for ${newDate}.`,
    });
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast({
      title: "Reminder Removed",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reminders</h1>
        <p className="text-muted-foreground">Set and manage your farming reminders.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Reminder</CardTitle>
            <CardDescription>Schedule a new task for your farm.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task">Task Description</Label>
              <Input
                id="task"
                placeholder="e.g., Irrigate the maize field"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddReminder}>
              <Plus className="mr-2 h-4 w-4" />
              Add Reminder
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reminders</CardTitle>
            <CardDescription>Your scheduled tasks are listed here.</CardDescription>
          </CardHeader>
          <CardContent>
            {reminders.length > 0 ? (
              <ul className="space-y-3">
                {reminders.map(reminder => (
                  <li key={reminder.id} className="flex items-center justify-between p-3 rounded-md bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-primary"/>
                      <div>
                        <p className="font-medium">{reminder.task}</p>
                        <p className="text-sm text-muted-foreground">{new Date(reminder.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteReminder(reminder.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Delete reminder</span>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground pt-10">You have no upcoming reminders.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
