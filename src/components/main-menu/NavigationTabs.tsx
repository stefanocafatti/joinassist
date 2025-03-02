
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
      hoverBg: "hover:bg-blue-100",
      hoverText: "hover:text-blue-800"
    },
    {
      name: "requests",
      label: "Requests",
      icon: ClipboardList,
      color: "green",
      hoverBg: "hover:bg-green-100",
      hoverText: "hover:text-green-800"
    },
    {
      name: "favorites",
      label: "Favorites",
      icon: Heart,
      color: "pink",
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
      hoverBg: "hover:bg-amber-100",
      hoverText: "hover:text-amber-800"
    },
    {
      name: "profile",
      label: "Profile",
      icon: User,
      color: "purple",
      hoverBg: "hover:bg-purple-100",
      hoverText: "hover:text-purple-800"
    }
  ];

  // Map color names to tailwind classes with unique colors per tab
  const getColorClasses = (isActive: boolean, tabColor: string) => {
    // Base colors for active state (blue theme)
    const activeColors = {
      bg: "bg-blue-600",
      text: "text-white",
      shadow: "shadow-md shadow-blue-200"
    };
    
    // When not active, use white background but custom hover colors per tab
    return {
      bg: isActive ? activeColors.bg : "bg-white",
      text: isActive ? activeColors.text : `text-blue-600`,
      shadow: isActive ? activeColors.shadow : "",
      hover: !isActive ? `${tabColor}` : ""
    };
  };

  const renderTabRow = (tabs: typeof topTabs) => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const hoverClass = `${tab.hoverBg} ${tab.hoverText}`;
          const colorClasses = getColorClasses(isActive, hoverClass);
          
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
              className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-200 transform ${isActive ? 'scale-105' : 'scale-100'} ${colorClasses.bg} ${colorClasses.text} ${colorClasses.shadow} ${!isActive ? colorClasses.hover : ''} border border-blue-100`}
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
            const hoverClass = `${tab.hoverBg} ${tab.hoverText}`;
            const colorClasses = getColorClasses(isActive, hoverClass);
            
            const handleClick = () => {
              onTabChange(tab.name);
            };
            
            return (
              <button
                key={tab.name}
                className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-200 transform ${isActive ? 'scale-105' : 'scale-100'} ${colorClasses.bg} ${colorClasses.text} ${colorClasses.shadow} ${!isActive ? colorClasses.hover : ''} border border-blue-100`}
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
