import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapView from "./pages/MapView";
import RoutingInsights from "./pages/RoutingInsights";
import AccessibilityHub from "./pages/AccessibilityHub";
import EmergencyResponse from "./pages/EmergencyResponse";
import VolunteerPortal from "./pages/VolunteerPortal";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/routing" element={<RoutingInsights />} />
          <Route path="/accessibility" element={<AccessibilityHub />} />
          <Route path="/emergency" element={<EmergencyResponse />} />
          <Route path="/volunteers" element={<VolunteerPortal />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
