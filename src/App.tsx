
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import FindRides from "./pages/FindRides";
import TripDetails from "./pages/TripDetails";
import OfferRide from "./pages/OfferRide";
import RequestRide from "./pages/RequestRide";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBookings from "./pages/MyBookings";
import MyTrips from "./pages/MyTrips";
import FAQPage from "./pages/faq";
import AboutUsPage from "./pages/AboutUs";
import ContactPage from "./pages/Contact";
import CareersPage from "./pages/Careers";
import SafetyPage from "./pages/Safety";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import TermsOfServicePage from "./pages/TermsOfService";
import RouteDetailPage from "./pages/routes/RouteDetailPage";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/find-rides" element={<FindRides />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/offer-ride" element={
              <ProtectedRoute>
                <OfferRide />
              </ProtectedRoute>
            } />
            <Route path="/request-ride" element={
              <ProtectedRoute>
                <RequestRide />
              </ProtectedRoute>
            } />
            <Route path="/my-bookings" element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            } />
            <Route path="/my-trips" element={
              <ProtectedRoute>
                <MyTrips />
              </ProtectedRoute>
            } />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Footer pages */}
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            
            {/* Popular routes */}
            <Route path="/routes/:fromCity-to-:toCity" element={<RouteDetailPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
