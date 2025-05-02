
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import TripCard from '@/components/TripCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, ArrowDown, ArrowUp } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface TripData {
  id: string;
  origin: string;
  destination: string;
  departure_date: string;
  price: number;
  seats_available: number;
  is_public: boolean;
  driver_id: string;
}

const FindRides = () => {
  const [sortBy, setSortBy] = useState("date");
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPublicTrips = async () => {
      try {
        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .eq('is_public', true)
          .order('departure_date', { ascending: true });

        if (error) throw error;

        if (data) {
          // Transform to expected format for TripCard
          const formattedTrips = data.map((trip: TripData) => {
            const departureDate = new Date(trip.departure_date);
            return {
              id: trip.id,
              from: trip.origin,
              to: trip.destination,
              date: departureDate.toLocaleDateString(),
              time: departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              price: Number(trip.price),
              seats: trip.seats_available,
              isPublic: trip.is_public,
              driver: {
                id: trip.driver_id,
                name: "Trip Driver", // Placeholder for now
                avatar: "",
                rating: 4.5,
                trips: 10
              }
            };
          });
          
          setTrips(formattedTrips);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
        toast({
          title: "Error fetching trips",
          description: "Could not load available trips. Please try again.",
          variant: "destructive"
        });
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicTrips();
  }, [toast]);

  const handleSort = (value: string) => {
    setSortBy(value);
    let sortedTrips = [...trips];
    
    switch (value) {
      case "price-low":
        sortedTrips.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedTrips.sort((a, b) => b.price - a.price);
        break;
      case "date":
        sortedTrips.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "seats":
        sortedTrips.sort((a, b) => b.seats - a.seats);
        break;
      default:
        break;
    }
    
    setTrips(sortedTrips);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary/10 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Find a Ride</h1>
            <SearchForm />
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Available rides</h2>
              {loading ? (
                <p className="text-gray-600">Loading trips...</p>
              ) : (
                <p className="text-gray-600">Showing {trips.length} trips</p>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <Label htmlFor="sort" className="mr-2">Sort by:</Label>
              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger className="w-[180px]" id="sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Departure Date</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="seats">Available Seats</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <TripCard key={trip.id} {...trip} />
              ))}
            </div>
          )}
          
          {/* Empty state (hidden when trips are available) */}
          {!loading && trips.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 inline-block p-4 rounded-full mb-4">
                <MapPin className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No trips found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any trips matching your search criteria.
              </p>
              <p className="text-gray-600">
                Try different dates or locations, or check back later for new trips.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindRides;
