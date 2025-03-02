
import React from "react";

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
        className={`py-3 px-6 font-medium text-sm border-b-2 ${
          activeTab === "home" && !showFavorites
            ? "border-assist-blue text-assist-blue" 
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => {
          onTabChange("home");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        Home
      </button>
      <button
        className={`py-3 px-6 font-medium text-sm border-b-2 ${
          activeTab === "requests" 
            ? "border-assist-blue text-assist-blue" 
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => {
          onTabChange("requests");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        Submitted Requests
      </button>
      <button
        className={`py-3 px-6 font-medium text-sm border-b-2 ${
          showFavorites 
            ? "border-assist-blue text-assist-blue" 
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
        onClick={onToggleFavoriteView}
      >
        Favorites
      </button>
      <button
        className={`py-3 px-6 font-medium text-sm border-b-2 ${
          activeTab === "profile" 
            ? "border-assist-blue text-assist-blue" 
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => {
          onTabChange("profile");
          if (showFavorites) onToggleFavoriteView();
        }}
      >
        My Profile
      </button>
    </div>
  );
};

export default NavigationTabs;
