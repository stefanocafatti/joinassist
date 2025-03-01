
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 md:py-24">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-assist-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-assist-blue w-10 h-10" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! It seems the page you're looking for doesn't exist.
          </p>
          
          <Button
            size="lg"
            asChild
            className="rounded-full bg-assist-blue hover:bg-assist-blue/90 h-12 px-6"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home size={18} />
              Return to Home
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
