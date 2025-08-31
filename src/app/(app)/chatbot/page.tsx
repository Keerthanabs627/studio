// @ts-nocheck
'use client';

import { ChatInterface } from './components/chat-interface';
import { useI18n } from '@/locales/client';

export default function ChatbotPage() {
  const t = useI18n();

  return (
    <div className="h-full max-h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('chatbot.title')}</h1>
        <p className="text-muted-foreground">{t('chatbot.description')}</p>
      </div>
      <ChatInterface />
    </div>
  );
}
