
import React from 'react';
import { TripProps } from '@/components/TripCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Users, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TripInfoProps {
  trip: TripProps;
}

const TripInfo: React.FC<TripInfoProps> = ({ trip }) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">{trip.from} to {trip.to}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Trip details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">{trip.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Departure time</p>
                <p className="text-gray-600">{trip.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Pickup location</p>
                <p className="text-gray-600">Central Station, {trip.from}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Drop-off location</p>
                <p className="text-gray-600">Central Station, {trip.to}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Available seats</p>
                <p className="text-gray-600">{trip.seats} seats</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Trip protection</p>
                <p className="text-gray-600">Includes insurance coverage</p>
              </div>
            </div>
          </div>
          
          {/* Driver information */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold text-lg mb-4">About the driver</h3>
            <div className="flex items-center">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={trip.driver.avatar} />
                <AvatarFallback>{trip.driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg font-medium">{trip.driver.name}</h4>
                <div className="flex items-center text-gray-600">
                  <span className="flex items-center text-yellow-500">
                    ★★★★★ {trip.driver.rating}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{trip.driver.trips} trips</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="mr-3">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Driver
              </Button>
              <Button variant="ghost" size="sm">
                View Profile
              </Button>
            </div>
          </div>
          
          {/* Trip rules */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold text-lg mb-4">Trip rules & preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">No smoking</Badge>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">Small luggage only</Badge>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">Pets allowed</Badge>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">Music friendly</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripInfo;
