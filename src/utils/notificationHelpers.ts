
import { supabase } from '@/integrations/supabase/client';

interface NotificationParams {
  userId: string;
  message: string;
  relatedTripId?: string;
  relatedBookingId?: string;
}

export const createNotification = async (params: NotificationParams): Promise<boolean> => {
  try {
    const { userId, message, relatedTripId, relatedBookingId } = params;
    
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        message: message,
        related_trip_id: relatedTripId || null,
        related_booking_id: relatedBookingId || null,
        read: false,
      });
    
    if (error) {
      console.error('Error creating notification:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception creating notification:', err);
    return false;
  }
};

export const markNotificationsAsRead = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);
    
    if (error) {
      console.error('Error marking notifications as read:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception marking notifications as read:', err);
    return false;
  }
};
