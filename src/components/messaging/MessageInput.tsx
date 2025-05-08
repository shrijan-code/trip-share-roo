
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (content: string) => Promise<void>;
  recipientName: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, recipientName }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    try {
      setSending(true);
      await onSendMessage(message.trim());
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        placeholder={`Send a message to ${recipientName}...`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-24 resize-none pr-12"
        disabled={sending}
      />
      <Button 
        type="submit" 
        size="sm" 
        className="absolute bottom-2 right-2" 
        disabled={!message.trim() || sending}
      >
        <SendHorizontal className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};

export default MessageInput;
