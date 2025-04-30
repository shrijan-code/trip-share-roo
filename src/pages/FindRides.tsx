
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import TripCard from '@/components/TripCard';
import { mockTrips } from '@/data/mockTrips';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, ArrowDown, ArrowUp } from "lucide-react";

const FindRides = () => {
  const [sortBy, setSortBy] = useState("date");
  const [trips, setTrips] = useState(mockTrips);

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
        // Simple string comparison for date+time (in a real app we'd use proper date objects)
        sortedTrips.sort((a, b) => a.date.localeCompare(b.date));
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
              <p className="text-gray-600">Showing {trips.length} trips</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>
          
          {/* Empty state (hidden when trips are available) */}
          {trips.length === 0 && (
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
