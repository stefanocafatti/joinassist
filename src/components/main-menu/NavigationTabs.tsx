
import React from "react";
import { ClipboardList, Heart, User, Gift, Grid } from "lucide-react";

interface NavigationTabsProps {
  activeTab: string;
  showFavorites: boolean;
  onTabChange: (tab: string) => void;
  onToggleFavoriteView: () => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ 
  activeTab, 
  showFavorites, 
  onTabChange, 
  onToggleFavoriteView 
}) => {
  // Define the tabs in the desired order
  const tabs = [
    {
      name: "allTasks",
      label: "Tasks",
      icon: Grid,
      color: "purple"
    },
    {
      name: "requests",
      label: "Requests",
      icon: ClipboardList,
      color: "emerald"
    },
    {
      name: "favorites",
      label: "Favorites",
      icon: Heart,
      color: "pink"
    },
    {
      name: "rewards",
      label: "Rewards",
      icon: Gift,
      color: "amber"
    },
    {
      name: "profile",
      label: "Profile",
      icon: User,
      color: "blue"
    }
  ];

  // Map color names to tailwind classes
  const getColorClasses = (tabName: string, isActive: boolean) => {
    const colorMap: Record<string, { bg: string, text: string, shadow: string, hover: string }> = {
      purple: {
        bg: isActive ? "bg-purple-600" : "bg-purple-50",
        text: isActive ? "text-white" : "text-purple-600",
        shadow: isActive ? "shadow-md shadow-purple-200" : "",
        hover: "hover:bg-purple-100"
      },
      emerald: {
        bg: isActive ? "bg-emerald-600" : "bg-emerald-50",
        text: isActive ? "text-white" : "text-emerald-600",
        shadow: isActive ? "shadow-md shadow-emerald-200" : "",
        hover: "hover:bg-emerald-100"
      },
      pink: {
        bg: isActive ? "bg-pink-600" : "bg-pink-50",
        text: isActive ? "text-white" : "text-pink-600",
        shadow: isActive ? "shadow-md shadow-pink-200" : "",
        hover: "hover:bg-pink-100"
      },
      amber: {
        bg: isActive ? "bg-amber-600" : "bg-amber-50",
        text: isActive ? "text-white" : "text-amber-600",
        shadow: isActive ? "shadow-md shadow-amber-200" : "",
        hover: "hover:bg-amber-100"
      },
      blue: {
        bg: isActive ? "bg-blue-600" : "bg-blue-50",
        text: isActive ? "text-white" : "text-blue-600",
        shadow: isActive ? "shadow-md shadow-blue-200" : "",
        hover: "hover:bg-blue-100"
      }
    };

    const tabColor = tabs.find(tab => tab.name === tabName)?.color || "purple";
    return colorMap[tabColor];
  };

  return (
    <div className="mb-6 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm">
      <div className="grid grid-cols-5 gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const colorClasses = getColorClasses(tab.name, isActive);
          
          const handleClick = () => {
            onTabChange(tab.name);
            if (tab.name === "favorites") {
              onToggleFavoriteView();
            } else if (showFavorites) {
              onToggleFavoriteView();
            }
          };
          
          return (
            <button
              key={tab.name}
              className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-200 transform ${isActive ? 'scale-100' : 'scale-95'} ${colorClasses.bg} ${colorClasses.text} ${colorClasses.shadow} ${!isActive ? colorClasses.hover : ''}`}
              onClick={handleClick}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="flex flex-col items-center justify-center space-y-1">
                {React.createElement(tab.icon, {
                  className: `h-5 w-5 ${isActive ? 'animate-pulse' : ''}`
                })}
                <span className="text-xs font-medium">{tab.label}</span>
              </div>
              
              {isActive && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full -mb-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;
