
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/AuthContext';
import UserTripsList from './UserTripsList';
import UserMessageTab from './UserMessageTab';
import ContactButton from '@/components/messaging/ContactButton';

interface Trip {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  price: number;
  seats_available: number;
}

interface UserProfileTabsProps {
  trips: Trip[];
  userId: string;
  username: string;
  isCurrentUserProfile: boolean;
  currentUserId?: string;
}

const UserProfileTabs: React.FC<UserProfileTabsProps> = ({
  trips,
  userId,
  username,
  isCurrentUserProfile,
  currentUserId,
}) => {
  const { user } = useAuth();
  const canMessage = user && !isCurrentUserProfile && user.id !== userId;

  return (
    <Tabs defaultValue="trips" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="trips">Trips</TabsTrigger>
        <TabsTrigger value="messages">
          {isCurrentUserProfile ? 'Messages' : 'Contact'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="trips" className="space-y-4">
        <UserTripsList trips={trips} />
      </TabsContent>
      
      <TabsContent value="messages" className="space-y-4">
        {isCurrentUserProfile ? (
          <UserMessageTab recipientId={userId} recipientName={username} />
        ) : canMessage ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <ContactButton
                recipientId={userId}
                recipientName={username}
                buttonText={`Send Message to ${username}`}
                variant="default"
                size="default"
                className="w-full max-w-sm"
              />
            </div>
            <UserMessageTab recipientId={userId} recipientName={username} />
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>Please log in to send messages</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default UserProfileTabs;
