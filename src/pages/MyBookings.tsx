import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, User } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import CompletePaymentButton from '@/components/trips/CompletePaymentButton';
import ContactButton from '@/components/messaging/ContactButton';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DriverProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

interface Booking {
  id: string;
  trip_id: string;
  passenger_id: string;
  seats: number;
  status: string;
  created_at: string;
  trip: {
    origin: string;
    destination: string;
    departure_date: string;
    price: number;
    driver_id: string;
    driver?: DriverProfile | null;
  }
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        // First fetch bookings with trip data
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            *,
            trip:trip_id (
              origin,
              destination,
              departure_date,
              price,
              driver_id
            )
          `)
          .eq('passenger_id', user.id);

        if (bookingsError) throw bookingsError;
        
        if (bookingsData) {
          // Fetch driver profiles separately
          const driverIds = bookingsData.map(booking => booking.trip.driver_id).filter(Boolean);
          const { data: driversData } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, avatar_url')
            .in('id', driverIds);

          // Combine the data
          const bookingsWithDrivers = bookingsData.map(booking => ({
            ...booking,
            trip: {
              ...booking.trip,
              driver: driversData?.find(driver => driver.id === booking.trip.driver_id) || null
            }
          }));

          setBookings(bookingsWithDrivers);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Failed to load bookings",
          description: "There was an error loading your bookings.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, toast]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-100 text-green-700">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-700">Cancelled</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4 flex justify-center items-center" style={{ height: 'calc(100vh - 300px)' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your bookings...</p>
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
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-gray-600">Manage and review your trip bookings</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle className="h-16 w-16 mx-auto text-gray-400" />
              <h2 className="text-xl font-medium mt-4">No bookings found</h2>
              <p className="text-gray-500 mt-2">You haven't made any bookings yet</p>
              <Button asChild className="mt-6">
                <Link to="/find-rides">Find Rides</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-6 flex-grow">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg">
                            {booking.trip.origin} → {booking.trip.destination}
                          </h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        
                        {/* Driver Info */}
                        {booking.trip.driver && (
                          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-md">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={booking.trip.driver.avatar_url || undefined} />
                              <AvatarFallback>
                                <User className="h-5 w-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <p className="font-medium">
                                Driver: {booking.trip.driver.first_name && booking.trip.driver.last_name 
                                  ? `${booking.trip.driver.first_name} ${booking.trip.driver.last_name}` 
                                  : 'Driver'}
                              </p>
                            </div>
                            <ContactButton
                              recipientId={booking.trip.driver_id}
                              recipientName={booking.trip.driver.first_name && booking.trip.driver.last_name 
                                ? `${booking.trip.driver.first_name} ${booking.trip.driver.last_name}` 
                                : 'Driver'}
                              tripId={booking.trip_id}
                              buttonText="Contact Driver"
                              variant="outline"
                              size="sm"
                            />
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-4">
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Date</p>
                              <p className="text-gray-600">
                                {new Date(booking.trip.departure_date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Time</p>
                              <p className="text-gray-600">
                                {new Date(booking.trip.departure_date).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Location</p>
                              <p className="text-gray-600">Central Station, {booking.trip.origin}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Booked</p>
                              <p className="text-gray-600">
                                {new Date(booking.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 flex flex-col justify-between md:w-64">
                        <div>
                          <p className="text-xl font-bold text-primary">${booking.trip.price}</p>
                          <p className="text-gray-500 text-sm">per person</p>
                          <p className="mt-2 font-medium">Total: ${booking.trip.price * booking.seats}</p>
                          <p className="text-sm text-gray-500">{booking.seats} {booking.seats > 1 ? 'seats' : 'seat'}</p>
                        </div>
                        <div className="mt-6">
                          <Button asChild className="w-full mb-2">
                            <Link to={`/trips/${booking.trip_id}`}>View Trip</Link>
                          </Button>
                          {booking.status === 'confirmed' && (
                            <CompletePaymentButton 
                              bookingId={booking.id}
                              amount={booking.trip.price * booking.seats}
                              tripOrigin={booking.trip.origin}
                              tripDestination={booking.trip.destination}
                              onSuccess={() => {
                                toast({
                                  title: "Trip Completed",
                                  description: "Thank you for your payment. Your trip has been completed.",
                                });
                              }}
                            />
                          )}
                          {booking.status === 'pending' && (
                            <Button variant="outline" className="w-full">
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyBookings;
