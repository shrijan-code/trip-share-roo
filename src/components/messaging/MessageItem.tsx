
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MessageItemProps {
  message: {
    id: string;
    sender_id: string;
    content: string;
    created_at: string;
  };
  formatDate: (dateString: string) => string;
  onDeleteMessage: (messageId: string) => Promise<void>;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, formatDate, onDeleteMessage }) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const isCurrentUser = message.sender_id === user?.id;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDeleteMessage(message.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 ${
          isCurrentUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        } relative group`}
      >
        <div className="text-sm">{message.content}</div>
        <div
          className={`text-xs mt-1 ${
            isCurrentUser ? 'text-primary-foreground/80' : 'text-gray-500'
          } flex items-center justify-between`}
        >
          <span>{formatDate(message.created_at)}</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <MoreHorizontal className={`h-3 w-3 ${isCurrentUser ? 'text-primary-foreground/80' : 'text-gray-500'}`} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isCurrentUser ? "end" : "start"} className="w-40">
              <DropdownMenuItem 
                className="text-red-500 cursor-pointer flex items-center"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-3 w-3 mr-2" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
