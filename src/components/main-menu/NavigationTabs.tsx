
import React from "react";
import { Home, Search, PanelRight, Heart, User, ShoppingBag, BarChart, BookOpen, Wallet } from "lucide-react";

interface NavigationTabsProps {
  activeTab: string;
  showFavorites: boolean;
  onTabChange: (tab: string) => void;
  onToggleFavoriteView: () => void;
  isStudentView?: boolean;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ 
  activeTab, 
  showFavorites, 
  onTabChange, 
  onToggleFavoriteView,
  isStudentView = false
}) => {
  const tabs = isStudentView 
    ? [
        { id: "home", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
        { id: "tasks", label: "Tasks", icon: <BookOpen className="h-5 w-5" /> },
        { id: "earnings", label: "Earnings", icon: <Wallet className="h-5 w-5" /> },
        { id: "stats", label: "Stats", icon: <BarChart className="h-5 w-5" /> },
        { id: "profile", label: "Profile", icon: <User className="h-5 w-5" /> }
      ]
    : [
        { id: "home", label: "Home", icon: <Home className="h-5 w-5" /> },
        { id: "allTasks", label: "Browse", icon: <Search className="h-5 w-5" /> },
        { id: "requests", label: "Requests", icon: <PanelRight className="h-5 w-5" /> },
        { id: "rewards", label: "Store", icon: <ShoppingBag className="h-5 w-5" /> },
        { id: "profile", label: "Profile", icon: <User className="h-5 w-5" /> }
      ];
  
  return (
    <div className="flex overflow-x-auto border-b border-gray-200 mb-6 pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex items-center px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === tab.id || (tab.id === "favorites" && showFavorites)
              ? "text-assist-blue border-b-2 border-assist-blue"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon}
          <span className="ml-2">{tab.label}</span>
        </button>
      ))}
      
      {!isStudentView && (
        <button
          className={`flex items-center px-4 py-2 font-medium whitespace-nowrap ml-auto ${
            showFavorites
              ? "text-assist-blue border-b-2 border-assist-blue"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={onToggleFavoriteView}
        >
          <Heart className={`h-5 w-5 ${showFavorites ? "fill-assist-blue" : ""}`} />
          <span className="ml-2">Favorites</span>
        </button>
      )}
    </div>
  );
};

export default NavigationTabs;
