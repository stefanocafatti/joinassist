
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="flex-grow"></div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button 
                variant="outline" 
                className="rounded-xl border-assist-blue text-assist-blue hover:bg-assist-blue/10 hover:text-assist-blue"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                className="rounded-xl bg-gradient-to-r from-assist-blue to-indigo-600 hover:from-assist-blue/90 hover:to-indigo-600/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-assist-blue transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm shadow-lg animate-slide-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <div className="pt-3 flex flex-col space-y-2">
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl border-assist-blue text-assist-blue hover:bg-assist-blue/10 hover:text-assist-blue"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  className="w-full rounded-xl bg-gradient-to-r from-assist-blue to-indigo-600 hover:from-assist-blue/90 hover:to-indigo-600/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
