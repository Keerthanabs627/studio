
// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Phone, Briefcase, Trash2 } from "lucide-react";
import { addJob, deleteJob, type Job } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import type { Profile } from "../../profile/actions";

export function LaborMarketplaceClient({ initialJobs, t, profile }: { initialJobs: Job[], t: any, profile: Profile | null }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [rate, setRate] = useState("");
  const [contact, setContact] = useState("");

  const handlePostJob = () => {
    if (!title.trim() || !description.trim() || !location.trim() || !rate.trim() || !contact.trim()) {
        toast({
            variant: 'destructive',
            title: t.labor_marketplace.toast.missing_info_title,
            description: t.labor_marketplace.toast.missing_info_desc,
        });
        return;
    }

    startTransition(async () => {
        try {
            const newJobData = {
                title,
                description,
                location,
                rate,
                contact,
            };
            const newJob = await addJob(newJobData);
            setJobs(prev => [newJob, ...prev]);

            setTitle("");
            setDescription("");
            setLocation("");
            setRate("");
            setContact("");
            toast({
                title: t.labor_marketplace.toast.add_success_title,
                description: t.labor_marketplace.toast.add_success_desc,
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: t.labor_marketplace.toast.add_error_title,
                description: t.labor_marketplace.toast.add_error_desc,
            })
        }
    });
  };

  const handleDeleteJob = (id: string) => {
    startTransition(async () => {
        try {
            await deleteJob(id);
            setJobs(prev => prev.filter(job => job.id !== id));
            toast({
                title: "Job Deleted",
                description: "The job listing has been removed.",
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Failed to delete",
                description: "Could not delete the job listing.",
            })
        }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.labor_marketplace.title}</h1>
        <p className="text-muted-foreground">{t.labor_marketplace.description}</p>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">{t.labor_marketplace.available_title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job) => (
                <Card key={job.id} className="overflow-hidden flex flex-col group relative">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteJob(job.id)}
                      disabled={isPending}
                      aria-label="Delete job"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <CardHeader>
                        <CardTitle className="text-xl pr-8">{job.title}</CardTitle>
                        <CardDescription>{job.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3 flex-1">
                        <p className="text-sm text-muted-foreground">{job.description}</p>
                        <div className="font-bold text-lg text-primary">{job.rate}</div>
                         <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={job.avatar} alt={job.posterName} data-ai-hint="person" />
                                <AvatarFallback>{job.posterName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{t.labor_marketplace.listed_by} {job.posterName}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                       <Button className="w-full">
                            <Phone className="mr-2 h-4 w-4" />
                            {job.contact}
                       </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{t.labor_marketplace.post_card.title}</CardTitle>
                    <CardDescription>{t.labor_marketplace.post_card.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="job-title">{t.labor_marketplace.post_card.title_label}</Label>
                        <Input id="job-title" placeholder={t.labor_marketplace.post_card.title_placeholder} value={title} onChange={(e) => setTitle(e.target.value)} disabled={isPending} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="job-description">{t.labor_marketplace.post_card.description_label}</Label>
                        <Textarea id="job-description" placeholder={t.labor_marketplace.post_card.description_placeholder} value={description} onChange={(e) => setDescription(e.target.value)} disabled={isPending} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="job-location">{t.labor_marketplace.post_card.location_label}</Label>
                        <Input id="job-location" placeholder={t.labor_marketplace.post_card.location_placeholder} value={location} onChange={(e) => setLocation(e.target.value)} disabled={isPending} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="job-rate">{t.labor_marketplace.post_card.rate_label}</Label>
                        <Input id="job-rate" placeholder={t.labor_marketplace.post_card.rate_placeholder} value={rate} onChange={(e) => setRate(e.target.value)} disabled={isPending} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="job-contact">{t.labor_marketplace.post_card.contact_label}</Label>
                        <Input id="job-contact" placeholder={t.labor_marketplace.post_card.contact_placeholder} value={contact} onChange={(e) => setContact(e.target.value)} disabled={isPending} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handlePostJob} disabled={isPending || !profile}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Briefcase className="mr-2 h-4 w-4" />
                        {t.labor_marketplace.post_card.button}
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
