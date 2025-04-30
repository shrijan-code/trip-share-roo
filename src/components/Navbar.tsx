
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-primary">RideShareRoo</span>
        </Link>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/find-rides" className="text-gray-600 hover:text-primary">Find Rides</Link>
          <Link to="/offer-ride" className="text-gray-600 hover:text-primary">Offer a Ride</Link>
          <Link to="/how-it-works" className="text-gray-600 hover:text-primary">How It Works</Link>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/find-rides" className="text-gray-600 hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>
                Find Rides
              </Link>
              <Link to="/offer-ride" className="text-gray-600 hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>
                Offer a Ride
              </Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>
                How It Works
              </Link>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
