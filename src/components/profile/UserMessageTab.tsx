
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MessageThread from '@/components/messaging/MessageThread';

interface UserMessageTabProps {
  recipientId: string;
  recipientName: string;
}

const UserMessageTab: React.FC<UserMessageTabProps> = ({ recipientId, recipientName }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <MessageThread recipientId={recipientId} recipientName={recipientName} />
      </CardContent>
    </Card>
  );
};

export default UserMessageTab;
