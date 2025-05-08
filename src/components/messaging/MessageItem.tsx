
import React from 'react';
import { useAuth } from '@/context/AuthContext';

interface MessageItemProps {
  message: {
    id: string;
    sender_id: string;
    content: string;
    created_at: string;
  };
  formatDate: (dateString: string) => string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, formatDate }) => {
  const { user } = useAuth();
  const isCurrentUser = message.sender_id === user?.id;

  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 ${
          isCurrentUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        }`}
      >
        <div className="text-sm">{message.content}</div>
        <div
          className={`text-xs mt-1 ${
            isCurrentUser ? 'text-primary-foreground/80' : 'text-gray-500'
          }`}
        >
          {formatDate(message.created_at)}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
