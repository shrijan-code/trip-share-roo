
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
const supabaseServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { notificationId } = await req.json();
    
    // Initialize Supabase client with service role to access user data
    const supabase = createClient(supabaseUrl, supabaseServiceRole);
    
    // Fetch notification details
    const { data: notification, error: notificationError } = await supabase
      .from('notifications')
      .select('*, profiles:user_id(*)')
      .eq('id', notificationId)
      .single();
    
    if (notificationError || !notification) {
      throw new Error(`Failed to fetch notification: ${notificationError?.message || 'Not found'}`);
    }

    // Get recipient email from profiles table
    const { data: recipient, error: recipientError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name')
      .eq('id', notification.user_id)
      .single();

    if (recipientError) {
      throw new Error(`Failed to fetch recipient profile: ${recipientError.message}`);
    }
    
    // Get recipient email from auth.users table using service role
    const { data: userData, error: userError } = await supabase
      .auth
      .admin
      .getUserById(notification.user_id);
    
    if (userError || !userData) {
      throw new Error(`Failed to fetch user data: ${userError?.message || 'Not found'}`);
    }

    const recipientEmail = userData.user.email;
    const recipientName = `${recipient.first_name || ''} ${recipient.last_name || ''}`.trim() || 'User';
    
    // Determine email subject and content based on notification type
    let subject = 'New Notification from RideShareRoo';
    let emailContent = `<p>${notification.message}</p>`;
    
    if (notification.related_trip_id) {
      // Fetch trip details for more context
      const { data: trip, error: tripError } = await supabase
        .from('trips')
        .select('*')
        .eq('id', notification.related_trip_id)
        .single();
      
      if (trip && !tripError) {
        subject = 'Trip Update from RideShareRoo';
        emailContent += `
          <p>Trip details:</p>
          <ul>
            <li>From: ${trip.origin}</li>
            <li>To: ${trip.destination}</li>
            <li>Date: ${new Date(trip.departure_date).toLocaleDateString()}</li>
          </ul>
          <p><a href="${supabaseUrl.replace('.supabase.co', '.lovable.app')}/trips/${trip.id}" style="color: #2563eb;">View Trip Details</a></p>
        `;
      }
    }
    
    if (notification.related_booking_id) {
      subject = 'Booking Update from RideShareRoo';
      emailContent += `<p><a href="${supabaseUrl.replace('.supabase.co', '.lovable.app')}/my-bookings" style="color: #2563eb;">View Your Bookings</a></p>`;
    }
    
    // Send the email
    const emailResult = await resend.emails.send({
      from: "RideShareRoo <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: subject,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 5px; padding: 20px;">
              <h2 style="color: #2563eb;">Hello ${recipientName},</h2>
              ${emailContent}
              <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                This is an automated message from RideShareRoo. Please do not reply to this email.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Email notification sent:', emailResult);
    
    return new Response(
      JSON.stringify({ success: true, emailResult }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
    
  } catch (error) {
    console.error('Error sending email notification:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});
