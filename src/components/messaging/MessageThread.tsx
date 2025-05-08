
import React from 'react';
import { Loader2 } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useMessages } from '@/hooks/useMessages';

interface MessageThreadProps {
  recipientId: string;
  recipientName: string;
  tripId?: string;
}

const MessageThread: React.FC<MessageThreadProps> = ({ 
  recipientId, 
  recipientName, 
  tripId 
}) => {
  const { messages, loading, sendMessage, formatDate } = useMessages(recipientId, tripId);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
    // We don't need to return any value, fixing the TypeScript error
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto mb-4 max-h-[400px] space-y-3">
        <MessageList messages={messages} formatDate={formatDate} />
      </div>
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        recipientName={recipientName}
      />
    </div>
  );
};

export default MessageThread;
