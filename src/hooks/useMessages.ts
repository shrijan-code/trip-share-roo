
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  trip_id: string | null;
}

export const useMessages = (recipientId: string, tripId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  useEffect(() => {
    if (!user || !recipientId) return;
    
    const fetchMessages = async () => {
      setLoading(true);
      
      try {
        let query = supabase
          .from('messages')
          .select('*')
          .or(`and(sender_id.eq.${user.id},receiver_id.eq.${recipientId}),and(sender_id.eq.${recipientId},receiver_id.eq.${user.id})`)
          .order('created_at', { ascending: true });
        
        // Filter by trip_id if provided
        if (tripId) {
          query = query.eq('trip_id', tripId);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching messages:', error);
          toast({
            title: 'Error',
            description: 'Failed to load messages. Please try again.',
            variant: 'destructive',
          });
        } else {
          setMessages(data || []);
          
          // Mark unread received messages as read
          const unreadMessageIds = data
            ?.filter(msg => msg.receiver_id === user.id && !msg.read)
            .map(msg => msg.id) || [];
          
          if (unreadMessageIds.length > 0) {
            await supabase
              .from('messages')
              .update({ read: true })
              .in('id', unreadMessageIds);
          }
        }
      } catch (err) {
        console.error('Error in fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up real-time subscription for new messages
    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`
        },
        async (payload) => {
          console.log('Received new message:', payload);
          const newMsg = payload.new as Message;
          
          // Only add if it's from the current recipient and matches trip_id filter (if any)
          if (newMsg.sender_id === recipientId && (!tripId || newMsg.trip_id === tripId)) {
            setMessages(current => [...current, newMsg]);
            
            // Mark as read immediately
            await supabase
              .from('messages')
              .update({ read: true })
              .eq('id', newMsg.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, recipientId, tripId, toast]);

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim() || !user || !recipientId) {
      return;
    }
    
    const messageData = {
      sender_id: user.id,
      receiver_id: recipientId,
      content: content,
      trip_id: tripId || null,
    };
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // Add the new message to the UI immediately
        setMessages(prev => [...prev, data[0]]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      throw error; // Re-throw to allow component to handle it
    }
  };

  return { 
    messages, 
    loading, 
    sendMessage, 
    formatDate 
  };
};
