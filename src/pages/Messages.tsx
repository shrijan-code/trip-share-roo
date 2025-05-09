
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MessageCircle, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessageThread from '@/components/messaging/MessageThread';
import { useToast } from '@/components/ui/use-toast';

interface MessageContact {
  id: string;
  name: string;
  avatar_url: string | null;
  trip_id?: string;
  trip_origin?: string;
  trip_destination?: string;
  last_message_time?: string;
  unread_count?: number;
}

const Messages = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<MessageContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<MessageContact | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchMessageContacts = async () => {
      if (!user) return;

      try {
        // Get all unique contacts from messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select(`
            id,
            sender_id,
            receiver_id,
            created_at,
            read,
            trip_id,
            trips:trip_id (
              origin,
              destination
            )
          `)
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (messagesError) throw messagesError;

        if (!messagesData || messagesData.length === 0) {
          setLoading(false);
          return;
        }

        // Get unique contact IDs
        const contactIds = new Set<string>();
        const contactsMap = new Map<string, {
          tripId?: string;
          tripOrigin?: string;
          tripDestination?: string;
          lastMessageTime: string;
          unreadCount: number;
        }>();

        messagesData.forEach(message => {
          const contactId = message.sender_id === user.id ? message.receiver_id : message.sender_id;
          contactIds.add(contactId);

          // Group by trip_id if exists
          const key = message.trip_id ? `${contactId}-${message.trip_id}` : contactId;
          
          if (!contactsMap.has(key)) {
            contactsMap.set(key, {
              tripId: message.trip_id || undefined,
              tripOrigin: message.trips?.origin,
              tripDestination: message.trips?.destination,
              lastMessageTime: message.created_at,
              unreadCount: message.receiver_id === user.id && !message.read ? 1 : 0
            });
          } else if (message.receiver_id === user.id && !message.read) {
            const contact = contactsMap.get(key)!;
            contact.unreadCount++;
            contactsMap.set(key, contact);
          }
        });

        // Fetch profile data for all contacts
        if (contactIds.size > 0) {
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, avatar_url')
            .in('id', Array.from(contactIds));

          if (profilesError) throw profilesError;

          // Create final contacts array
          const contactsList: MessageContact[] = [];
          
          contactsMap.forEach((contact, key) => {
            const [contactId, tripId] = key.includes('-') ? key.split('-') : [key, undefined];
            const profile = profilesData?.find(p => p.id === contactId);
            
            if (profile) {
              contactsList.push({
                id: contactId,
                name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'User',
                avatar_url: profile.avatar_url,
                trip_id: contact.tripId,
                trip_origin: contact.tripOrigin,
                trip_destination: contact.tripDestination,
                last_message_time: contact.lastMessageTime,
                unread_count: contact.unreadCount
              });
            }
          });

          // Sort by last message time
          contactsList.sort((a, b) => {
            if (!a.last_message_time) return 1;
            if (!b.last_message_time) return -1;
            return new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime();
          });

          setContacts(contactsList);
        }
      } catch (error) {
        console.error('Error fetching message contacts:', error);
        toast({
          title: 'Error',
          description: 'Failed to load message contacts.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMessageContacts();

    // Set up real-time subscription for new messages
    if (user) {
      const channel = supabase
        .channel('messages_updates')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `receiver_id=eq.${user.id}`
          },
          () => {
            fetchMessageContacts();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, toast]);

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>
          
          <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row h-[700px]">
              <div className="w-full md:w-1/3 border-r">
                <CardHeader className="py-4">
                  <CardTitle className="text-lg flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Conversations
                  </CardTitle>
                </CardHeader>
                <div className="overflow-y-auto h-[calc(700px-64px)]">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p>No messages yet</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {contacts.map((contact) => (
                        <div
                          key={contact.trip_id ? `${contact.id}-${contact.trip_id}` : contact.id}
                          className={`p-4 cursor-pointer hover:bg-gray-100 ${
                            selectedContact?.id === contact.id && 
                            selectedContact?.trip_id === contact.trip_id ? 
                            'bg-gray-100' : ''
                          }`}
                          onClick={() => setSelectedContact(contact)}
                        >
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={contact.avatar_url || undefined} />
                              <AvatarFallback>
                                <User className="h-5 w-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-grow min-w-0">
                              <div className="flex justify-between items-center">
                                <p className="font-medium truncate">{contact.name}</p>
                                <span className="text-xs text-gray-500">
                                  {formatTime(contact.last_message_time)}
                                </span>
                              </div>
                              {contact.trip_origin && contact.trip_destination && (
                                <p className="text-xs text-gray-500 truncate">
                                  Trip: {contact.trip_origin} → {contact.trip_destination}
                                </p>
                              )}
                            </div>
                            {(contact.unread_count ?? 0) > 0 && (
                              <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                                {contact.unread_count}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full md:w-2/3 flex flex-col">
                {selectedContact ? (
                  <>
                    <CardHeader className="py-4 border-b">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={selectedContact.avatar_url || undefined} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{selectedContact.name}</CardTitle>
                          {selectedContact.trip_origin && selectedContact.trip_destination && (
                            <p className="text-xs text-gray-500">
                              Trip: {selectedContact.trip_origin} → {selectedContact.trip_destination}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4 flex-grow flex flex-col h-[calc(700px-140px)]">
                      <MessageThread 
                        recipientId={selectedContact.id} 
                        recipientName={selectedContact.name} 
                        tripId={selectedContact.trip_id} 
                      />
                    </CardContent>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                    <p className="text-gray-500 max-w-md">
                      Select a conversation from the list to view your messages.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
