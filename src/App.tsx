
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
import StudentDashboard from "./pages/StudentDashboard";

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

// Student route component
const StudentRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const userSession = localStorage.getItem("userSession");
  const isAuthenticated = userSession !== null;
  let isStudent = false;
  
  if (userSession) {
    try {
      const sessionData = JSON.parse(userSession);
      isStudent = sessionData.isStudent === true;
    } catch (error) {
      console.error("Error parsing user session:", error);
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }
  
  if (!isStudent) {
    return <Navigate to="/main-menu" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  // Check if user is authenticated and if they are a student
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isStudent, setIsStudent] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        setIsAuthenticated(true);
        try {
          const sessionData = JSON.parse(userSession);
          setIsStudent(sessionData.isStudent === true);
        } catch (error) {
          console.error("Error parsing user session:", error);
          setIsStudent(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsStudent(false);
      }
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
            <Route path="/student-dashboard" element={
              <StudentRoute>
                <StudentDashboard />
              </StudentRoute>
            } />
            
            {/* Home route redirection based on auth state */}
            <Route path="/" element={
              isAuthenticated 
                ? isStudent 
                  ? <Navigate to="/student-dashboard" replace /> 
                  : <Navigate to="/main-menu" replace />
                : <Navigate to="/welcome" replace />
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
