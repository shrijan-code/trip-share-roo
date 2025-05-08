
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import MessageThread from './MessageThread';

interface MessageButtonProps {
  recipientId: string;
  recipientName: string;
  tripId?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  buttonText?: string;
  children?: React.ReactNode;
}

const MessageButton: React.FC<MessageButtonProps> = ({
  recipientId,
  recipientName,
  tripId,
  variant = "outline",
  size = "sm",
  className = "",
  buttonText,
  children
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {children || (
            <>
              <MessageCircle className="h-4 w-4 mr-2" />
              {buttonText || "Message"}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[550px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Message {recipientName}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-hidden mt-4">
          <MessageThread
            recipientId={recipientId}
            recipientName={recipientName}
            tripId={tripId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageButton;
