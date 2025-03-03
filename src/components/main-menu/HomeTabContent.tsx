// Import needed components
import React from "react";
import SearchResultsSection from "./SearchResultsSection";
import InterestsSection from "./InterestsSection";
import RecentSearchesSection from "./RecentSearchesSection";
import RecommendedTasksSection from "./RecommendedTasksSection";
import PastTasksSection from "./PastTasksSection";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Define the types for task objects
interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
}

interface PastTask {
  id: string;
  title: string;
  date: string;
  status: string;
}

interface InterestTag {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface HomeTabContentProps {
  searchQuery: string;
  searchPerformed: boolean;
  searchResults: Task[] | null;
  recommendedTasks: Task[];
  recentlyViewedTasks: Task[];
  interestTags: InterestTag[];
  userInterests: string[];
  favoriteTaskIds: string[];
  pastTasks: PastTask[];
  onToggleInterest: (id: string) => void;
  onClearResults: () => void;
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
  onRequestTask: () => void;
  onSetActiveTab?: (tab: string) => void;
  recentSearches?: string[]; // Add this to match RecentSearchesSection props
  onSearchClick?: (search: string) => void; // Add this to match RecentSearchesSection props
}

const HomeTabContent: React.FC<HomeTabContentProps> = ({
  searchQuery,
  searchPerformed,
  searchResults,
  recommendedTasks,
  recentlyViewedTasks,
  interestTags,
  userInterests,
  favoriteTaskIds,
  pastTasks,
  onToggleInterest,
  onClearResults,
  onFavoriteToggle,
  onBookNow,
  onRequestTask,
  onSetActiveTab,
  recentSearches = [], // Default to empty array
  onSearchClick = () => {} // Default to empty function
}) => {
  // Render based on search state
  if (searchPerformed && searchResults) {
    return (
      <SearchResultsSection
        searchQuery={searchQuery}
        searchResults={searchResults}
        favoriteTaskIds={favoriteTaskIds}
        onFavoriteToggle={onFavoriteToggle}
        onBookNow={onBookNow}
        onClearResults={onClearResults}
        onRequestTask={onRequestTask}
      />
    );
  }

  // Category emojis for the Browse by Category section
  const categoryEmojis = {
    "Cleaning": "🧹",
    "Moving": "🚚",
    "Academic": "📚",
    "Digital": "💻",
    "Fitness": "💪",
    "Events": "🎉",
    "Special": "✨",
    "For Brands": "🏢"
  };

  return (
    <div className="space-y-8">
      <InterestsSection
        interestTags={interestTags}
        userInterests={userInterests}
        onToggleInterest={onToggleInterest}
      />
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Browse by Category</h2>
          <Button 
            variant="link" 
            className="text-assist-blue p-0 h-auto"
            onClick={() => onSetActiveTab && onSetActiveTab("allTasks")}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.entries(categoryEmojis).map(([category, emoji], index) => (
            <div 
              key={index} 
              className="bg-assist-gray/10 hover:bg-assist-blue/5 rounded-xl p-4 text-center cursor-pointer transition-all hover:shadow-md hover:-translate-y-1"
              onClick={() => onSetActiveTab && onSetActiveTab("allTasks")}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-1">
                  <span className="text-2xl">{emoji}</span>
                </div>
              </div>
              <h3 className="font-medium text-sm">{category}</h3>
            </div>
          ))}
        </div>
      </section>
      
      <RecentSearchesSection 
        recentSearches={recentSearches}
        onSearchClick={onSearchClick}
      />
      
      <RecommendedTasksSection
        tasks={recommendedTasks}
        favoriteTaskIds={favoriteTaskIds}
        onFavoriteToggle={onFavoriteToggle}
        onBookNow={onBookNow}
      />
      
      {recentlyViewedTasks.length > 0 && (
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recently Viewed</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyViewedTasks.map((task) => (
              <div 
                key={task.title} 
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => onBookNow(task.title)}
              >
                <div className="h-40 overflow-hidden">
                  <img src={task.image} alt={task.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{task.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{task.location}</span>
                    <button 
                      className="text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteToggle(task.title);
                      }}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill={favoriteTaskIds.includes(task.title) ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <PastTasksSection 
        pastTasks={pastTasks} 
        favoriteTaskIds={favoriteTaskIds}
        onFavoriteToggle={onFavoriteToggle}
        onViewTask={onBookNow}
        onViewAll={() => onSetActiveTab && onSetActiveTab("requests")}
      />
      
      <div className="mt-10 text-center">
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full px-6 border-assist-blue text-assist-blue hover:bg-assist-blue/10"
          onClick={onRequestTask}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Request Custom Task
        </Button>
      </div>
    </div>
  );
};

export default HomeTabContent;
