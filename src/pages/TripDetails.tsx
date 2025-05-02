
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TripProps } from '@/components/TripCard';
import { getTripById } from '@/data/mockTrips';
import TripLoader from '@/components/trips/TripLoader';
import TripNotFound from '@/components/trips/TripNotFound';
import TripInfo from '@/components/trips/TripInfo';
import BookingCard from '@/components/trips/BookingCard';
import Breadcrumbs from '@/components/trips/Breadcrumbs';

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
