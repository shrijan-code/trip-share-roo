
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTripsList from './UserTripsList';
import UserMessageTab from './UserMessageTab';
import NotificationsTab from '../notifications/NotificationsTab';

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
  currentUserId: string | undefined;
}

const UserProfileTabs: React.FC<UserProfileTabsProps> = ({ 
  trips, 
  userId, 
  username, 
  isCurrentUserProfile,
  currentUserId
}) => {
  return (
    <Tabs defaultValue="trips">
      <TabsList className="w-full mb-4">
        <TabsTrigger value="trips" className="flex-1">Upcoming Trips</TabsTrigger>
        {isCurrentUserProfile && (
          <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
        )}
        {currentUserId && !isCurrentUserProfile && (
          <TabsTrigger value="messages" className="flex-1">Messages</TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="trips">
        <UserTripsList trips={trips} />
      </TabsContent>
      
      {isCurrentUserProfile && (
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
      )}
      
      {currentUserId && !isCurrentUserProfile && (
        <TabsContent value="messages">
          <UserMessageTab recipientId={userId} recipientName={username} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default UserProfileTabs;
