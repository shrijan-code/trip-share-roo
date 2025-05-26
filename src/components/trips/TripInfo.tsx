
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, DollarSign, Users, Star, Phone, MessageCircle, User } from "lucide-react";
import { TripProps } from '@/components/TripCard';
import ContactButton from '@/components/messaging/ContactButton';

interface TripInfoProps {
  trip: TripProps;
  onContactDriver: () => void;
  onViewProfile: () => void;
}

const TripInfo: React.FC<TripInfoProps> = ({ trip, onContactDriver, onViewProfile }) => {
  return (
    <div className="space-y-6">
      {/* Trip Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Trip Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Route</p>
              <p className="text-gray-600">{trip.from} → {trip.to}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Departure</p>
              <p className="text-gray-600">{trip.date} at {trip.time}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <DollarSign className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Price per seat</p>
              <p className="text-gray-600">${trip.price}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Available seats</p>
              <p className="text-gray-600">{trip.seats} seats</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Driver Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Driver Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={trip.driver.avatar} alt={trip.driver.name} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{trip.driver.name}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{trip.driver.rating}</span>
                <span>•</span>
                <span>{trip.driver.trips} trips</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={onViewProfile} variant="outline" className="flex-1">
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Button>
            
            <ContactButton
              recipientId={trip.driver.id}
              recipientName={trip.driver.name}
              tripId={trip.id}
              buttonText="Message Driver"
              className="flex-1"
            />

            {trip.driver.phone && (
              <Button variant="outline" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trip Description */}
      {trip.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Trip Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{trip.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TripInfo;
