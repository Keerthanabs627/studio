// @ts-nocheck
'use client';

import { ReactNode, useState, useTransition } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe, Leaf, Mic, Loader2 } from 'lucide-react';
import { SidebarNav } from './sidebar-nav';
import { useLocale } from '@/locales/i18n-provider';
import type { Dictionary } from '@/locales/dictionaries';
import type { Locale } from '@/locales/config';
import { useToast } from '@/hooks/use-toast';
import { getVoiceCommandResponse } from '@/app/(app)/market-prices/voice-command-actions';
import { useRouter } from 'next/navigation';

function LanguageSwitcher() {
  const { setLocale, locale } = useLocale();

  const languageMap = {
    en: 'English',
    hi: 'हिन्दी (Hindi)',
    kn: 'ಕನ್ನಡ (Kannada)',
    ta: 'தமிழ் (Tamil)',
    te: 'తెలుగు (Telugu)',
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Globe className="h-4 w-4" />
            <span className="sr-only">Change language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.entries(languageMap).map(([loc, name]) => (
            <DropdownMenuItem key={loc} onSelect={() => setLocale(loc as Locale)} disabled={locale === loc}>
                {name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  )
}


export function AppShell({ children }: { children: ReactNode }) {
  const [isListening, setIsListening] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: 'destructive',
        title: 'Voice recognition not supported',
        description: 'Your browser does not support the Web Speech API.',
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      toast({
          variant: 'destructive',
          title: 'Speech recognition error',
          description: event.error === 'not-allowed' ? 'Microphone access denied.' : 'An error occurred during speech recognition.',
      })
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const query = event.results[0][0].transcript;
      toast({
          title: 'Heard you say:',
          description: `"${query}"`,
      });

      startTransition(async () => {
        try {
          const response = await getVoiceCommandResponse({ query });
          
          if (response.navigation_target) {
            router.push(response.navigation_target);
          }

          const audio = new Audio(response.audio_response_data_uri);
          audio.play();
          
          toast({
              title: 'AI Response',
              description: response.text_response,
          })
        } catch (error) {
          console.error("Error processing voice command:", error);
          toast({
              variant: 'destructive',
              title: 'Error processing command',
              description: 'Could not get a response from the AI.',
          })
        }
      });
    };

    recognition.start();
  };

  
  return (
      <SidebarProvider>
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="p-4 justify-center">
            <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-secondary">
              <Leaf className="h-8 w-8 text-primary" />
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter className="p-4 justify-center">
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-xl font-bold text-primary">AgriPulse</h1>
            </div>
            <LanguageSwitcher />
          </header>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {children}
          </main>
           <Button 
            size="lg" 
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50"
            onClick={handleVoiceCommand}
            disabled={isListening || isPending}
            aria-label="Use voice command"
           >
            {isListening || isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : <Mic className="h-6 w-6" />}
          </Button>
        </SidebarInset>
      </SidebarProvider>
  );
}
