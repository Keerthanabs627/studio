
// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from 'react';
import { useI18n, useLocale } from "@/locales/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Play, Pause, Radio } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateFarmRadio } from '../actions';

export function FarmRadio() {
    const t = useI18n();
    const { locale } = useLocale();
    const { toast } = useToast();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current && audioSrc) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, audioSrc]);
    
    const handlePlayPause = async () => {
        if (isLoading) return;

        if (isPlaying) {
            setIsPlaying(false);
            return;
        }

        if (audioSrc) {
            setIsPlaying(true);
        } else {
            setIsLoading(true);
            try {
                const result = await generateFarmRadio({ location: 'Belagavi', locale: locale });
                if (result.error) {
                    throw new Error(result.error);
                }
                setAudioSrc(result.audioDataUri!);
                setIsPlaying(true);
            } catch (error) {
                console.error("Farm Radio Error:", error);
                toast({
                    variant: 'destructive',
                    title: t.dashboard.farm_radio.toast.error_title,
                    description: (error as Error).message,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Radio className="w-5 h-5 text-primary" />
                    {t.dashboard.farm_radio.title}
                </CardTitle>
                <CardDescription>{t.dashboard.farm_radio.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handlePlayPause} className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t.dashboard.farm_radio.loading_button}
                        </>
                    ) : isPlaying ? (
                        <>
                            <Pause className="mr-2 h-4 w-4" />
                            {t.dashboard.farm_radio.pause_button}
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-4 w-4" />
                            {t.dashboard.farm_radio.play_button}
                        </>
                    )}
                </Button>
                {audioSrc && <audio ref={audioRef} src={audioSrc} onEnded={() => setIsPlaying(false)} />}
            </CardContent>
        </Card>
    );
}

