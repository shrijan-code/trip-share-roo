
import React, { useRef, useEffect } from 'react';
import { Mail } from 'lucide-react';
import MessageItem from './MessageItem';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  trip_id: string | null;
}

interface MessageListProps {
  messages: Message[];
  formatDate: (dateString: string) => string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, formatDate }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        <Mail className="h-12 w-12 mx-auto mb-2 text-gray-400" />
        <p className="text-sm">No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} formatDate={formatDate} />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default MessageList;
