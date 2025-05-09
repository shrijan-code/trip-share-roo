
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Bell, MessageCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UnreadMessagesIndicator from './messaging/UnreadMessagesIndicator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Profile {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchNotifications = async () => {
      if (!user) return;
      
      try {
        const { count, error } = await supabase
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('read', false);
        
        if (error) throw error;
        setUnreadNotifications(count || 0);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchProfile();
    fetchNotifications();

    // Set up notification subscription
    if (user) {
      const channel = supabase
        .channel('notifications_count')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchNotifications();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getUserName = () => {
    if (userProfile?.first_name || userProfile?.last_name) {
      return `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim();
    }
    return user?.email?.split('@')[0] || 'User';
  };

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
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/notifications" className="relative">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/messages" className="relative">
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                  <UnreadMessagesIndicator />
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={userProfile?.avatar_url || undefined} />
                      <AvatarFallback>
                        <User size={16} />
                      </AvatarFallback>
                    </Avatar>
                    <span className="max-w-[100px] truncate">{getUserName()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${user.id}`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-trips">My Trips</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer">
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
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

              {user ? (
                <>
                  <div className="border-t pt-2">
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile?.avatar_url || undefined} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{getUserName()}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-4">
                      <Link to="/notifications" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <Bell className="h-4 w-4 mr-2" />
                          Notifications
                          {unreadNotifications > 0 && (
                            <span className="ml-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                              {unreadNotifications > 9 ? '9+' : unreadNotifications}
                            </span>
                          )}
                        </Button>
                      </Link>
                      <Link to="/messages" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Messages
                          <UnreadMessagesIndicator />
                        </Button>
                      </Link>
                    </div>
                    <Link to={`/profile/${user.id}`} className="block py-2" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                    <Link to="/my-trips" className="block py-2" onClick={() => setIsMenuOpen(false)}>My Trips</Link>
                    <Link to="/my-bookings" className="block py-2" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
                    <Button variant="outline" className="w-full mt-2 text-red-500" onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}>
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
