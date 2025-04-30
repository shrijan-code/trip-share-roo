
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const popularRoutes = [
  {
    from: "Sydney",
    to: "Melbourne",
    distance: "878 km",
    price: "45",
    trips: "124",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop"
  },
  {
    from: "Melbourne",
    to: "Adelaide",
    distance: "725 km",
    price: "38",
    trips: "97",
    image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&auto=format&fit=crop"
  },
  {
    from: "Brisbane",
    to: "Sydney",
    distance: "915 km",
    price: "48",
    trips: "108",
    image: "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=800&auto=format&fit=crop"
  },
  {
    from: "Perth", 
    to: "Margaret River",
    distance: "277 km",
    price: "25",
    trips: "76",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&auto=format&fit=crop"
  }
];

const PopularRoutes: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Popular Routes</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the most traveled routes across Australia with frequent rides and great prices.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularRoutes.map((route, index) => (
          <Link key={index} to="/find-rides" className="group">
            <Card className="overflow-hidden border-none shadow-md h-full transition-all group-hover:shadow-lg">
              <div className="relative h-40">
                <img 
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-lg">{route.from} → {route.to}</h3>
                    <p className="text-sm text-gray-200">{route.distance}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-bold text-primary">${route.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Available</p>
                    <p className="font-medium">{route.trips} trips</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
