
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageCircle, Car, Calendar, Check } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  created_at: string;
  related_trip_id: string | null;
  related_booking_id: string | null;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setNotifications(data || []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        toast({
          title: 'Error',
          description: 'Failed to load notifications.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Set up real-time subscription for new notifications
    const channel = supabase
      .channel('notifications_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications(current => [newNotification, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  const markAsRead = async (id: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      setNotifications(current =>
        current.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      toast({
        title: 'Error',
        description: 'Failed to update notification.',
        variant: 'destructive',
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user?.id)
        .eq('read', false);

      setNotifications(current =>
        current.map(notification => ({ ...notification, read: true }))
      );

      toast({
        title: 'Success',
        description: 'All notifications marked as read.',
      });
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      toast({
        title: 'Error',
        description: 'Failed to update notifications.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>

          <Card>
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
                {notifications.some(n => !n.read) && (
                  <Badge variant="destructive" className="ml-2">
                    New
                  </Badge>
                )}
              </CardTitle>
              {notifications.some(n => !n.read) && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Bell className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-md border ${
                        notification.read ? 'bg-background' : 'bg-primary/5 border-primary/20'
                      }`}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start gap-2">
                          {notification.related_booking_id ? (
                            <Car className="h-5 w-5 text-primary mt-1" />
                          ) : notification.related_trip_id ? (
                            <Calendar className="h-5 w-5 text-primary mt-1" />
                          ) : (
                            <MessageCircle className="h-5 w-5 text-primary mt-1" />
                          )}
                          <div>
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(notification.created_at)}
                            </p>
                          </div>
                        </div>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 ml-2"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                      </div>
                      {(notification.related_trip_id || notification.related_booking_id) && (
                        <div className="mt-2 text-right">
                          {notification.related_trip_id && (
                            <Button asChild variant="link" size="sm" className="h-6 p-0">
                              <Link to={`/trips/${notification.related_trip_id}`}>
                                View Trip
                              </Link>
                            </Button>
                          )}
                          {notification.related_booking_id && (
                            <Button asChild variant="link" size="sm" className="h-6 p-0 ml-2">
                              <Link to={`/my-bookings`}>
                                View Booking
                              </Link>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;
