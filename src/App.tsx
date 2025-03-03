
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainMenu from "./pages/MainMenu";
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("userSession") !== null;
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to welcome page if not authenticated
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App = () => {
  // Check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const hasSession = localStorage.getItem("userSession") !== null;
      setIsAuthenticated(hasSession);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/welcome" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/main-menu" element={
              <ProtectedRoute>
                <MainMenu />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            
            {/* Home route redirection based on auth state */}
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/main-menu" replace /> : <Navigate to="/welcome" replace />
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
