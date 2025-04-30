
import React from 'react';
import { Button } from "@/components/ui/button";
import SearchForm from './SearchForm';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative australia-map-bg">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Share rides across<br/>
                <span className="text-primary">Australia</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 md:pr-8 lg:pr-16">
                Connect with drivers and passengers going your way. Save money, meet new people, and reduce your carbon footprint.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/offer-ride">Offer a Ride</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/find-rides">Find a Ride</Link>
              </Button>
            </div>
            
            <div className="pt-4 flex flex-wrap gap-x-12 gap-y-4 text-sm">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Verified users</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Secure payments</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <SearchForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
