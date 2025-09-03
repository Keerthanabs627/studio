// @ts-nocheck
'use client';

import { useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/locales/client';
import { Bell, CalendarIcon, Trash2, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Reminder {
  id: number;
  task: string;
  date: Date;
}

export default function RemindersPage() {
  const t = useI18n();
  const { toast } = useToast();
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, task: 'Watering plants', date: new Date('2025-09-10T16:12:00') },
    { id: 2, task: 'Check irrigation pump', date: new Date('2025-09-03T08:00:00') },
    { id: 3, task: 'Buy new batch of seeds', date: new Date('2025-09-05T14:00:00') },
  ]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState<Date | undefined>();

  const handleAddReminder = () => {
    if (!task || !date) {
      toast({
        variant: 'destructive',
        title: t.reminders.toast.missing_info.title,
        description: t.reminders.toast.missing_info.description,
      });
      return;
    }

    const newReminder: Reminder = {
      id: Date.now(),
      task,
      date,
    };

    setReminders(prev => [...prev, newReminder].sort((a, b) => a.date.getTime() - b.date.getTime()));
    setTask('');
    setDate(undefined);

    toast({
      title: t.reminders.toast.added.title,
      description: `${t.reminders.toast.added.description_prefix} "${task}" ${t.reminders.toast.added.description_suffix} ${format(date, 'PPP')}.`,
    });
  };

  const handleRemoveReminder = (id: number) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast({
        title: t.reminders.toast.removed.title,
    })
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.sidebar.reminders}</h1>
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
              <Label htmlFor="task-description">{t.reminders.card1.task_label}</Label>
              <Input
                id="task-description"
                placeholder={t.reminders.card1.task_placeholder}
                value={task}
                onChange={e => setTask(e.target.value)}
              />
            </div>
            <div className="space-y-2">
                <Label htmlFor="date">{t.reminders.card1.date_label}</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddReminder}>
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
                 <ul className="space-y-4">
                    {reminders.map(reminder => (
                        <li key={reminder.id} className="flex items-center justify-between rounded-lg bg-secondary/30 p-4">
                            <div className="flex items-start gap-4">
                                <Bell className="h-5 w-5 text-primary mt-1" />
                                <div>
                                    <p className="font-semibold">{reminder.task}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {format(reminder.date, "PPPPp")}
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveReminder(reminder.id)}>
                                <Trash2 className="h-4 w-4 text-destructive/70" />
                                <span className="sr-only">{t.reminders.card2.delete_button_sr}</span>
                            </Button>
                        </li>
                    ))}
                 </ul>
            ) : (
                <p className="text-center text-muted-foreground py-10">{t.reminders.card2.no_reminders}</p>
            )}
           </CardContent>
        </Card>

      </div>
    </div>
  );
}
