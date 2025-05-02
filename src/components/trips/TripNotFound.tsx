
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const TripNotFound: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 flex justify-center items-center" style={{ height: 'calc(100vh - 300px)' }}>
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold mt-4">Trip Not Found</h2>
          <p className="mt-2 text-gray-600">Sorry, we couldn't find the trip you're looking for.</p>
          <Button asChild className="mt-6">
            <Link to="/find-rides">Browse Available Trips</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripNotFound;
