// src/pages/faq.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FAQPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-2">How do I book a ride?</h2>
            <p className="text-gray-600">
              Search for your route, select a trip, and click "Book Now" to reserve your seat.
            </p>
          </div>

          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-2">Is RideShareRoo safe?</h2>
            <p className="text-gray-600">
              All users are verified, and we offer driver/passenger reviews for added safety.
            </p>
          </div>

          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-2">How are payments handled?</h2>
            <p className="text-gray-600">
              Payments are processed securely through our platform. Drivers receive payment after the trip is completed.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
