
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCard, { TripProps } from '@/components/TripCard';
import { Button } from '@/components/ui/button';
import { mockTrips } from '@/data/mockTrips';
import { Link } from 'react-router-dom';
import { ChevronLeft, Info } from 'lucide-react';

interface RouteDetail {
  from: string;
  to: string;
  description: string;
  image: string;
  distance: string;
  duration: string;
  popularity: string;
}

const RouteDetailPage: React.FC = () => {
  const { fromCity, toCity } = useParams<{ fromCity: string; toCity: string }>();
  const [trips, setTrips] = useState<TripProps[]>([]);
  const [routeInfo, setRouteInfo] = useState<RouteDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fromCity && toCity) {
      // Find trips matching the route
      const filteredTrips = mockTrips.filter(
        trip => trip.from.toLowerCase() === fromCity && trip.to.toLowerCase() === toCity
      );
      
      // Set route information
      const routeDetails: Record<string, RouteDetail> = {
        'sydney-melbourne': {
          from: 'Sydney',
          to: 'Melbourne',
          description: 'One of Australia\'s most popular routes connecting the country\'s two largest cities. The journey takes you through beautiful countryside and regional towns.',
          image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop',
          distance: '878 km',
          duration: '9-10 hours',
          popularity: 'Very High'
        },
        'melbourne-adelaide': {
          from: 'Melbourne',
          to: 'Adelaide',
          description: 'A scenic coastal route that follows parts of the Great Ocean Road before heading inland to the vibrant city of Adelaide.',
          image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&auto=format&fit=crop',
          distance: '725 km',
          duration: '8 hours',
          popularity: 'High'
        },
        'brisbane-sydney': {
          from: 'Brisbane',
          to: 'Sydney',
          description: 'A beautiful journey along Australia\'s eastern coast, passing through coastal towns and stunning beaches.',
          image: 'https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=800&auto=format&fit=crop',
          distance: '915 km',
          duration: '10-11 hours',
          popularity: 'High'
        },
        'perth-margaret-river': {
          from: 'Perth',
          to: 'Margaret River',
          description: 'A relatively short but scenic drive from Western Australia\'s capital to the renowned wine region of Margaret River.',
          image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&auto=format&fit=crop',
          distance: '277 km',
          duration: '3 hours',
          popularity: 'Medium'
        }
      };
      
      const key = `${fromCity}-${toCity}`;
      setRouteInfo(routeDetails[key] || null);
      setTrips(filteredTrips);
      setLoading(false);
    }
  }, [fromCity, toCity]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4 flex justify-center items-center" style={{ height: 'calc(100vh - 300px)' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading route details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!routeInfo) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4 flex justify-center items-center" style={{ height: 'calc(100vh - 300px)' }}>
          <div className="text-center">
            <Info className="h-16 w-16 mx-auto text-gray-400" />
            <h2 className="text-xl font-medium mt-4">Route not found</h2>
            <p className="text-gray-500 mt-2">We couldn't find information about this route</p>
            <Button asChild className="mt-6">
              <Link to="/find-rides">Browse all routes</Link>
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
        <div 
          className="h-64 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${routeInfo.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <Link to="/find-rides" className="text-white mb-4 flex items-center hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to all routes
              </Link>
              <h1 className="text-3xl font-bold text-white mb-2">{routeInfo.from} to {routeInfo.to}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/90 text-sm">
                <span>{routeInfo.distance}</span>
                <span>•</span>
                <span>{routeInfo.duration} drive</span>
                <span>•</span>
                <span>{routeInfo.popularity} popularity</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About this route</h2>
            <p className="text-gray-600">
              {routeInfo.description}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Available trips</h2>
              <Button asChild variant="outline">
                <Link to="/offer-ride">Offer a ride on this route</Link>
              </Button>
            </div>
            
            {trips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <TripCard key={trip.id} {...trip} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-6">No trips currently available for this route</p>
                <Button asChild>
                  <Link to="/request-ride">Request a ride</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RouteDetailPage;
