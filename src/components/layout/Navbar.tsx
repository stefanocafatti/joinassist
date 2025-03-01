
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp, Briefcase, GraduationCap, Target, Search, CheckCircle, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const browseTasksMenu = [
    { 
      title: "All Tasks", 
      subtitle: "BROWSE AVAILABLE TASKS", 
      icon: <ListChecks className="w-8 h-8 text-assist-blue" />,
      link: "/tasks"
    },
    { 
      title: "Search Tasks", 
      subtitle: "FIND SPECIFIC TASKS", 
      icon: <Search className="w-8 h-8 text-assist-blue" />,
      link: "/tasks/search"
    },
  ];

  const forStudentsMenu = [
    { 
      title: "Apply for Tasks", 
      subtitle: "GET STARTED EARNING", 
      icon: <Briefcase className="w-8 h-8 text-assist-blue" />,
      link: "/students/apply"
    },
    { 
      title: "Get Verified", 
      subtitle: "BECOME A VETTED STUDENT", 
      icon: <CheckCircle className="w-8 h-8 text-assist-blue" />,
      link: "/students/verify"
    },
  ];

  const resourcesMenu = [
    { 
      title: "How It Works", 
      subtitle: "LEARN ABOUT ASSIST", 
      icon: <Target className="w-8 h-8 text-assist-blue" />,
      link: "/how-it-works"
    },
    { 
      title: "Student Success", 
      subtitle: "CASE STUDIES", 
      icon: <GraduationCap className="w-8 h-8 text-assist-blue" />,
      link: "/success-stories"
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2" ref={dropdownRef}>
            {/* Browse Tasks Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('browse')}
                className={`flex items-center px-4 py-2 rounded-xl text-gray-800 hover:bg-soft-purple/70 font-semibold transition-colors ${
                  activeDropdown === 'browse' ? 'bg-soft-purple text-gray-900' : ''
                }`}
              >
                EXPLORE TASKS
                {activeDropdown === 'browse' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </button>
              
              {activeDropdown === 'browse' && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-elevation overflow-hidden z-50 animate-scale-in">
                  <div className="bg-gradient-to-r from-soft-purple to-soft-blue p-4 text-gray-900 font-bold text-xl">
                    Browse Tasks
                  </div>
                  
                  <div className="py-2">
                    {browseTasksMenu.map((item, index) => (
                      <Link 
                        key={index} 
                        to={item.link}
                        className="block px-4 py-3 hover:bg-soft-gray transition-colors"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-soft-purple/20 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.subtitle}</p>
                          </div>
                        </div>
                        {index < browseTasksMenu.length - 1 && (
                          <div className="border-b border-gray-100 mt-3 mx-auto"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Request Task Button - Direct link, no dropdown */}
            <Link 
              to="/request-task" 
              className={`px-4 py-2 rounded-xl ${
                isActive('/request-task') 
                  ? 'bg-assist-blue text-white' 
                  : 'text-gray-800 hover:bg-soft-yellow/70'
              } font-semibold transition-colors`}
            >
              REQUEST A TASK
            </Link>

            {/* For Students Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('students')}
                className={`flex items-center px-4 py-2 rounded-xl text-gray-800 hover:bg-soft-green/70 font-semibold transition-colors ${
                  activeDropdown === 'students' ? 'bg-soft-green text-gray-900' : ''
                }`}
              >
                FOR STUDENTS
                {activeDropdown === 'students' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </button>
              
              {activeDropdown === 'students' && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-elevation overflow-hidden z-50 animate-scale-in">
                  <div className="bg-gradient-to-r from-soft-green to-soft-blue p-4 text-gray-900 font-bold text-xl">
                    Student Portal
                  </div>
                  
                  <div className="py-2">
                    {forStudentsMenu.map((item, index) => (
                      <Link 
                        key={index} 
                        to={item.link}
                        className="block px-4 py-3 hover:bg-soft-gray transition-colors"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-soft-green/20 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.subtitle}</p>
                          </div>
                        </div>
                        {index < forStudentsMenu.length - 1 && (
                          <div className="border-b border-gray-100 mt-3 mx-auto"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('resources')}
                className={`flex items-center px-4 py-2 rounded-xl text-gray-800 hover:bg-soft-orange/70 font-semibold transition-colors ${
                  activeDropdown === 'resources' ? 'bg-soft-orange text-gray-900' : ''
                }`}
              >
                RESOURCES
                {activeDropdown === 'resources' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </button>
              
              {activeDropdown === 'resources' && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-elevation overflow-hidden z-50 animate-scale-in">
                  <div className="bg-gradient-to-r from-soft-orange to-soft-peach p-4 text-gray-900 font-bold text-xl">
                    Resources
                  </div>
                  
                  <div className="py-2">
                    {resourcesMenu.map((item, index) => (
                      <Link 
                        key={index} 
                        to={item.link}
                        className="block px-4 py-3 hover:bg-soft-gray transition-colors"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-soft-orange/20 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.subtitle}</p>
                          </div>
                        </div>
                        {index < resourcesMenu.length - 1 && (
                          <div className="border-b border-gray-100 mt-3 mx-auto"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="rounded-xl border-assist-blue text-assist-blue hover:bg-assist-blue/10 hover:text-assist-blue"
            >
              Login
            </Button>
            <Button className="rounded-xl bg-assist-blue hover:bg-assist-blue/90 shadow-soft hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
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
        <div className="md:hidden bg-white shadow-lg animate-slide-in">
          <div className="px-4 pt-2 pb-8 space-y-2">
            <div className="border-b border-gray-200 py-3">
              <button 
                className="flex items-center justify-between w-full text-left font-semibold"
                onClick={() => toggleDropdown('browse-mobile')}
              >
                <span>EXPLORE TASKS</span>
                {activeDropdown === 'browse-mobile' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {activeDropdown === 'browse-mobile' && (
                <div className="mt-2 space-y-2 pl-4 animate-fade-in">
                  {browseTasksMenu.map((item, index) => (
                    <Link key={index} to={item.link} className="block py-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-soft-purple/20 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-gray-500 text-xs">{item.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-b border-gray-200 py-3">
              <Link 
                to="/request-task" 
                className={`flex items-center justify-between w-full text-left font-semibold ${
                  isActive('/request-task') ? 'text-assist-blue' : ''
                }`}
              >
                <span>REQUEST A TASK</span>
              </Link>
            </div>
            
            <div className="border-b border-gray-200 py-3">
              <button 
                className="flex items-center justify-between w-full text-left font-semibold"
                onClick={() => toggleDropdown('students-mobile')}
              >
                <span>FOR STUDENTS</span>
                {activeDropdown === 'students-mobile' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {activeDropdown === 'students-mobile' && (
                <div className="mt-2 space-y-2 pl-4 animate-fade-in">
                  {forStudentsMenu.map((item, index) => (
                    <Link key={index} to={item.link} className="block py-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-soft-green/20 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-gray-500 text-xs">{item.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-b border-gray-200 py-3">
              <button 
                className="flex items-center justify-between w-full text-left font-semibold"
                onClick={() => toggleDropdown('resources-mobile')}
              >
                <span>RESOURCES</span>
                {activeDropdown === 'resources-mobile' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {activeDropdown === 'resources-mobile' && (
                <div className="mt-2 space-y-2 pl-4 animate-fade-in">
                  {resourcesMenu.map((item, index) => (
                    <Link key={index} to={item.link} className="block py-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-soft-orange/20 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-gray-500 text-xs">{item.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="w-full rounded-xl border-assist-blue text-assist-blue hover:bg-assist-blue/5 hover:text-assist-blue"
              >
                Login
              </Button>
              <Button 
                className="w-full rounded-xl bg-assist-blue hover:bg-assist-blue/90 shadow-soft transition-all duration-300"
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
