
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
  // Helper function to get the color styles for each tab
  const getTabStyles = (tabName: string) => {
    const isActive = activeTab === tabName;
    
    const tabStyleMap: Record<string, { 
      active: string, 
      inactive: string, 
      icon: string
    }> = {
      allTasks: {
        active: "bg-purple-600 text-white shadow-lg",
        inactive: "bg-purple-50 text-purple-600 hover:bg-purple-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-purple-600"
      },
      requests: {
        active: "bg-emerald-600 text-white shadow-lg",
        inactive: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-emerald-600"
      },
      favorites: {
        active: "bg-pink-600 text-white shadow-lg",
        inactive: "bg-pink-50 text-pink-600 hover:bg-pink-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-pink-600"
      },
      rewards: {
        active: "bg-amber-600 text-white shadow-lg",
        inactive: "bg-amber-50 text-amber-600 hover:bg-amber-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-amber-600"
      },
      profile: {
        active: "bg-blue-600 text-white shadow-lg",
        inactive: "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-blue-600"
      }
    };
    
    const baseClasses = "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 h-full";
    return `${baseClasses} ${isActive ? tabStyleMap[tabName].active : tabStyleMap[tabName].inactive}`;
  };

  // Define the tabs in the desired order
  const tabs = [
    {
      name: "allTasks",
      label: "Tasks",
      icon: Grid,
      onClick: () => {
        onTabChange("allTasks");
        if (showFavorites) onToggleFavoriteView();
      }
    },
    {
      name: "requests",
      label: "Requests",
      icon: ClipboardList,
      onClick: () => {
        onTabChange("requests");
        if (showFavorites) onToggleFavoriteView();
      }
    },
    {
      name: "favorites",
      label: "Favorites",
      icon: Heart,
      onClick: () => {
        onTabChange("favorites");
        onToggleFavoriteView();
      }
    },
    {
      name: "rewards",
      label: "Rewards",
      icon: Gift,
      onClick: () => {
        onTabChange("rewards");
        if (showFavorites) onToggleFavoriteView();
      }
    },
    {
      name: "profile",
      label: "Profile",
      icon: User,
      onClick: () => {
        onTabChange("profile");
        if (showFavorites) onToggleFavoriteView();
      }
    }
  ];

  return (
    <div className="mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const tabStyle = getTabStyles(tab.name);
          const colorName = tab.name === "allTasks" ? "purple" : 
                           (tab.name === "requests" ? "emerald" : 
                           (tab.name === "favorites" ? "pink" : 
                           (tab.name === "rewards" ? "amber" : "blue")));
          
          return (
            <button
              key={tab.name}
              className={tabStyle}
              onClick={tab.onClick}
              aria-current={isActive ? "page" : undefined}
            >
              {React.createElement(tab.icon, {
                className: `h-6 w-6 mb-2 ${isActive ? "text-white" : `text-${colorName}-600`}`
              })}
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;
