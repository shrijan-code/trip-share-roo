
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            This Privacy Policy describes how RideShareRoo ("we", "us", or "our") collects, uses, and discloses your personal information when you use our website and services.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us when you:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Create an account and profile</li>
            <li className="mb-2">Post trips or book rides</li>
            <li className="mb-2">Communicate with other users</li>
            <li className="mb-2">Contact our support team</li>
            <li className="mb-2">Subscribe to our newsletters</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Provide, maintain, and improve our services</li>
            <li className="mb-2">Process transactions and send related information</li>
            <li className="mb-2">Verify your identity and prevent fraud</li>
            <li className="mb-2">Communicate with you about products, services, and events</li>
            <li className="mb-2">Respond to your comments, questions, and requests</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">How We Share Your Information</h2>
          <p className="mb-4">
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Other users as necessary to facilitate your rides</li>
            <li className="mb-2">Service providers who perform services on our behalf</li>
            <li className="mb-2">Law enforcement or other parties when required by law</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p className="mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Access and update your personal information</li>
            <li className="mb-2">Delete your account and personal information</li>
            <li className="mb-2">Object to the processing of your information</li>
            <li className="mb-2">Opt-out of marketing communications</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Security</h2>
          <p className="mb-4">
            We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mb-4">
            Email: privacy@rideshare.example.com<br />
            Address: 123 George Street, Sydney, NSW 2000, Australia
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

export default PrivacyPolicyPage;
