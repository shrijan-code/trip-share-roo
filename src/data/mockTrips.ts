
import { TripProps } from '@/components/TripCard';

export const mockTrips: TripProps[] = [
  {
    id: '1',
    from: 'Sydney',
    to: 'Melbourne',
    date: 'May 10, 2025',
    time: '08:00 AM',
    price: 45,
    seats: 3,
    isPublic: true,
    driver: {
      id: '101',
      name: 'Michael',
      avatar: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=150&h=150&auto=format&fit=crop',
      rating: 4.9,
      trips: 56
    }
  },
  {
    id: '2',
    from: 'Melbourne',
    to: 'Adelaide',
    date: 'May 12, 2025',
    time: '07:30 AM',
    price: 38,
    seats: 2,
    isPublic: true,
    driver: {
      id: '102',
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop',
      rating: 4.8,
      trips: 34
    }
  },
  {
    id: '3',
    from: 'Brisbane',
    to: 'Sydney',
    date: 'May 11, 2025',
    time: '09:00 AM',
    price: 48,
    seats: 4,
    isPublic: true,
    driver: {
      id: '103',
      name: 'David',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop',
      rating: 4.7,
      trips: 28
    }
  },
  {
    id: '4',
    from: 'Perth',
    to: 'Margaret River',
    date: 'May 15, 2025',
    time: '10:30 AM',
    price: 25,
    seats: 2,
    isPublic: false,
    driver: {
      id: '104',
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop',
      rating: 4.9,
      trips: 42
    }
  },
  {
    id: '5',
    from: 'Melbourne',
    to: 'Sydney',
    date: 'May 18, 2025',
    time: '07:00 AM',
    price: 47,
    seats: 1,
    isPublic: true,
    driver: {
      id: '105',
      name: 'James',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&auto=format&fit=crop',
      rating: 4.6,
      trips: 19
    }
  },
  {
    id: '6',
    from: 'Adelaide',
    to: 'Melbourne',
    date: 'May 20, 2025',
    time: '06:30 AM',
    price: 39,
    seats: 3,
    isPublic: false,
    driver: {
      id: '106',
      name: 'Olivia',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&auto=format&fit=crop',
      rating: 4.8,
      trips: 31
    }
  }
];

export const getTripById = (id: string) => {
  return mockTrips.find(trip => trip.id === id);
};
