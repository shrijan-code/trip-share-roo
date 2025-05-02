// src/pages/FAQ.js
import React from 'react';

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold">How do I reset my password?</h2>
          <p className="text-gray-600 mt-2">Go to the login page and click "Forgot Password."</p>
        </div>
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold">Where can I contact support?</h2>
          <p className="text-gray-600 mt-2">Email us at support@example.com.</p>
        </div>
        {/* Add more questions as needed */}
      </div>
    </div>
  );
};

export default FAQ;
