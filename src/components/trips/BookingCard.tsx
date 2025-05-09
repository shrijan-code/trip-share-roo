
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface BookingCardProps {
  id: string;
  price: number;
  seats: number;
  driverId: string;
}

const BookingCard: React.FC<BookingCardProps> = ({ id, price, seats, driverId }) => {
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if current user is the driver
  const isCurrentUserDriver = user && user.id === driverId;
  
  const handleBookTrip = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to book this trip",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (isCurrentUserDriver) {
      toast({
        title: "You cannot book your own trip",
        description: "Drivers cannot book trips they've listed.",
        variant: "destructive"
      });
      return;
    }

    if (!id) return;
    
    setIsBooking(true);

    try {
      // First check if there are enough seats available
      const { data: tripData, error: tripError } = await supabase
        .from('trips')
        .select('seats_available')
        .eq('id', id)
        .single();

      if (tripError) throw tripError;
      
      if (!tripData || tripData.seats_available < 1) {
        toast({
          title: "No seats available",
          description: "Sorry, all seats for this trip have been booked.",
          variant: "destructive"
        });
        setIsBooking(false);
        return;
      }

      // Insert the booking
      const { data: bookingData, error } = await supabase
        .from('bookings')
        .insert({
          trip_id: id,
          passenger_id: user.id,
          seats: 1, // Default to 1 seat, could be made variable
          status: 'pending'
        })
        .select();

      if (error) throw error;

      // Update available seats in the trip
      const { error: updateError } = await supabase
        .from('trips')
        .update({ seats_available: tripData.seats_available - 1 })
        .eq('id', id);

      if (updateError) throw updateError;

      // Create notification for the driver
      if (bookingData && bookingData.length > 0) {
        await supabase
          .from('notifications')
          .insert({
            user_id: driverId,
            message: `New booking request for your trip from ${user.email}`,
            related_trip_id: id,
            related_booking_id: bookingData[0].id
          });
      }

      toast({
        title: "Booking successful!",
        description: "Your trip booking has been submitted.",
      });
      
      navigate('/my-bookings');
      
    } catch (error) {
      console.error('Error booking trip:', error);
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Card className="sticky top-20">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-primary">${price}</h3>
              <p className="text-gray-500">per person</p>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {seats} seats available
            </div>
          </div>
          
          <div className="border-t border-b py-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Seat price</span>
              <span>${price}.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Service fee</span>
              <span>$3.00</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${price + 3}.00</span>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleBookTrip}
            disabled={isBooking || seats <= 0 || isCurrentUserDriver}
          >
            {isBooking ? "Processing..." : 
             seats <= 0 ? "Sold Out" : 
             isCurrentUserDriver ? "Your Trip" : "Book This Trip"}
          </Button>
          
          {!isCurrentUserDriver && (
            <>
              <div className="text-sm text-gray-500 text-center">
                You won't be charged yet
              </div>
              
              <div className="flex items-center justify-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2 text-green-600" />
                Secure payment processing
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
