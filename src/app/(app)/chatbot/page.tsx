import { ChatInterface } from './components/chat-interface';

export default function ChatbotPage() {
  return (
    <div className="h-full max-h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Chatbot</h1>
        <p className="text-muted-foreground">Your personal AI assistant.</p>
      </div>
      <ChatInterface />
    </div>
  );
}
