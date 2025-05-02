
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">About RideShareRoo</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-600">
              RideShareRoo is dedicated to connecting Australians through affordable, 
              social, and sustainable travel. We believe in reducing carbon footprints 
              while building a community of trusted travelers across the country.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Our Story</h2>
            <p className="text-gray-600">
              Founded in 2023, RideShareRoo was born from a simple idea: to make 
              travel in Australia more accessible and environmentally friendly. 
              What began as a small project has grown into a nationwide network 
              of drivers and passengers who share more than just rides - they 
              share experiences.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Community</h3>
                <p className="text-gray-600">
                  We foster connections between travelers and build trusted networks.
                </p>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  Every shared ride contributes to reducing carbon emissions.
                </p>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Accessibility</h3>
                <p className="text-gray-600">
                  Making travel affordable and available to everyone across Australia.
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

export default AboutUsPage;
