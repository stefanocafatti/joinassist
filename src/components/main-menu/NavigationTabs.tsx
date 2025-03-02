
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
  // Define the tabs in the desired order (3 above, 2 below)
  const topTabs = [
    {
      name: "allTasks",
      label: "Tasks",
      icon: Grid,
      color: "blue",
      activeBg: "bg-blue-600",
      activeText: "text-white",
      activeShadow: "shadow-blue-200",
      hoverBg: "hover:bg-blue-100",
      hoverText: "hover:text-blue-800"
    },
    {
      name: "requests",
      label: "Open Task Requests",
      icon: ClipboardList,
      color: "green",
      activeBg: "bg-green-600",
      activeText: "text-white",
      activeShadow: "shadow-green-200",
      hoverBg: "hover:bg-green-100",
      hoverText: "hover:text-green-800"
    },
    {
      name: "favorites",
      label: "Favorites",
      icon: Heart,
      color: "pink",
      activeBg: "bg-pink-600",
      activeText: "text-white",
      activeShadow: "shadow-pink-200",
      hoverBg: "hover:bg-pink-100",
      hoverText: "hover:text-pink-800"
    }
  ];
  
  const bottomTabs = [
    {
      name: "rewards",
      label: "Rewards",
      icon: Gift,
      color: "amber",
      activeBg: "bg-amber-600",
      activeText: "text-white",
      activeShadow: "shadow-amber-200",
      hoverBg: "hover:bg-amber-100",
      hoverText: "hover:text-amber-800"
    },
    {
      name: "profile",
      label: "Profile",
      icon: User,
      color: "purple",
      activeBg: "bg-purple-600",
      activeText: "text-white",
      activeShadow: "shadow-purple-200",
      hoverBg: "hover:bg-purple-100",
      hoverText: "hover:text-purple-800"
    }
  ];

  // Get color classes based on tab's state and color theme
  const getColorClasses = (isActive: boolean, tab: any) => {
    return {
      bg: isActive ? tab.activeBg : "bg-white",
      text: isActive ? tab.activeText : `text-${tab.color}-600`,
      shadow: isActive ? `shadow-md shadow-${tab.activeShadow}` : "",
      hover: !isActive ? `${tab.hoverBg} ${tab.hoverText}` : ""
    };
  };

  const renderTabRow = (tabs: typeof topTabs) => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const colorClasses = getColorClasses(isActive, tab);
          
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
              className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-200 transform ${isActive ? 'scale-105' : 'scale-100'} ${colorClasses.bg} ${colorClasses.text} ${colorClasses.shadow} ${!isActive ? colorClasses.hover : ''} border border-${tab.color}-100`}
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
    );
  };

  return (
    <div className="mb-6 p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
      <div className="flex flex-col space-y-2">
        {renderTabRow(topTabs)}
        <div className="grid grid-cols-2 gap-2">
          {bottomTabs.map((tab) => {
            const isActive = activeTab === tab.name;
            const colorClasses = getColorClasses(isActive, tab);
            
            const handleClick = () => {
              onTabChange(tab.name);
            };
            
            return (
              <button
                key={tab.name}
                className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-200 transform ${isActive ? 'scale-105' : 'scale-100'} ${colorClasses.bg} ${colorClasses.text} ${colorClasses.shadow} ${!isActive ? colorClasses.hover : ''} border border-${tab.color}-100`}
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
    </div>
  );
};

export default NavigationTabs;
