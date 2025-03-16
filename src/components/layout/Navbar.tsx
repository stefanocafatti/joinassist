
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="flex-grow"></div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/customer-app">
              <Button 
                className="rounded-xl bg-gradient-to-r from-assist-blue to-indigo-600 hover:from-assist-blue/90 hover:to-indigo-600/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Download App
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
        <div className="md:hidden bg-white shadow-lg animate-slide-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <div className="pt-3 flex flex-col space-y-2">
              <Link to="/customer-app">
                <Button 
                  className="w-full rounded-xl bg-gradient-to-r from-assist-blue to-indigo-600 hover:from-assist-blue/90 hover:to-indigo-600/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Download App
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
