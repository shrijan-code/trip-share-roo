
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const jobListings = [
  {
    title: "Frontend Developer",
    location: "Sydney",
    type: "Full-time",
    description: "Join our engineering team to build amazing user experiences for our ridesharing platform."
  },
  {
    title: "Customer Support Specialist",
    location: "Melbourne",
    type: "Full-time",
    description: "Help our users have the best experience with our platform by providing excellent support."
  },
  {
    title: "Marketing Manager",
    location: "Brisbane",
    type: "Full-time",
    description: "Lead our marketing efforts to grow RideShareRoo across Australia."
  },
  {
    title: "Operations Intern",
    location: "Remote",
    type: "Part-time",
    description: "Support our operations team in ensuring smooth rides for all our users."
  }
];

const CareersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Careers at RideShareRoo</h1>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Join Our Team</h2>
          <p className="text-gray-600 mb-6">
            At RideShareRoo, we're on a mission to transform transportation in Australia. 
            We're looking for passionate individuals who share our vision of making travel 
            more accessible, sustainable, and community-focused.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-primary/5 rounded-lg">
              <h3 className="font-medium text-lg mb-3">Innovation</h3>
              <p className="text-gray-600">
                We encourage creative thinking and innovative solutions to complex problems.
              </p>
            </div>
            <div className="p-6 bg-primary/5 rounded-lg">
              <h3 className="font-medium text-lg mb-3">Growth</h3>
              <p className="text-gray-600">
                We invest in our employees' personal and professional development.
              </p>
            </div>
            <div className="p-6 bg-primary/5 rounded-lg">
              <h3 className="font-medium text-lg mb-3">Impact</h3>
              <p className="text-gray-600">
                Make a real difference in how Australians travel and connect.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-6">Open Positions</h2>
          
          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <div className="flex items-center text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                          <span className="mx-2">•</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <Button variant="outline">Apply Now</Button>
                    </div>
                    <p className="text-gray-600 mt-4">{job.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
