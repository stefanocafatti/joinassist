
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ClipboardList, MessageSquare, User } from "lucide-react";
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 shadow-md">
      <div className="flex justify-around h-16">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center justify-center w-full transition-colors duration-200",
              item.active ? "text-assist-blue" : "text-gray-500"
            )}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
          >
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
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
