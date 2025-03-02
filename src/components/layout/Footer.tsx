import { Link } from "react-router-dom";
import { Instagram, Linkedin, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-assist-gray py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-assist-blue flex items-center gap-2">
              <span className="font-display">Assist</span>
            </Link>
            <p className="text-gray-800 mt-4 max-w-xs font-medium">
              The next-generation platform redefining how people connect with vetted college students for a wide range of tasks.
            </p>
            <div className="flex space-x-5 pt-4">
              <a href="https://www.instagram.com/joinassist/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-assist-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/joinassist" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-assist-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#how-it-works" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="#for-students" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  For Students
                </Link>
              </li>
              <li>
                <Link to="#all-tasks" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link to="#testimonials" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="#faq" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Task Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Task Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link to="#cleaning" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  Cleaning
                </Link>
              </li>
              <li>
                <Link to="#transportation" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  Transportation & Moving
                </Link>
              </li>
              <li>
                <Link to="#assembly" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  Assembly
                </Link>
              </li>
              <li>
                <Link to="#academic" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  Academic & Professional Help
                </Link>
              </li>
              <li>
                <Link to="#digital" className="text-gray-800 hover:text-assist-blue transition-colors font-medium">
                  Digital Services
                </Link>
              </li>
              <li>
                <Link to="#more-tasks" className="text-gray-800 hover:text-assist-blue flex items-center gap-1 font-medium">
                  More Categories <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900">Stay Updated</h4>
            <p className="text-gray-800 mb-4 font-medium">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="rounded-l-full rounded-r-none focus-visible:ring-assist-blue" 
                />
                <Button 
                  className="rounded-r-full rounded-l-none bg-assist-blue hover:bg-assist-blue/90"
                >
                  <Mail size={18} />
                </Button>
              </div>
              <p className="text-xs text-gray-700 font-medium">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-800 text-sm font-medium">
              © {new Date().getFullYear()} Assist. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-800 hover:text-assist-blue text-sm transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-800 hover:text-assist-blue text-sm transition-colors font-medium">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-800 hover:text-assist-blue text-sm transition-colors font-medium">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
