
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Users, Plus, AlertCircle, Globe, Lock, User } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import ContactButton from '@/components/messaging/ContactButton';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PassengerProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

interface Trip {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  price: number;
  seats_available: number;
  is_public: boolean;
  description: string | null;
  bookings: {
    id: string;
    passenger_id: string;
    seats: number;
    status: string;
    passenger?: PassengerProfile | null;
  }[] | null;
}

const MyTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user) return;
      
      try {
        // First fetch trips with bookings
        const { data: tripsData, error: tripsError } = await supabase
          .from('trips')
          .select(`
            *,
            bookings (
              id,
              passenger_id,
              seats,
              status
            )
          `)
          .eq('driver_id', user.id);

        if (tripsError) throw tripsError;
        
        if (tripsData) {
          // Fetch passenger profiles separately
          const passengerIds = tripsData
            .flatMap(trip => trip.bookings?.map(booking => booking.passenger_id) || [])
            .filter(Boolean);
          
          const { data: passengersData } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, avatar_url')
            .in('id', passengerIds);

          // Combine the data
          const tripsWithPassengers = tripsData.map(trip => ({
            ...trip,
            bookings: trip.bookings?.map(booking => ({
              ...booking,
              passenger: passengersData?.find(passenger => passenger.id === booking.passenger_id) || null
            })) || null
          }));

          setTrips(tripsWithPassengers);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
        toast({
          title: "Failed to load trips",
          description: "There was an error loading your trips.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [user, toast]);

  const handleBookingStatusChange = async (bookingId: string, newStatus: string, passengerId: string, tripData: any) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      // Update local state
      setTrips(currentTrips => 
        currentTrips.map(trip => ({
          ...trip,
          bookings: trip.bookings?.map(booking => 
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
          ) || null
        }))
      );

      // Send notification to passenger
      await supabase
        .from('notifications')
        .insert({
          user_id: passengerId,
          message: `Your booking from ${tripData.origin} to ${tripData.destination} has been ${newStatus}.`,
          related_trip_id: tripData.id,
          related_booking_id: bookingId
        });

      toast({
        title: "Status updated",
        description: `Booking status changed to ${newStatus}.`
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Update failed",
        description: "There was an error updating the booking status.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4 flex justify-center items-center" style={{ height: 'calc(100vh - 300px)' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your trips...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary/10 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">My Trips</h1>
            <p className="text-gray-600">Manage the rides you're offering and review booking requests.</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {trips.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle className="h-16 w-16 mx-auto text-gray-400" />
              <h2 className="text-xl font-medium mt-4">No trips found</h2>
              <p className="text-gray-500 mt-2">You haven't offered any rides yet</p>
              <Button asChild className="mt-6">
                <Link to="/offer-ride">Offer a Ride</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Listed Rides</h2>
                <Button asChild>
                  <Link to="/offer-ride">
                    <Plus className="h-4 w-4 mr-2" />
                    Offer New Ride
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-6">
                {trips.map((trip) => (
                  <Card key={trip.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-grow">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg">{trip.origin} → {trip.destination}</h3>
                                {trip.is_public ? (
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Globe className="h-3 w-3" /> Public
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="flex items-center gap-1 bg-gray-100">
                                    <Lock className="h-3 w-3" /> Private
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{new Date(trip.departure_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{new Date(trip.departure_date).toLocaleTimeString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-xl text-primary">${trip.price}</div>
                              <div className="text-sm text-gray-600">per seat</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-b py-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Pick-up: Central Station, {trip.origin}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{trip.seats_available} seats available</span>
                            </div>
                          </div>

                          {/* Booking requests */}
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Booking Requests ({trip.bookings?.length || 0})</h4>
                            {trip.bookings && trip.bookings.length > 0 ? (
                              <div className="space-y-3">
                                {trip.bookings.map((booking) => (
                                  <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-10 w-10">
                                        <AvatarImage src={booking.passenger?.avatar_url || undefined} />
                                        <AvatarFallback>
                                          <User className="h-5 w-5" />
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">
                                          {booking.passenger?.first_name && booking.passenger?.last_name 
                                            ? `${booking.passenger.first_name} ${booking.passenger.last_name}` 
                                            : 'Passenger'}
                                        </p>
                                        <p className="text-sm text-gray-600">Seats: {booking.seats}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {booking.status === 'pending' ? (
                                        <>
                                          <Button 
                                            size="sm" 
                                            variant="default" 
                                            onClick={() => handleBookingStatusChange(booking.id, 'confirmed', booking.passenger_id, trip)}
                                          >
                                            Confirm
                                          </Button>
                                          <Button 
                                            size="sm" 
                                            variant="outline" 
                                            onClick={() => handleBookingStatusChange(booking.id, 'cancelled', booking.passenger_id, trip)}
                                          >
                                            Decline
                                          </Button>
                                        </>
                                      ) : (
                                        <Badge className={`${
                                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </Badge>
                                      )}
                                      <ContactButton
                                        recipientId={booking.passenger_id}
                                        recipientName={booking.passenger?.first_name && booking.passenger?.last_name 
                                          ? `${booking.passenger.first_name} ${booking.passenger.last_name}` 
                                          : 'Passenger'}
                                        tripId={trip.id}
                                        buttonText="Contact"
                                        variant="outline"
                                        size="sm"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">No booking requests yet.</p>
                            )}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 flex flex-col justify-between md:w-64">
                          <Button asChild className="w-full mb-2">
                            <Link to={`/trips/${trip.id}`}>View Trip</Link>
                          </Button>
                          <Button variant="outline" className="w-full">
                            Edit Trip
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyTrips;
