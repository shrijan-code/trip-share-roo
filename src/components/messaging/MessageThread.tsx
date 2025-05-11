
import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useMessages } from '@/hooks/useMessages';
import { useToast } from '@/components/ui/use-toast';

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
  const { messages, loading, sendMessage, deleteMessage, formatDate } = useMessages(recipientId, tripId);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessage(content);
      // No need to return any value, fixing the TypeScript error
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      console.error("Error sending message:", error);
    }
  };

  // Add auto-scroll when new messages arrive
  useEffect(() => {
    if (!loading && messages.length > 0) {
      // Scroll to bottom when messages update
      const messageContainer = document.querySelector('.message-container');
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }
  }, [messages, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto mb-4 max-h-[400px] space-y-3 message-container">
        <MessageList 
          messages={messages} 
          formatDate={formatDate} 
          onDeleteMessage={deleteMessage}
        />
      </div>
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        recipientName={recipientName}
      />
    </div>
  );
};

export default MessageThread;
