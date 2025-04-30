
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import PopularRoutes from '@/components/PopularRoutes';
import TripCard from '@/components/TripCard';
import { mockTrips } from '@/data/mockTrips';

const Index = () => {
  // Show only first 3 trips for the homepage
  const featuredTrips = mockTrips.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <HowItWorks />
        
        <PopularRoutes />
        
        {/* Featured Trips Section */}
        <section className="container mx-auto py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Trips</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out these upcoming trips across Australia and book your seat today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTrips.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a href="/find-rides" className="text-primary font-medium hover:underline">
              View all available trips →
            </a>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of happy travelers sharing rides across Australia.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-xl">★★★★★</div>
                </div>
                <p className="mb-4 text-gray-600">
                  "I've saved over $500 on my trips between Sydney and Melbourne using RideShareRoo. Plus, I've made some great friends along the way!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-medium">Jessica T.</h4>
                    <p className="text-sm text-gray-500">Sydney</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-xl">★★★★★</div>
                </div>
                <p className="mb-4 text-gray-600">
                  "As a driver, I can offset my fuel costs and enjoy company on long drives. The platform is super easy to use and payments are always on time."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-medium">Mark L.</h4>
                    <p className="text-sm text-gray-500">Brisbane</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-xl">★★★★★</div>
                </div>
                <p className="mb-4 text-gray-600">
                  "I'm a student and the savings are incredible. The verified profiles and reviews make me feel safe when traveling with new people."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-medium">Alex W.</h4>
                    <p className="text-sm text-gray-500">Melbourne</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
