
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomerApp from "./pages/CustomerApp";
import StudentApp from "./pages/StudentApp";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/welcome" element={<Index />} />
            <Route path="/customer-app" element={<CustomerApp />} />
            <Route path="/student-app" element={<StudentApp />} />
            
            {/* Home route redirects to welcome */}
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            
            {/* Redirect old auth routes to download pages */}
            <Route path="/login" element={<Navigate to="/customer-app" replace />} />
            <Route path="/register" element={<Navigate to="/student-app" replace />} />
            
            {/* Redirect old dashboard routes to download pages */}
            <Route path="/main-menu" element={<Navigate to="/customer-app" replace />} />
            <Route path="/student-dashboard" element={<Navigate to="/student-app" replace />} />
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
