
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ClipboardList, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      icon: Home, 
      label: "Home", 
      path: "/mobile/home", 
      active: location.pathname === "/mobile" || location.pathname === "/mobile/home" 
    },
    { 
      icon: ClipboardList, 
      label: "My Tasks", 
      path: "/mobile/my-tasks", 
      active: location.pathname === "/mobile/my-tasks" 
    },
    { 
      icon: MessageSquare, 
      label: "Messages", 
      path: "/mobile/messages", 
      active: location.pathname === "/mobile/messages" 
    },
    { 
      icon: User, 
      label: "Profile", 
      path: "/mobile/profile", 
      active: location.pathname === "/mobile/profile" 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-400 via-assist-blue to-blue-500 border-t border-blue-300 z-10 shadow-md">
      <div className="flex justify-around h-16">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col items-center justify-center w-full transition-colors duration-200"
            aria-label={item.label}
          >
            <item.icon 
              size={22} 
              className={item.active ? "text-white" : "text-white/70"} 
            />
            <span className={cn(
              "text-xs mt-1",
              item.active ? "font-medium text-white" : "text-white/70"
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
