
import React, { useState } from "react";
import InterestsSection from "./InterestsSection";
import SearchResultsSection from "./SearchResultsSection";
import RecommendedTasksSection from "./RecommendedTasksSection";
import RecentSearchesSection from "./RecentSearchesSection";
import PastTasksSection from "./PastTasksSection";
import CategoriesSection from "./CategoriesSection";
import HomeNavigation from "./HomeNavigation";
import { Button } from "@/components/ui/button";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  pointsEarned?: number;
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
  interestTags: InterestTag[];
  userInterests: string[];
  favoriteTaskIds: string[];
  recentSearches: string[];
  pastTasks: PastTask[];
  onToggleInterest: (id: string) => void;
  onClearResults: () => void;
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
  onRequestTask: () => void;
  onSearchClick: (search: string) => void;
}

const HomeTabContent: React.FC<HomeTabContentProps> = ({
  searchQuery,
  searchPerformed,
  searchResults,
  recommendedTasks,
  interestTags,
  userInterests,
  favoriteTaskIds,
  recentSearches,
  pastTasks,
  onToggleInterest,
  onClearResults,
  onFavoriteToggle,
  onBookNow,
  onRequestTask,
  onSearchClick
}) => {
  const [activeSection, setActiveSection] = useState<string>("categories");
  const [showAllTasks, setShowAllTasks] = useState(false);
  
  const tasksWithPoints = recommendedTasks.map(task => ({
    ...task,
    pointsEarned: 50 // Fixed points earned value instead of price-based calculation
  }));
  
  const searchResultsWithPoints = searchResults 
    ? searchResults.map(task => ({
        ...task, 
        pointsEarned: 50 // Fixed points earned value instead of price-based calculation
      }))
    : null;
  
  const handleLoadMoreTasks = () => {
    setShowAllTasks(true);
  };
  
  const renderSectionContent = () => {
    if (searchPerformed) {
      return (
        <SearchResultsSection
          searchQuery={searchQuery}
          searchResults={searchResultsWithPoints}
          favoriteTaskIds={favoriteTaskIds}
          onClearResults={onClearResults}
          onFavoriteToggle={onFavoriteToggle}
          onBookNow={onBookNow}
          onRequestTask={onRequestTask}
        />
      );
    }
    
    switch (activeSection) {
      case "categories":
        return (
          <>
            <CategoriesSection showAllTasks={showAllTasks} />
            
            {!showAllTasks && (
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleLoadMoreTasks}
                  className="bg-assist-blue hover:bg-assist-blue/90 text-white rounded-full px-8 py-2"
                >
                  Load More Tasks
                </Button>
              </div>
            )}
            
            <div className="mt-10 bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Didn't find what you were looking for?</h3>
                <p className="text-gray-600 mb-6">
                  We can help you with custom tasks that aren't listed above.
                </p>
                <Button 
                  onClick={onRequestTask}
                  className="bg-assist-blue hover:bg-assist-blue/90"
                >
                  Request a Task
                </Button>
              </div>
            </div>
          </>
        );
      case "recommended":
        return (
          <>
            <RecommendedTasksSection 
              tasks={tasksWithPoints}
              favoriteTaskIds={favoriteTaskIds}
              onFavoriteToggle={onFavoriteToggle}
              onBookNow={onBookNow}
            />
            
            <div className="mt-10 bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Didn't find what you were looking for?</h3>
                <p className="text-gray-600 mb-6">
                  We can help you with custom tasks that aren't listed above.
                </p>
                <Button 
                  onClick={onRequestTask}
                  className="bg-assist-blue hover:bg-assist-blue/90"
                >
                  Request a Task
                </Button>
              </div>
            </div>
          </>
        );
      case "searches":
        return (
          <>
            <RecentSearchesSection 
              recentSearches={recentSearches}
              onSearchClick={onSearchClick}
            />
            
            <div className="mt-10 bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Didn't find what you were looking for?</h3>
                <p className="text-gray-600 mb-6">
                  We can help you with custom tasks that aren't listed above.
                </p>
                <Button 
                  onClick={onRequestTask}
                  className="bg-assist-blue hover:bg-assist-blue/90"
                >
                  Request a Task
                </Button>
              </div>
            </div>
          </>
        );
      case "pastTasks":
        return (
          <>
            <PastTasksSection 
              pastTasks={pastTasks}
              favoriteTaskIds={favoriteTaskIds}
              onFavoriteToggle={onFavoriteToggle}
              onViewTask={onBookNow}
            />
            
            <div className="mt-10 bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Didn't find what you were looking for?</h3>
                <p className="text-gray-600 mb-6">
                  We can help you with custom tasks that aren't listed above.
                </p>
                <Button 
                  onClick={onRequestTask}
                  className="bg-assist-blue hover:bg-assist-blue/90"
                >
                  Request a Task
                </Button>
              </div>
            </div>
          </>
        );
      case "recent":
        return (
          <>
            <RecommendedTasksSection 
              tasks={tasksWithPoints.slice().reverse()}
              favoriteTaskIds={favoriteTaskIds}
              onFavoriteToggle={onFavoriteToggle}
              onBookNow={onBookNow}
            />
            
            <div className="mt-10 bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Didn't find what you were looking for?</h3>
                <p className="text-gray-600 mb-6">
                  We can help you with custom tasks that aren't listed above.
                </p>
                <Button 
                  onClick={onRequestTask}
                  className="bg-assist-blue hover:bg-assist-blue/90"
                >
                  Request a Task
                </Button>
              </div>
            </div>
          </>
        );
      default:
        return <CategoriesSection showAllTasks={false} />;
    }
  };
  
  return (
    <>
      <InterestsSection 
        interestTags={interestTags} 
        userInterests={userInterests} 
        onToggleInterest={onToggleInterest} 
      />
      
      {!searchPerformed && (
        <HomeNavigation 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      )}
      
      {renderSectionContent()}
    </>
  );
};

export default HomeTabContent;
