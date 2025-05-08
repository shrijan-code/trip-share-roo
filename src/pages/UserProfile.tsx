
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, User, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
}

interface Trip {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  price: number;
  seats_available: number;
}

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        // Fetch the user's profile
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data);

        // Fetch the user's trips
        const { data: tripsData, error: tripsError } = await supabase
          .from('trips')
          .select('*')
          .eq('driver_id', id)
          .order('departure_date', { ascending: true })
          .limit(5);

        if (tripsError) {
          throw tripsError;
        }

        setTrips(tripsData || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

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

  const getFullName = () => {
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
    return 'User';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-gray-600">The requested user profile does not exist or has been removed.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* User Profile Card */}
            <div className="md:col-span-1">
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
                    
                    <Button 
                      onClick={handleContactClick} 
                      className="w-full mb-2"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Trips */}
            <div className="md:col-span-2">
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
