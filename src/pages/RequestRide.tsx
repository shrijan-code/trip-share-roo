
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, MapPin, DollarSign, Clock, Search, Globe } from "lucide-react";

const RequestRide = () => {
  const { toast } = useToast();
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ride request submitted",
      description: `Your ride request has been ${isPublic ? 'posted publicly' : 'saved as private'}!`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary/10 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Request a Ride</h1>
            <p className="text-gray-600">Let drivers know where you want to go and find someone headed your way.</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Trip Request</CardTitle>
                <CardDescription>
                  Share your travel plans and find drivers going your way.
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
                        <Input id="from" placeholder="Pickup city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to">To</Label>
                        <Input id="to" placeholder="Destination city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickup">Pickup area</Label>
                        <Input id="pickup" placeholder="E.g. CBD, North Sydney" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dropoff">Drop-off area</Label>
                        <Input id="dropoff" placeholder="E.g. City Center, Airport" required />
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
                        <Label htmlFor="time">Preferred Time</Label>
                        <Input id="time" type="time" required />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="timeFlexibility">Time Flexibility</Label>
                        <select 
                          id="timeFlexibility" 
                          required
                          className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select flexibility</option>
                          <option value="exact">Exact time only</option>
                          <option value="1hour">± 1 hour</option>
                          <option value="2hours">± 2 hours</option>
                          <option value="3hours">± 3 hours</option>
                          <option value="anytime">Anytime that day</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Passengers & Budget */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-primary" />
                      Passengers & Budget
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Number of passengers</Label>
                        <select 
                          id="passengers" 
                          required
                          className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="1">1 passenger</option>
                          <option value="2">2 passengers</option>
                          <option value="3">3 passengers</option>
                          <option value="4">4 passengers</option>
                          <option value="5">5+ passengers</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Maximum budget per person (AUD)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                          <Input id="budget" type="number" className="pl-7" placeholder="0.00" required min="1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Listing Visibility */}
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-medium text-lg flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-primary" />
                      Request Visibility
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Make this request public</p>
                        <p className="text-sm text-gray-500">
                          {isPublic 
                            ? "Your request will be visible to all drivers. They can offer you a ride." 
                            : "Your request will be private. Only search for existing rides."}
                        </p>
                      </div>
                      <Switch 
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                        aria-label="Toggle public request"
                      />
                    </div>
                    {isPublic && (
                      <div className="bg-primary/5 p-4 rounded-md">
                        <h4 className="font-medium mb-2">Public Request Benefits</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Drivers can find your request and contact you</li>
                          <li>Higher chances of finding a ride that works for you</li>
                          <li>Option to accept or decline ride offers</li>
                          <li>Flexibility to negotiate times with drivers</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Additional Info */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional information (optional)</Label>
                    <textarea 
                      id="notes" 
                      className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Share any additional details about your trip requirements..."
                    />
                  </div>
                  
                  {/* Submit */}
                  <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full">
                      {isPublic ? "Post Request Publicly" : "Search for Rides"}
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

export default RequestRide;
