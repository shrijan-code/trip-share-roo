
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Users, Globe } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import MessageButton from './messaging/MessageButton';

export interface TripProps {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  seats: number;
  isPublic?: boolean;
  driver: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    trips: number;
    phone?: string | null;
  };
}

const TripCard: React.FC<TripProps> = ({ id, from, to, date, time, price, seats, isPublic = true, driver }) => {
  const { user } = useAuth();
  const isCurrentUserDriver = user && user.id === driver.id;

  return (
    <Card className="trip-card h-full">
      <CardContent className="p-0">
        <div className="p-4 pb-0 flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{from} → {to}</h3>
                {isPublic && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" /> Public
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{time}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-xl text-primary">${price}</div>
              <div className="text-sm text-gray-600">per seat</div>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <Link to={`/profile/${driver.id}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={driver.avatar} />
                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{driver.name}</div>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="flex items-center">
                    ★★★★★ {driver.rating}
                  </span>
                  <span className="mx-1">•</span>
                  <span>{driver.trips} trips</span>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{seats} seats left</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 px-4 pb-4 flex justify-between">
        <Button asChild variant="default" className="flex-1 mr-2">
          <Link to={`/trips/${id}`}>View Details</Link>
        </Button>
        
        {user && !isCurrentUserDriver && (
          <MessageButton 
            recipientId={driver.id} 
            recipientName={driver.name} 
            tripId={id} 
            buttonText=""
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default TripCard;
