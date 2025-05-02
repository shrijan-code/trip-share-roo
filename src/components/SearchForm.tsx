
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Search, User } from "lucide-react";

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Build query string with search parameters
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    if (date) params.append('date', date);
    if (passengers) params.append('passengers', passengers);
    
    // Navigate to find-rides with search parameters
    navigate(`/find-rides?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from" className="font-medium">From</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                id="from" 
                placeholder="Departure city" 
                className="pl-10"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="to" className="font-medium">To</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                id="to" 
                placeholder="Destination city" 
                className="pl-10"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="font-medium">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                id="date" 
                type="date" 
                className="pl-10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="passengers" className="font-medium">Passengers</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select 
                id="passengers" 
                className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
              >
                <option value="1">1 passenger</option>
                <option value="2">2 passengers</option>
                <option value="3">3 passengers</option>
                <option value="4">4 passengers</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2 md:self-end">
            <Button type="submit" className="w-full" size="lg">
              <Search className="h-5 w-5 mr-2" />
              Find Rides
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
