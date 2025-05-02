
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripLoader from '@/components/trips/TripLoader';
import TripNotFound from '@/components/trips/TripNotFound';
import TripInfo from '@/components/trips/TripInfo';
import BookingCard from '@/components/trips/BookingCard';
import Breadcrumbs from '@/components/trips/Breadcrumbs';
import { supabase } from '@/integrations/supabase/client';

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
  driver?: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    trips: number;
  };
}

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          // Convert to expected format for TripInfo component
          const tripWithDriver: Trip = {
            ...data,
            driver: {
              id: data.driver_id,
              name: "Trip Driver", // Placeholder - would fetch from profiles table
              avatar: "", // Placeholder
              rating: 4.8, // Placeholder
              trips: 42 // Placeholder
            }
          };
          
          setTrip(tripWithDriver);
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
              <TripInfo trip={trip} />
            </div>
            
            {/* Booking Card */}
            <div>
              <BookingCard 
                id={trip.id} 
                price={trip.price} 
                seats={trip.seats_available} 
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
