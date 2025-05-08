
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

interface Trip {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  price: number;
  seats_available: number;
}

interface UserTripsListProps {
  trips: Trip[];
}

const UserTripsList: React.FC<UserTripsListProps> = ({ trips }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Upcoming Trips</CardTitle>
      </CardHeader>
      <CardContent>
        {trips.length > 0 ? (
          <div className="space-y-4">
            {trips.map((trip) => {
              const departureDate = new Date(trip.departure_date);
              const formattedDate = departureDate.toLocaleDateString();
              const formattedTime = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
                <div key={trip.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">
                      {trip.origin} to {trip.destination}
                    </h3>
                    <span className="font-bold text-primary">${trip.price}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{formattedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{formattedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">From: {trip.origin}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">To: {trip.destination}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => window.location.href = `/trips/${trip.id}`}
                  >
                    View details
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">This user has no upcoming trips.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UserTripsList;
