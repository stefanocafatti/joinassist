
import React from "react";
import { Home, ClipboardList, Heart, User, Gift, Grid } from "lucide-react";

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
      icon: string,
      position: string
    }> = {
      allTasks: {
        active: "bg-purple-600 text-white shadow-lg",
        inactive: "bg-purple-50 text-purple-600 hover:bg-purple-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-purple-600",
        position: "col-span-3 row-span-2 md:col-span-2 md:row-span-2"
      },
      home: {
        active: "bg-indigo-600 text-white shadow-lg",
        inactive: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-indigo-600",
        position: "col-span-3 md:col-span-1 row-span-1"
      },
      requests: {
        active: "bg-emerald-600 text-white shadow-lg",
        inactive: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-emerald-600",
        position: "col-span-3 md:col-span-1 row-span-1"
      },
      favorites: {
        active: "bg-pink-600 text-white shadow-lg",
        inactive: "bg-pink-50 text-pink-600 hover:bg-pink-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-pink-600",
        position: "col-span-3 md:col-span-1 row-span-1"
      },
      rewards: {
        active: "bg-amber-600 text-white shadow-lg",
        inactive: "bg-amber-50 text-amber-600 hover:bg-amber-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-amber-600",
        position: "col-span-3 md:col-span-1 row-span-1"
      },
      profile: {
        active: "bg-blue-600 text-white shadow-lg",
        inactive: "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-md",
        icon: isActive ? "text-white" : "text-blue-600",
        position: "col-span-3 md:col-span-1 row-span-1"
      }
    };
    
    const baseClasses = "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 transform hover:scale-105";
    return `${baseClasses} ${isActive ? tabStyleMap[tabName].active : tabStyleMap[tabName].inactive} ${tabStyleMap[tabName].position}`;
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
      name: "home",
      label: "Home",
      icon: Home,
      onClick: () => {
        onTabChange("home");
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
      <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
        {/* First row for the Tasks button */}
        <div className="col-span-3">
          <button
            key={tabs[0].name}
            className={getTabStyles(tabs[0].name)}
            onClick={tabs[0].onClick}
            aria-current={activeTab === tabs[0].name ? "page" : undefined}
          >
            {/* Fixed: Using proper JSX syntax for dynamic component */}
            {React.createElement(tabs[0].icon, {
              className: `h-7 w-7 mb-2 ${activeTab === tabs[0].name ? "text-white" : "text-purple-600"}`
            })}
            <span className="font-medium text-base">{tabs[0].label}</span>
          </button>
        </div>
        
        {/* Second row for the remaining buttons in a more compact layout */}
        <div className="col-span-3 grid grid-cols-2 md:grid-cols-5 gap-3">
          {tabs.slice(1).map((tab, index) => {
            const isActive = activeTab === tab.name;
            const IconComponent = tab.icon;
            const colorName = tab.name === "home" ? "indigo" : 
                             (tab.name === "requests" ? "emerald" : 
                             (tab.name === "favorites" ? "pink" : 
                             (tab.name === "rewards" ? "amber" : "blue")));
            
            return (
              <button
                key={tab.name}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? `bg-${colorName}-600 text-white shadow-lg` 
                    : `bg-${colorName}-50 text-${colorName}-600 hover:bg-${colorName}-100 hover:shadow-md`
                }`}
                onClick={tab.onClick}
                aria-current={isActive ? "page" : undefined}
              >
                <IconComponent 
                  className={`h-5 w-5 mb-1 ${isActive ? "text-white" : `text-${colorName}-600`}`} 
                />
                <span className="font-medium text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
