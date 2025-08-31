// @ts-nocheck
"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import { Bot, User, CornerDownLeft, Loader2, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAIResponse } from '../actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/locales/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const t = useI18n();
  const initialMessages: Message[] = [
      {
          role: 'assistant',
          content: t.chatbot.greeting
      }
  ]
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const result = await getAIResponse({ query: input });
      if (result.error) {
        toast({
            variant: "destructive",
            title: t.chatbot.toast.error_title,
            description: result.error,
        });
        const errorMessage: Message = { role: 'assistant', content: t.chatbot.error_message };
        setMessages((prev) => [...prev, errorMessage]);

      } else {
        const assistantMessage: Message = { role: 'assistant', content: result.answer || t.chatbot.no_answer };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    });
  };

  return (
    <Card className="flex-1 flex flex-col h-full">
      <CardContent className="flex-1 flex flex-col p-4 gap-4">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 border-2 border-primary">
                    <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-sm md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl',
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                     <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isPending && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="w-8 h-8 border-2 border-primary">
                    <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                </Avatar>
                <div className="max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-xl bg-secondary flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t pt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chatbot.input_placeholder}
            className="flex-1"
            disabled={isPending}
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CornerDownLeft className="w-4 h-4" />}
            <span className="sr-only">{t.chatbot.send_button_sr}</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
