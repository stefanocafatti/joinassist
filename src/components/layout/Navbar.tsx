
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp, Briefcase, GraduationCap, Target, Search, CheckCircle, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      icon: <ListChecks className="w-8 h-8 text-assist-blue" /> 
    },
    { 
      title: "Search Tasks", 
      subtitle: "FIND SPECIFIC TASKS", 
      icon: <Search className="w-8 h-8 text-assist-blue" /> 
    },
  ];

  const forStudentsMenu = [
    { 
      title: "Apply for Tasks", 
      subtitle: "GET STARTED EARNING", 
      icon: <Briefcase className="w-8 h-8 text-assist-blue" /> 
    },
    { 
      title: "Get Verified", 
      subtitle: "BECOME A VETTED STUDENT", 
      icon: <CheckCircle className="w-8 h-8 text-assist-blue" /> 
    },
  ];

  const resourcesMenu = [
    { 
      title: "How It Works", 
      subtitle: "LEARN ABOUT ASSIST", 
      icon: <Target className="w-8 h-8 text-assist-blue" /> 
    },
    { 
      title: "Student Success", 
      subtitle: "CASE STUDIES", 
      icon: <GraduationCap className="w-8 h-8 text-assist-blue" /> 
    },
  ];

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
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
            {/* Browse Tasks Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('browse')}
                className={`flex items-center px-5 py-3 rounded-lg text-gray-800 hover:bg-gray-100 font-semibold ${
                  activeDropdown === 'browse' ? 'bg-gray-100' : ''
                }`}
              >
                BROWSE TASKS
                {activeDropdown === 'browse' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </button>
              
              {activeDropdown === 'browse' && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-b-xl shadow-lg overflow-hidden z-50">
                  <div className="bg-assist-blue text-white font-bold py-4 px-6 text-2xl">
                    Tasks
                  </div>
                  
                  <div className="py-3">
                    {browseTasksMenu.map((item, index) => (
                      <div 
                        key={index} 
                        className="px-6 py-3 hover:bg-gray-50"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-gray-100 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.subtitle}</p>
                          </div>
                        </div>
                        {index < browseTasksMenu.length - 1 && (
                          <div className="border-b border-gray-200 mt-3 mx-auto"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Request Task Button - Direct link, no dropdown */}
            <Link 
              to="/request-task" 
              className="px-5 py-3 rounded-lg text-gray-800 hover:bg-gray-100 font-semibold transition-colors"
            >
              REQUEST A TASK
            </Link>

            {/* For Students Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('students')}
                className={`flex items-center px-5 py-3 rounded-lg text-gray-800 hover:bg-gray-100 font-semibold ${
                  activeDropdown === 'students' ? 'bg-gray-100' : ''
                }`}
              >
                FOR STUDENTS
                {activeDropdown === 'students' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </button>
              
              {activeDropdown === 'students' && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-b-xl shadow-lg overflow-hidden z-50">
                  <div className="bg-assist-blue text-white font-bold py-4 px-6 text-2xl">
                    Students
                  </div>
                  
                  <div className="py-3">
                    {forStudentsMenu.map((item, index) => (
                      <div 
                        key={index} 
                        className="px-6 py-3 hover:bg-gray-50"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-gray-100 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.subtitle}</p>
                          </div>
                        </div>
                        {index < forStudentsMenu.length - 1 && (
                          <div className="border-b border-gray-200 mt-3 mx-auto"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('resources')}
                className={`flex items-center px-5 py-3 rounded-lg text-gray-800 hover:bg-gray-100 font-semibold ${
                  activeDropdown === 'resources' ? 'bg-gray-100' : ''
                }`}
              >
                RESOURCES
                {activeDropdown === 'resources' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </button>
              
              {activeDropdown === 'resources' && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-b-xl shadow-lg overflow-hidden z-50">
                  <div className="bg-assist-blue text-white font-bold py-4 px-6 text-2xl">
                    Resources
                  </div>
                  
                  <div className="py-3">
                    {resourcesMenu.map((item, index) => (
                      <div 
                        key={index} 
                        className="px-6 py-3 hover:bg-gray-50"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-gray-100 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.subtitle}</p>
                          </div>
                        </div>
                        {index < resourcesMenu.length - 1 && (
                          <div className="border-b border-gray-200 mt-3 mx-auto"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="rounded-full border-assist-blue text-assist-blue hover:bg-assist-blue/10 hover:text-assist-blue"
            >
              Login
            </Button>
            <Button className="rounded-full bg-assist-blue hover:bg-assist-blue/90 shadow-soft hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
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
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg">
          <div className="px-4 pt-2 pb-8 space-y-2">
            <div className="border-b border-gray-200 py-3">
              <button 
                className="flex items-center justify-between w-full text-left font-semibold"
                onClick={() => toggleDropdown('browse-mobile')}
              >
                <span>BROWSE TASKS</span>
                {activeDropdown === 'browse-mobile' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {activeDropdown === 'browse-mobile' && (
                <div className="mt-2 space-y-2 pl-4">
                  {browseTasksMenu.map((item, index) => (
                    <div key={index} className="py-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-gray-500 text-xs">{item.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-b border-gray-200 py-3">
              <Link 
                to="/request-task" 
                className="flex items-center justify-between w-full text-left font-semibold"
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
                <div className="mt-2 space-y-2 pl-4">
                  {forStudentsMenu.map((item, index) => (
                    <div key={index} className="py-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-gray-500 text-xs">{item.subtitle}</p>
                        </div>
                      </div>
                    </div>
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
                <div className="mt-2 space-y-2 pl-4">
                  {resourcesMenu.map((item, index) => (
                    <div key={index} className="py-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-gray-500 text-xs">{item.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="w-full rounded-full border-assist-blue text-assist-blue hover:bg-assist-blue/5 hover:text-assist-blue"
              >
                Login
              </Button>
              <Button 
                className="w-full rounded-full bg-assist-blue hover:bg-assist-blue/90 shadow-soft transition-all duration-300"
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
