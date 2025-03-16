
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomerApp from "./pages/CustomerApp";
import MobileHome from "./components/mobile/MobileHome";
import MobileSignIn from "./components/mobile/MobileSignIn";
import LoadingScreen from "./components/mobile/LoadingScreen";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Website Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/welcome" element={<Index />} />
            <Route path="/customer-app" element={<CustomerApp />} />
            
            {/* Mobile App Routes */}
            <Route path="/mobile" element={<LoadingScreen />} />
            <Route path="/mobile/home" element={<MobileHome />} />
            <Route path="/mobile/sign-in" element={<MobileSignIn />} />
            <Route path="/mobile/search" element={<MobileHome />} />
            <Route path="/mobile/new-task" element={<MobileHome />} />
            <Route path="/mobile/notifications" element={<MobileHome />} />
            <Route path="/mobile/profile" element={<MobileHome />} />
            
            {/* Redirect old auth routes to download page */}
            <Route path="/login" element={<Navigate to="/customer-app" replace />} />
            <Route path="/register" element={<Navigate to="/customer-app" replace />} />
            <Route path="/student-app" element={<Navigate to="/customer-app" replace />} />
            
            {/* Redirect old dashboard routes to download page */}
            <Route path="/main-menu" element={<Navigate to="/customer-app" replace />} />
            <Route path="/student-dashboard" element={<Navigate to="/customer-app" replace />} />
            <Route path="/messages" element={<Navigate to="/customer-app" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
