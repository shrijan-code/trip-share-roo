
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User, Users, MessageCircle, Shield, AlertCircle } from "lucide-react";
import { getTripById } from '@/data/mockTrips';
import { TripProps } from '@/components/TripCard';

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<TripProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, we would fetch from an API
      const foundTrip = getTripById(id);
      setTrip(foundTrip || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4 flex justify-center items-center" style={{ height: 'calc(100vh - 300px)' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading trip details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4 flex justify-center items-center" style={{ height: 'calc(100vh - 300px)' }}>
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold mt-4">Trip Not Found</h2>
            <p className="mt-2 text-gray-600">Sorry, we couldn't find the trip you're looking for.</p>
            <Button asChild className="mt-6">
              <Link to="/find-rides">Browse Available Trips</Link>
            </Button>
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
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/find-rides" className="hover:text-primary">Find Rides</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Trip Details</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Trip Information */}
            <div className="lg:col-span-2">
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
            </div>
            
            {/* Booking Card */}
            <div>
              <Card className="sticky top-20">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl font-bold text-primary">${trip.price}</h3>
                        <p className="text-gray-500">per person</p>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {trip.seats} seats available
                      </div>
                    </div>
                    
                    <div className="border-t border-b py-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Seat price</span>
                        <span>${trip.price}.00</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Service fee</span>
                        <span>$3.00</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${trip.price + 3}.00</span>
                      </div>
                    </div>
                    
                    <Button className="w-full" size="lg">
                      Book This Trip
                    </Button>
                    
                    <div className="text-sm text-gray-500 text-center">
                      You won't be charged yet
                    </div>
                    
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Shield className="h-4 w-4 mr-2 text-green-600" />
                      Secure payment processing
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TripDetails;
