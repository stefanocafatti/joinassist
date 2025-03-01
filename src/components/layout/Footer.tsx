
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Linkedin, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-assist-gray py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-assist-blue flex items-center gap-2">
              <span className="font-display">Assist</span>
            </Link>
            <p className="text-gray-600 mt-4 max-w-xs">
              The next-generation platform redefining how people connect with vetted college students for a wide range of tasks.
            </p>
            <div className="flex space-x-5 pt-4">
              <a href="#" className="text-gray-500 hover:text-assist-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-assist-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-assist-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-assist-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-assist-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#how-it-works" className="text-gray-600 hover:text-assist-blue transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="#for-students" className="text-gray-600 hover:text-assist-blue transition-colors">
                  For Students
                </Link>
              </li>
              <li>
                <Link to="#all-tasks" className="text-gray-600 hover:text-assist-blue transition-colors">
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link to="#testimonials" className="text-gray-600 hover:text-assist-blue transition-colors">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Task Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Task Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link to="#cleaning" className="text-gray-600 hover:text-assist-blue transition-colors">
                  Cleaning
                </Link>
              </li>
              <li>
                <Link to="#transportation" className="text-gray-600 hover:text-assist-blue transition-colors">
                  Transportation & Moving
                </Link>
              </li>
              <li>
                <Link to="#assembly" className="text-gray-600 hover:text-assist-blue transition-colors">
                  Assembly
                </Link>
              </li>
              <li>
                <Link to="#academic" className="text-gray-600 hover:text-assist-blue transition-colors">
                  Academic & Professional Help
                </Link>
              </li>
              <li>
                <Link to="#digital" className="text-gray-600 hover:text-assist-blue transition-colors">
                  Digital Services
                </Link>
              </li>
              <li>
                <Link to="#more-tasks" className="text-gray-600 hover:text-assist-blue flex items-center gap-1">
                  More Categories <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-600 mb-4">
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
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Assist. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-assist-blue text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-assist-blue text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-assist-blue text-sm transition-colors">
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
