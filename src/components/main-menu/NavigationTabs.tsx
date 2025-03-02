
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
  return (
    <div className="flex border-b border-gray-200 mb-8">
      <button
        className={`py-3 px-6 font-medium text-sm border-b-2 flex items-center ${
          activeTab === "home" && !showFavorites
            ? "border-assist-blue text-assist-blue" 
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => {
          onTabChange("home");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        <Home className="h-4 w-4 mr-2" />
        Home
      </button>
      <button
        className={`py-3 px-6 font-medium text-sm border-b-2 flex items-center ${
          activeTab === "requests" 
            ? "border-assist-blue text-assist-blue" 
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => {
          onTabChange("requests");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        <ClipboardList className="h-4 w-4 mr-2" />
        Submitted Requests
      </button>
      <button
        className={`py-3 px-6 font-medium text-sm border-b-2 flex items-center ${
          showFavorites 
            ? "border-assist-blue text-assist-blue" 
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
        onClick={onToggleFavoriteView}
      >
        <Heart className="h-4 w-4 mr-2" />
        Favorites
      </button>
      <button
        className={`py-3 px-6 font-medium text-sm border-b-2 flex items-center ${
          activeTab === "store" 
            ? "border-assist-blue text-assist-blue" 
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => {
          onTabChange("store");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        <Store className="h-4 w-4 mr-2" />
        Store
      </button>
      <button
        className={`py-3 px-6 font-medium text-sm border-b-2 flex items-center ${
          activeTab === "profile" 
            ? "border-assist-blue text-assist-blue" 
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => {
          onTabChange("profile");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        <User className="h-4 w-4 mr-2" />
        Profile
      </button>
    </div>
  );
};

export default NavigationTabs;
