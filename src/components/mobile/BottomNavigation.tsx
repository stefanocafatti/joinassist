
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, Bell, User, Plus } from "lucide-react";

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
      label: "New Task", 
      path: "/mobile/new-task", 
      active: location.pathname === "/mobile/new-task",
      isPrimary: true
    },
    { 
      icon: Bell, 
      label: "Notifications", 
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center ${
              item.active ? "text-assist-blue" : "text-gray-500"
            } ${item.isPrimary ? "relative" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.isPrimary ? (
              <div className="absolute -top-6 bg-assist-blue text-white p-3 rounded-full shadow-lg">
                <item.icon size={20} />
              </div>
            ) : (
              <item.icon size={20} />
            )}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
