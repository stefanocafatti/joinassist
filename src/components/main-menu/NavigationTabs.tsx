
import React from "react";
import { Home, ClipboardList, Heart, User, Store } from "lucide-react";

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
    const baseClasses = "py-3 px-6 font-medium text-sm border-b-2 flex items-center justify-center gap-2 transition-all duration-300";
    
    const tabStyles: Record<string, { active: string, inactive: string }> = {
      home: {
        active: "border-indigo-600 text-indigo-600 bg-indigo-50",
        inactive: "border-transparent text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50"
      },
      requests: {
        active: "border-emerald-600 text-emerald-600 bg-emerald-50",
        inactive: "border-transparent text-gray-500 hover:text-emerald-600 hover:bg-emerald-50/50"
      },
      favorites: {
        active: "border-pink-600 text-pink-600 bg-pink-50",
        inactive: "border-transparent text-gray-500 hover:text-pink-600 hover:bg-pink-50/50"
      },
      store: {
        active: "border-amber-600 text-amber-600 bg-amber-50",
        inactive: "border-transparent text-gray-500 hover:text-amber-600 hover:bg-amber-50/50"
      },
      profile: {
        active: "border-blue-600 text-blue-600 bg-blue-50",
        inactive: "border-transparent text-gray-500 hover:text-blue-600 hover:bg-blue-50/50"
      }
    };
    
    return `${baseClasses} ${isActive ? tabStyles[tabName].active : tabStyles[tabName].inactive}`;
  };

  return (
    <div className="flex flex-wrap border-b border-gray-200 mb-8 bg-white rounded-xl shadow-sm">
      <button
        className={getTabStyles("home")}
        onClick={() => {
          onTabChange("home");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        <Home className={`h-5 w-5 ${activeTab === "home" ? "text-indigo-600" : "text-gray-500"}`} />
        <span className="hidden sm:inline">Home</span>
      </button>
      <button
        className={getTabStyles("requests")}
        onClick={() => {
          onTabChange("requests");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        <ClipboardList className={`h-5 w-5 ${activeTab === "requests" ? "text-emerald-600" : "text-gray-500"}`} />
        <span className="hidden sm:inline">Submitted Requests</span>
      </button>
      <button
        className={getTabStyles("favorites")}
        onClick={() => {
          onTabChange("favorites");
          onToggleFavoriteView();
        }}
      >
        <Heart className={`h-5 w-5 ${activeTab === "favorites" ? "text-pink-600" : "text-gray-500"}`} />
        <span className="hidden sm:inline">Favorites</span>
      </button>
      <button
        className={getTabStyles("store")}
        onClick={() => {
          onTabChange("store");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        <Store className={`h-5 w-5 ${activeTab === "store" ? "text-amber-600" : "text-gray-500"}`} />
        <span className="hidden sm:inline">Store</span>
      </button>
      <button
        className={getTabStyles("profile")}
        onClick={() => {
          onTabChange("profile");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        <User className={`h-5 w-5 ${activeTab === "profile" ? "text-blue-600" : "text-gray-500"}`} />
        <span className="hidden sm:inline">Profile</span>
      </button>
    </div>
  );
};

export default NavigationTabs;
