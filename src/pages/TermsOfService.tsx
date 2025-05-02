
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            These Terms of Service ("Terms") govern your use of the RideShareRoo website and services. By using RideShareRoo, you agree to these Terms.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By creating an account or using any part of our services, you agree to be bound by these Terms. If you do not agree to all the Terms, you must not use our services.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">2. User Accounts</h2>
          <p className="mb-4">
            To use certain features of our services, you must register for an account. You must provide accurate and complete information when creating your account. You are responsible for maintaining the confidentiality of your account credentials.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">3. User Conduct</h2>
          <p className="mb-4">
            You agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Use our services for any illegal purpose</li>
            <li className="mb-2">Harass, abuse, or harm other users</li>
            <li className="mb-2">Post false or misleading information</li>
            <li className="mb-2">Attempt to gain unauthorized access to our systems</li>
            <li className="mb-2">Use our services to transmit viruses or malicious code</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">4. Rides and Bookings</h2>
          <p className="mb-4">
            RideShareRoo is a platform that connects drivers and passengers. We do not provide transportation services directly. Users are responsible for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Ensuring they have appropriate licenses and insurance</li>
            <li className="mb-2">Complying with all applicable laws and regulations</li>
            <li className="mb-2">Honoring their commitments to other users</li>
            <li className="mb-2">Accurately representing their offerings and needs</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">5. Payments</h2>
          <p className="mb-4">
            Payments for rides are processed through our platform. We may charge service fees for using our payment services. All fees and charges are non-refundable unless otherwise specified.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, RideShareRoo shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">7. Dispute Resolution</h2>
          <p className="mb-4">
            Any disputes arising from these Terms or the use of our services shall be resolved through arbitration in accordance with the laws of Australia.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
          <p className="mb-4">
            We may modify these Terms at any time. We will notify users of material changes by posting an update on our website. Your continued use of our services after changes to these Terms constitutes your acceptance of the revised Terms.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">9. Termination</h2>
          <p className="mb-4">
            We reserve the right to terminate or suspend your account and access to our services at any time for violations of these Terms or for any other reason at our discretion.
          </p>
          
          <p className="mt-8">
            Last Updated: May 2, 2025
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
