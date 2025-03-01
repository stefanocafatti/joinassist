
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-assist-blue flex items-center gap-2"
            >
              <span className="font-display">Assist</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#how-it-works" className="text-gray-700 hover:text-assist-blue transition-colors">
              How It Works
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-assist-blue transition-colors flex items-center gap-1">
                For Students <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
                <div className="glassmorphism p-4 rounded-xl shadow-elevation">
                  <div className="space-y-2">
                    <Link to="#earn" className="block p-2 hover:bg-assist-blue/5 rounded-md transition-colors">
                      Earn Money
                    </Link>
                    <Link to="#skills" className="block p-2 hover:bg-assist-blue/5 rounded-md transition-colors">
                      Build Skills
                    </Link>
                    <Link to="#flexibility" className="block p-2 hover:bg-assist-blue/5 rounded-md transition-colors">
                      Flexible Work
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-700 hover:text-assist-blue transition-colors flex items-center gap-1">
                Tasks <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
                <div className="glassmorphism p-4 rounded-xl shadow-elevation">
                  <div className="space-y-2">
                    <Link to="#cleaning" className="block p-2 hover:bg-assist-blue/5 rounded-md transition-colors">
                      Cleaning
                    </Link>
                    <Link to="#transportation" className="block p-2 hover:bg-assist-blue/5 rounded-md transition-colors">
                      Transportation
                    </Link>
                    <Link to="#academic" className="block p-2 hover:bg-assist-blue/5 rounded-md transition-colors">
                      Academic Help
                    </Link>
                    <Link to="#all-tasks" className="block p-2 hover:bg-assist-blue/5 rounded-md transition-colors">
                      View All Tasks
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link to="#testimonials" className="text-gray-700 hover:text-assist-blue transition-colors">
              Testimonials
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="rounded-full border-assist-blue text-assist-blue hover:bg-assist-blue/10 hover:text-assist-blue"
            >
              Login
            </Button>
            <Button className="rounded-full bg-assist-blue hover:bg-assist-blue/90">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-8 space-y-4">
            <Link 
              to="#how-it-works" 
              className="block py-3 text-gray-700 hover:text-assist-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="#for-students" 
              className="block py-3 text-gray-700 hover:text-assist-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              For Students
            </Link>
            <Link 
              to="#all-tasks" 
              className="block py-3 text-gray-700 hover:text-assist-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Tasks
            </Link>
            <Link 
              to="#testimonials" 
              className="block py-3 text-gray-700 hover:text-assist-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="w-full rounded-full border-assist-blue text-assist-blue hover:bg-assist-blue/10 hover:text-assist-blue"
              >
                Login
              </Button>
              <Button 
                className="w-full rounded-full bg-assist-blue hover:bg-assist-blue/90"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
