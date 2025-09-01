
// @ts-nocheck
"use client";

import { useState, useEffect, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Plus, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/locales/client';
import { getReminders, addReminder, deleteReminder, type Reminder } from './actions';

export default function RemindersPage() {
  const t = useI18n();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const { toast } = useToast();

  const fetchAndSetReminders = async () => {
      try {
        const fetchedReminders = await getReminders();
        setReminders(fetchedReminders);
      } catch (error) {
        console.error("Error fetching reminders:", error);
        toast({
            variant: 'destructive',
            title: "Failed to load reminders",
        });
      } finally {
        setIsLoading(false);
      }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchAndSetReminders();
  }, []);

  const handleAddReminder = () => {
    if (!newTask.trim() || !newDate || !newTime) {
      toast({
        variant: "destructive",
        title: t.reminders.toast.missing_info.title,
        description: t.reminders.toast.missing_info.description,
      });
      return;
    }
    startTransition(async () => {
      try {
          await addReminder({
            task: newTask,
            date: newDate,
            time: newTime,
          });
          setNewTask('');
          setNewDate('');
          setNewTime('');
          toast({
            title: t.reminders.toast.added.title,
            description: `${t.reminders.toast.added.description_prefix} "${newTask}" ${t.reminders.toast.added.description_suffix} ${newDate}.`,
          });
          await fetchAndSetReminders(); // Refetch reminders
      } catch (error) {
        toast({
            variant: 'destructive',
            title: "Failed to add reminder",
        })
      }
    });
  };

  const handleDeleteReminder = (id: string) => {
     startTransition(async () => {
        try {
            await deleteReminder(id);
            toast({
                title: t.reminders.toast.removed.title,
            });
            await fetchAndSetReminders(); // Refetch reminders
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Failed to remove reminder",
            })
        }
     });
  };

  const formatDate = (dateString: string, timeString: string) => {
    const date = new Date(`${dateString}T${timeString}`);
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true,
        timeZone: 'UTC' // Assuming dates/times are stored in UTC
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
            {isLoading ? (
                <div className="flex justify-center items-center p-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : reminders.length > 0 ? (
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
