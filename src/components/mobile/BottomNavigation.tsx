
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, Plus, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { 
      icon: Home, 
      label: "Home", 
      path: "/mobile", 
      active: location.pathname === "/mobile" 
    },
    { 
      icon: Search, 
      label: "Search", 
      path: "/mobile/search", 
      active: location.pathname === "/mobile/search" 
    },
    { 
      icon: Plus, 
      label: "", 
      path: "/mobile/new-task", 
      active: location.pathname === "/mobile/new-task",
      isPrimary: true
    },
    { 
      icon: Bell, 
      label: "Alerts", 
      path: "/mobile/notifications", 
      active: location.pathname === "/mobile/notifications" 
    },
    { 
      icon: User, 
      label: "Profile", 
      path: "/mobile/profile", 
      active: location.pathname === "/mobile/profile" 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 shadow-md">
      <div className="flex justify-around h-16">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center justify-center w-full transition-colors duration-200",
              item.isPrimary ? "relative" : "",
              item.active && !item.isPrimary ? "text-assist-blue" : "text-gray-500"
            )}
            onClick={() => navigate(item.path)}
            aria-label={item.label || "New Task"}
          >
            {item.isPrimary ? (
              <div className="absolute -top-6 bg-assist-blue text-white p-3.5 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105">
                <item.icon size={24} strokeWidth={2.5} />
              </div>
            ) : (
              <>
                <item.icon 
                  size={22} 
                  className={cn(
                    item.active ? "text-assist-blue" : "text-gray-500"
                  )} 
                />
                <span className={cn(
                  "text-xs mt-1",
                  item.active ? "font-medium" : ""
                )}>
                  {item.label}
                </span>
              </>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
