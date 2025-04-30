
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary/10 py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How RideShareRoo Works</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to share rides across Australia, whether you're a driver with empty seats or a passenger looking for an affordable ride.
            </p>
          </div>
        </div>
        
        {/* For Passengers */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">For Passengers</h2>
            <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
              Finding and booking a ride is simple and straightforward.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Search for a Ride</h3>
              <p className="text-gray-600">
                Enter your departure and destination cities, date, and number of passengers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Book Your Seat</h3>
              <p className="text-gray-600">
                Choose a ride that fits your schedule and budget. Pay securely through our platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Travel Together</h3>
              <p className="text-gray-600">
                Meet at the arranged pickup point and enjoy your journey. Leave a review after your trip.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/find-rides">Find a Ride</Link>
            </Button>
          </div>
        </div>
        
        {/* For Drivers */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">For Drivers</h2>
              <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
                Share your journey and offset your travel costs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">List Your Trip</h3>
                <p className="text-gray-600">
                  Share your route, date, time, and how many seats you're offering. Set your price per seat.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Accept Bookings</h3>
                <p className="text-gray-600">
                  Review passenger requests and communicate through our platform. Confirm pickup details.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Get Paid</h3>
                <p className="text-gray-600">
                  Complete the journey and get paid automatically. Your earnings are transferred directly to your account.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/offer-ride">Offer a Ride</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Safety & Trust */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Safety & Trust</h2>
            <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
              Your safety is our top priority. Here's how we maintain a trusted community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border rounded-lg p-6">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Verified Profiles</h3>
              <p className="text-gray-600">
                All users verify their identity and contact information before using our platform.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Insurance Coverage</h3>
              <p className="text-gray-600">
                All trips include basic insurance coverage for added peace of mind.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Reviews & Ratings</h3>
              <p className="text-gray-600">
                Community feedback helps maintain quality and builds trust between users.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                All payments are processed securely through our platform with no cash changing hands.
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">How much does it cost to use RideShareRoo?</h3>
                <p className="text-gray-600">
                  RideShareRoo is free to join. Passengers pay only for their booked rides, plus a small service fee. Drivers receive 90% of the fare, with 10% going to platform maintenance and insurance.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">What if I need to cancel my trip?</h3>
                <p className="text-gray-600">
                  Cancellations made more than 24 hours before departure are fully refundable. Later cancellations may incur a fee depending on the circumstances. See our cancellation policy for details.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">How does the payment process work?</h3>
                <p className="text-gray-600">
                  When you book a ride, payment is temporarily held by RideShareRoo. Once the trip is completed, the payment is released to the driver, ensuring a secure transaction for both parties.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">What happens if my ride doesn't show up?</h3>
                <p className="text-gray-600">
                  In the rare event that a confirmed ride doesn't show up, passengers receive a full refund and our customer support team will assist with finding alternative transportation options.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/faq" className="text-primary font-medium hover:underline">
                See all FAQs →
              </Link>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of Australians already sharing rides, saving money, and making new connections.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/find-rides">Browse Available Rides</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
