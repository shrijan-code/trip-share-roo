
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "Post a ride or find one",
    description: "Drivers list their trips with details like route, time, and price. Passengers search for matching rides.",
    icon: "🚘"
  },
  {
    title: "Book and pay securely",
    description: "Reserve your seat instantly and pay through our secure platform. No cash needed.",
    icon: "💳"
  },
  {
    title: "Travel together",
    description: "Meet at the agreed pickup point, enjoy the journey with your new travel companion, and arrive at your destination.",
    icon: "🤝"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How RideShareRoo Works</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Share rides across Australia in three simple steps - save money, make friends, and reduce your carbon footprint.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="border-none shadow-md">
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <span className="text-4xl">{step.icon}</span>
                <h3 className="text-xl font-bold mt-4">
                  <span className="bg-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-600 text-center">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
