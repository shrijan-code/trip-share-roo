
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripLoader from '@/components/trips/TripLoader';
import TripNotFound from '@/components/trips/TripNotFound';
import TripInfo from '@/components/trips/TripInfo';
import BookingCard from '@/components/trips/BookingCard';
import Breadcrumbs from '@/components/trips/Breadcrumbs';
import { supabase } from '@/integrations/supabase/client';
import { TripProps } from '@/components/TripCard';

interface Trip {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  description: string | null;
  price: number;
  seats_available: number;
  is_public: boolean;
  driver_id: string;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
}

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<TripProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) return;
      
      try {
        // Fetch trip data
        const { data: tripData, error: tripError } = await supabase
          .from('trips')
          .select('*')
          .eq('id', id)
          .single();

        if (tripError) {
          throw tripError;
        }

        if (tripData) {
          // Fetch the driver's profile information
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', tripData.driver_id)
            .single();

          if (profileError) {
            console.error('Error fetching driver profile:', profileError);
          }

          // Format the date and time from the departure_date
          const departureDate = new Date(tripData.departure_date);
          const formattedDate = departureDate.toLocaleDateString();
          const formattedTime = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          // Generate driver name from profile or use placeholder
          let driverName = "Trip Driver";
          if (profileData && (profileData.first_name || profileData.last_name)) {
            driverName = `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim();
          }

          // Count driver's trips
          const { count: tripsCount, error: countError } = await supabase
            .from('trips')
            .select('*', { count: 'exact', head: true })
            .eq('driver_id', tripData.driver_id);

          if (countError) {
            console.error('Error counting driver trips:', countError);
          }

          // Convert to expected format for TripInfo component
          const formattedTrip: TripProps = {
            id: tripData.id,
            from: tripData.origin,
            to: tripData.destination,
            date: formattedDate,
            time: formattedTime,
            price: Number(tripData.price),
            seats: tripData.seats_available,
            isPublic: tripData.is_public,
            driver: {
              id: tripData.driver_id,
              name: driverName,
              avatar: profileData?.avatar_url || "",
              rating: 4.8, // Placeholder until we implement ratings
              trips: tripsCount || 0,
              phone: profileData?.phone || null,
            }
          };
          
          setTrip(formattedTrip);
        }
      } catch (error) {
        console.error('Error fetching trip:', error);
        setTrip(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return <TripLoader />;
  }

  if (!trip) {
    return <TripNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs currentPage="Trip Details" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Trip Information */}
            <div className="lg:col-span-2">
              <TripInfo 
                trip={trip} 
                onContactDriver={() => navigate(`/profile/${trip.driver.id}`)}
                onViewProfile={() => navigate(`/profile/${trip.driver.id}`)}
              />
            </div>
            
            {/* Booking Card */}
            <div>
              <BookingCard 
                id={trip.id} 
                price={trip.price} 
                seats={trip.seats} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TripDetails;
