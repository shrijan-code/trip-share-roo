
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, Edit, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MessageButton from '@/components/messaging/MessageButton';

interface UserProfileInfoProps {
  profile: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    phone: string | null;
  };
  isCurrentUserProfile: boolean;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ 
  profile, 
  isCurrentUserProfile 
}) => {
  const { toast } = useToast();

  const getFullName = () => {
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
    return 'User';
  };

  const handleContactClick = () => {
    if (profile?.phone) {
      navigator.clipboard.writeText(profile.phone).then(() => {
        toast({
          title: "Phone number copied!",
          description: `You can now call or text ${profile.first_name} at ${profile.phone}`,
        });
      });
    } else {
      toast({
        title: "Contact information unavailable",
        description: "This user hasn't provided contact information yet.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={profile.avatar_url || ''} />
            <AvatarFallback>
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{getFullName()}</h2>
          <p className="text-gray-500 mb-4">Driver</p>
          
          {isCurrentUserProfile ? (
            <Button 
              variant="outline" 
              className="w-full mb-2"
              asChild
            >
              <Link to="/edit-profile">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          ) : (
            <div className="w-full space-y-2">
              <Button 
                onClick={handleContactClick} 
                className="w-full mb-2"
              >
                <Phone className="mr-2 h-4 w-4" />
                Copy Phone Number
              </Button>
              
              <MessageButton
                recipientId={profile.id || ''}
                recipientName={getFullName()}
                className="w-full"
                variant="outline"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </MessageButton>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileInfo;
