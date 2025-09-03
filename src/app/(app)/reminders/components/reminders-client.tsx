
// @ts-nocheck
"use client";

import { useState, useTransition, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Plus, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type Reminder } from '../actions';
import { useI18n } from '@/locales/client';

const REMINDERS_STORAGE_KEY = 'agripulse-reminders';

export function RemindersClient({ initialReminders }: { initialReminders: Reminder[] }) {
  const t = useI18n();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isPending, startTransition] = useTransition();

  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load reminders from local storage on component mount
    try {
      const storedReminders = localStorage.getItem(REMINDERS_STORAGE_KEY);
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      } else {
        setReminders(initialReminders); // Load initial data if nothing in storage
      }
    } catch (error) {
        // If local storage is unavailable or fails, use initial data
        setReminders(initialReminders);
    }
  }, [initialReminders]);


  const updateStorage = (updatedReminders: Reminder[]) => {
      try {
        localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(updatedReminders));
      } catch (error) {
        console.warn("Could not save reminders to local storage.", error);
      }
  };


  const handleAddReminder = () => {
    if (!newTask.trim() || !newDate || !newTime) {
      toast({
        variant: "destructive",
        title: t.reminders.toast.missing_info.title,
        description: t.reminders.toast.missing_info.description,
      });
      return;
    }
    
    startTransition(() => {
        const newReminder: Reminder = {
            id: new Date().toISOString(),
            task: newTask,
            date: newDate,
            time: newTime,
            createdAt: new Date(),
        };

        const updatedReminders = [newReminder, ...reminders].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setReminders(updatedReminders);
        updateStorage(updatedReminders);

        toast({
            title: t.reminders.toast.added.title,
            description: `${t.reminders.toast.added.description_prefix} "${newTask}" ${t.reminders.toast.added.description_suffix} ${newDate}.`,
        });

        setNewTask('');
        setNewDate('');
        setNewTime('');
    });
  };

  const handleDeleteReminder = (id: string) => {
     startTransition(() => {
        const updatedReminders = reminders.filter(r => r.id !== id);
        setReminders(updatedReminders);
        updateStorage(updatedReminders);
        toast({
            title: t.reminders.toast.removed.title,
        });
     });
  };

  const formatDate = (dateString: string, timeString: string) => {
    if (!dateString || !timeString) {
      return "Invalid date";
    }
    const date = new Date(`${dateString}T${timeString}`);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.reminders.title}</h1>
        <p className="text-muted-foreground">{t.reminders.description}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t.reminders.card1.title}</CardTitle>
            <CardDescription>{t.reminders.card1.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task">{t.reminders.card1.task_label}</Label>
              <Input
                id="task"
                placeholder={t.reminders.card1.task_placeholder}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="date">{t.reminders.card1.date_label}</Label>
                <Input
                    id="date"
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    disabled={isPending}
                    min={new Date().toISOString().split("T")[0]}
                />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                        id="time"
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        disabled={isPending}
                    />
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddReminder} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Plus className="mr-2 h-4 w-4" />
              {t.reminders.card1.button}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.reminders.card2.title}</CardTitle>
            <CardDescription>{t.reminders.card2.description}</CardDescription>
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
                        <p className="text-sm text-muted-foreground">
                            {formatDate(reminder.date, reminder.time)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteReminder(reminder.id)} disabled={isPending}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">{t.reminders.card2.delete_button_sr}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground pt-10">{t.reminders.card2.no_reminders}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
