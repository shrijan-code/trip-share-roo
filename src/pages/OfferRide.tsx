
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, MapPin, DollarSign, Clock, Car, Users } from "lucide-react";

const OfferRide = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ride submitted",
      description: "Your ride has been successfully listed!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary/10 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Offer a Ride</h1>
            <p className="text-gray-600">Share your journey and help others travel while covering your costs.</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
                <CardDescription>
                  Let other travelers know about your planned journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Route */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      Route Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="from">From</Label>
                        <Input id="from" placeholder="Departure city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to">To</Label>
                        <Input id="to" placeholder="Destination city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickup">Pickup location</Label>
                        <Input id="pickup" placeholder="E.g. Central Station" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dropoff">Drop-off location</Label>
                        <Input id="dropoff" placeholder="E.g. Central Station" required />
                      </div>
                    </div>
                  </div>
                  
                  {/* Date & Time */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                      Date & Time
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Departure Time</Label>
                        <Input id="time" type="time" required />
                      </div>
                    </div>
                  </div>
                  
                  {/* Vehicle & Seats */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg flex items-center">
                      <Car className="h-5 w-5 mr-2 text-primary" />
                      Vehicle & Seats
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="vehicle">Vehicle model</Label>
                        <Input id="vehicle" placeholder="E.g. Toyota Corolla" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="seats">Available seats</Label>
                        <select 
                          id="seats" 
                          required
                          className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select seats</option>
                          <option value="1">1 seat</option>
                          <option value="2">2 seats</option>
                          <option value="3">3 seats</option>
                          <option value="4">4 seats</option>
                          <option value="5">5+ seats</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-primary" />
                      Price & Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price per seat (AUD)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                          <Input id="price" type="number" className="pl-7" placeholder="0.00" required min="1" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Preferences</Label>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="smoking" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <label htmlFor="smoking">No smoking</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="pets" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <label htmlFor="pets">Pets allowed</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="music" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <label htmlFor="music">Music</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional information (optional)</Label>
                    <textarea 
                      id="notes" 
                      className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Share any additional details about your trip..."
                    />
                  </div>
                  
                  {/* Submit */}
                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full">
                      Publish Ride
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfferRide;
