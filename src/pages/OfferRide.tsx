
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, MapPin, DollarSign, Clock, Car, Users, Globe, Lock } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const OfferRide = () => {
  const { toast } = useToast();
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    vehicle: '',
    seats: '',
    price: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to offer a ride",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format departure date and time
      const departureDateObj = new Date(`${formData.date}T${formData.time}`);
      
      // Create trip record
      const { data, error } = await supabase
        .from('trips')
        .insert({
          driver_id: user.id,
          origin: formData.origin,
          destination: formData.destination,
          departure_date: departureDateObj.toISOString(),
          price: parseFloat(formData.price),
          seats_available: parseInt(formData.seats),
          description: formData.notes,
          is_public: isPublic
        })
        .select();

      if (error) throw error;

      toast({
        title: "Ride submitted",
        description: `Your ride has been successfully ${isPublic ? 'listed publicly' : 'saved as private'}!`,
      });

      // Navigate to my trips page
      navigate('/my-trips');
    } catch (error) {
      console.error('Error submitting ride:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your ride. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
                        <Label htmlFor="origin">From</Label>
                        <Input 
                          id="origin" 
                          placeholder="Departure city" 
                          required 
                          value={formData.origin}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination">To</Label>
                        <Input 
                          id="destination" 
                          placeholder="Destination city" 
                          required 
                          value={formData.destination}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickup">Pickup location</Label>
                        <Input 
                          id="pickup" 
                          placeholder="E.g. Central Station" 
                          required 
                          value={formData.pickup}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dropoff">Drop-off location</Label>
                        <Input 
                          id="dropoff" 
                          placeholder="E.g. Central Station" 
                          required 
                          value={formData.dropoff}
                          onChange={handleChange}
                        />
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
                        <Input 
                          id="date" 
                          type="date" 
                          required 
                          value={formData.date}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Departure Time</Label>
                        <Input 
                          id="time" 
                          type="time" 
                          required 
                          value={formData.time}
                          onChange={handleChange}
                        />
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
                        <Input 
                          id="vehicle" 
                          placeholder="E.g. Toyota Corolla" 
                          required 
                          value={formData.vehicle}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="seats">Available seats</Label>
                        <select 
                          id="seats" 
                          required
                          className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={formData.seats}
                          onChange={handleChange}
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
                          <Input 
                            id="price" 
                            type="number" 
                            className="pl-7" 
                            placeholder="0.00" 
                            required 
                            min="1"
                            value={formData.price}
                            onChange={handleChange}
                          />
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

                  {/* Listing Visibility */}
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-medium text-lg flex items-center">
                      {isPublic ? 
                        <Globe className="h-5 w-5 mr-2 text-primary" /> : 
                        <Lock className="h-5 w-5 mr-2 text-primary" />
                      }
                      Listing Visibility
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Make this ride public</p>
                        <p className="text-sm text-gray-500">
                          {isPublic 
                            ? "Your ride will be visible to all users. They can request to join your trip." 
                            : "Your ride will be private. Only users you share the link with can see it."}
                        </p>
                      </div>
                      <Switch 
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                        aria-label="Toggle public listing"
                      />
                    </div>
                    {isPublic && (
                      <div className="bg-primary/5 p-4 rounded-md">
                        <h4 className="font-medium mb-2">Public Listing Benefits</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>More visibility - your ride appears in search results</li>
                          <li>Higher chances of finding passengers</li>
                          <li>Option to accept or decline ride requests</li>
                          <li>Flexibility to negotiate pickup times with riders</li>
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
                      placeholder="Share any additional details about your trip..."
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {/* Submit */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? "Processing..." 
                        : isPublic 
                          ? "Publish Ride" 
                          : "Save as Private"
                      }
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
