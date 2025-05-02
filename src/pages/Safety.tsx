
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, UserCheck, AlertTriangle, Clock, Phone } from "lucide-react";

const SafetyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Safety First</h1>
        
        <div className="mb-12">
          <p className="text-lg text-gray-600 mb-8">
            At RideShareRoo, we prioritize the safety and security of our community. 
            We've implemented multiple measures to ensure your peace of mind while using our platform.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-primary/5 p-6 rounded-lg">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Verified Profiles</h2>
              <p className="text-gray-600">
                All users undergo verification before joining our platform. 
                We check IDs and driving records for all drivers.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <UserCheck className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Community Reviews</h2>
              <p className="text-gray-600">
                Our rating system allows passengers and drivers to review each other, 
                creating a trusted network of users.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <AlertTriangle className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">24/7 Support</h2>
              <p className="text-gray-600">
                Our support team is available around the clock to assist with any 
                issues or concerns that may arise during your trip.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Safety Tips for Passengers</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Check profiles thoroughly</h3>
                <p className="text-gray-600">
                  Review driver ratings, reviews, and verification badges before booking.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Share your trip details</h3>
                <p className="text-gray-600">
                  Let a friend or family member know about your travel plans and expected arrival time.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Keep communication on-platform</h3>
                <p className="text-gray-600">
                  Use our messaging system for all communications to ensure everything is documented.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Safety Tips for Drivers</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Review passenger profiles</h3>
                <p className="text-gray-600">
                  Check ratings and reviews before accepting ride requests.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <AlertTriangle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Follow traffic rules</h3>
                <p className="text-gray-600">
                  Always adhere to speed limits and traffic regulations for everyone's safety.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Maintain your vehicle</h3>
                <p className="text-gray-600">
                  Regular maintenance ensures your car is safe for all passengers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SafetyPage;
