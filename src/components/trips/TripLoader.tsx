
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TripLoader: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 flex justify-center items-center" style={{ height: 'calc(100vh - 300px)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trip details...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripLoader;
