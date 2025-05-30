
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

const UnreadMessagesIndicator: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    const fetchUnreadCount = async () => {
      // Get all unread messages where user is the receiver and message is not deleted by receiver
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', user.id)
        .eq('read', false)
        .eq('deleted_by_receiver', false);

      if (error) {
        console.error('Error fetching unread messages:', error);
      } else {
        setUnreadCount(count || 0);
      }
    };

    fetchUnreadCount();

    // Set up real-time subscription for message changes
    const channel = supabase
      .channel('unread_messages_counter')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`
        },
        () => {
          fetchUnreadCount();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`
        },
        () => {
          fetchUnreadCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (unreadCount === 0) return null;

  return (
    <Badge variant="destructive" className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center text-xs">
      {unreadCount > 9 ? '9+' : unreadCount}
    </Badge>
  );
};

export default UnreadMessagesIndicator;
