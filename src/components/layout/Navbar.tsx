import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp, Briefcase, GraduationCap, Search, CheckCircle, ListChecks, FileEdit } from "lucide-react";
import Logo from "../ui/Logo";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
      icon: <ListChecks className="w-6 h-6 text-assist-blue" />,
      link: "/tasks"
    },
    { 
      title: "Search Tasks", 
      subtitle: "FIND SPECIFIC TASKS", 
      icon: <Search className="w-6 h-6 text-assist-blue" />,
      link: "/tasks/search"
    },
    { 
      title: "Request a Task", 
      subtitle: "SUBMIT TASK REQUEST", 
      icon: <FileEdit className="w-6 h-6 text-assist-blue" />,
      link: "/request-task"
    },
  ];

  const forStudentsMenu = [
    { 
      title: "Apply for Tasks", 
      subtitle: "GET STARTED EARNING", 
      icon: <Briefcase className="w-6 h-6 text-assist-blue" />,
      link: "/students/apply"
    },
    { 
      title: "Get Verified", 
      subtitle: "BECOME A VETTED STUDENT", 
      icon: <CheckCircle className="w-6 h-6 text-assist-blue" />,
      link: "/students/verify"
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => toggleDropdown('browse')}
              className={`flex items-center px-4 py-2 rounded-xl text-gray-800 transition-colors ${
                activeDropdown === 'browse' 
                  ? 'text-gray-900' 
                  : 'hover:bg-soft-purple/70'
              }`}
              style={{
                background: activeDropdown === 'browse' 
                  ? 'linear-gradient(90deg, hsla(259, 60%, 90%, 1) 0%, hsla(252, 100%, 95%, 1) 100%)' 
                  : 'linear-gradient(90deg, rgba(229, 222, 255, 0.5) 0%, rgba(211, 228, 253, 0.3) 100%)'
              }}
            >
              EXPLORE TASKS
              {activeDropdown === 'browse' ? <ChevronUp className="ml-1.5 h-3.5 w-3.5" /> : <ChevronDown className="ml-1.5 h-3.5 w-3.5" />}
            </button>
            
            {activeDropdown === 'browse' && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg overflow-hidden z-50 animate-scale-in">
                <div className="bg-gradient-to-r from-soft-purple/80 to-soft-blue/80 p-3 text-gray-800 font-semibold text-base">
                  Browse Tasks
                </div>
                
                <div className="py-1">
                  {browseTasksMenu.map((item, index) => (
                    <Link 
                      key={index} 
                      to={item.link}
                      className="block px-3 py-2 hover:bg-soft-gray transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-soft-purple/20 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-gray-800">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.subtitle}</p>
                        </div>
                      </div>
                      {index < browseTasksMenu.length - 1 && (
                        <div className="border-b border-gray-100 mt-2 mx-auto"></div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={() => toggleDropdown('students')}
              className={`flex items-center px-4 py-2 rounded-xl text-gray-800 transition-colors ${
                activeDropdown === 'students' 
                  ? 'text-gray-900' 
                  : 'hover:bg-soft-green/70'
              }`}
              style={{
                background: activeDropdown === 'students' 
                  ? 'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)' 
                  : 'linear-gradient(90deg, rgba(242, 252, 226, 0.5) 0%, rgba(211, 228, 253, 0.3) 100%)'
              }}
            >
              FOR STUDENTS
              {activeDropdown === 'students' ? <ChevronUp className="ml-1.5 h-3.5 w-3.5" /> : <ChevronDown className="ml-1.5 h-3.5 w-3.5" />}
            </button>
            
            {activeDropdown === 'students' && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg overflow-hidden z-50 animate-scale-in">
                <div className="bg-gradient-to-r from-soft-green/80 to-soft-blue/80 p-3 text-gray-800 font-semibold text-base">
                  Student Portal
                </div>
                
                <div className="py-1">
                  {forStudentsMenu.map((item, index) => (
                    <Link 
                      key={index} 
                      to={item.link}
                      className="block px-3 py-2 hover:bg-soft-gray transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-soft-green/20 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-gray-800">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.subtitle}</p>
                        </div>
                      </div>
                      {index < forStudentsMenu.length - 1 && (
                        <div className="border-b border-gray-100 mt-2 mx-auto"></div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

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
            <div className="border-b border-gray-200 py-2">
              <button 
                className="flex items-center justify-between w-full text-left font-medium"
                onClick={() => toggleDropdown('browse-mobile')}
              >
                <span>EXPLORE TASKS</span>
                {activeDropdown === 'browse-mobile' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {activeDropdown === 'browse-mobile' && (
                <div className="mt-2 space-y-1.5 pl-3 animate-fade-in">
                  {browseTasksMenu.map((item, index) => (
                    <Link key={index} to={item.link} className="block py-1.5">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-soft-purple/20 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-gray-800">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-b border-gray-200 py-2">
              <button 
                className="flex items-center justify-between w-full text-left font-medium"
                onClick={() => toggleDropdown('students-mobile')}
              >
                <span>FOR STUDENTS</span>
                {activeDropdown === 'students-mobile' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {activeDropdown === 'students-mobile' && (
                <div className="mt-2 space-y-1.5 pl-3 animate-fade-in">
                  {forStudentsMenu.map((item, index) => (
                    <Link key={index} to={item.link} className="block py-1.5">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-soft-green/20 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-gray-800">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.subtitle}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 flex flex-col space-y-2">
              <Button 
                variant="outline" 
                className="w-full rounded-xl border-assist-blue text-assist-blue hover:bg-assist-blue/10 hover:text-assist-blue"
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
    </header>
  );
};

export default Navbar;
