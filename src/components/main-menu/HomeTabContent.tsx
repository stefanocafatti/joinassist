
import React, { useState } from "react";
import SearchResultsSection from "./SearchResultsSection";
import RecommendedTasksSection from "./RecommendedTasksSection";
import InterestsSection from "./InterestsSection";
import PastTasksSection from "./PastTasksSection";
import HomeNavigation from "./HomeNavigation";
import TaskCategories from "../home/TaskCategories";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

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

interface HomeTabContentProps {
  searchQuery: string;
  searchPerformed: boolean;
  searchResults: Task[] | null;
  recommendedTasks: Task[];
  recentlyViewedTasks: Task[];
  interestTags: { id: string; label: string; icon: React.ReactNode }[];
  userInterests: string[];
  favoriteTaskIds: string[];
  pastTasks: PastTask[];
  onToggleInterest: (id: string) => void;
  onClearResults: () => void;
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
  onRequestTask: () => void;
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
}) => {
  const [activeSection, setActiveSection] = useState("allTasks");
  
  const renderSectionContent = () => {
    switch (activeSection) {
      case "allTasks":
        return (
          <>
            <InterestsSection
              interestTags={interestTags}
              userInterests={userInterests}
              onToggleInterest={onToggleInterest}
            />
            
            <TaskCategories 
              showAllTasks={true} 
              favoriteTaskIds={favoriteTaskIds}
              onFavoriteToggle={onFavoriteToggle}
              onViewTask={onBookNow}
            />
            
            <PastTasksSection 
              pastTasks={pastTasks} 
              favoriteTaskIds={favoriteTaskIds}
              onFavoriteToggle={onFavoriteToggle}
              onViewTask={onBookNow} 
            />
          </>
        );
      case "recommended":
        return (
          <RecommendedTasksSection
            tasks={recommendedTasks}
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onBookNow={onBookNow}
          />
        );
      case "recentlyViewed":
        return recentlyViewedTasks.length > 0 ? (
          <RecommendedTasksSection
            tasks={recentlyViewedTasks}
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onBookNow={onBookNow}
            sectionTitle="Recently Viewed Tasks"
          />
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200 my-8">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recently Viewed Tasks</h3>
              <p className="text-gray-600 mb-6">
                You haven't viewed any tasks yet. Browse our available tasks to find something that interests you.
              </p>
              <Button 
                onClick={() => setActiveSection("recommended")}
                className="bg-assist-blue hover:bg-assist-blue/90"
              >
                <Eye className="h-4 w-4 mr-2" /> Browse Tasks
              </Button>
            </div>
          </div>
        );
      case "pastOrders":
        return (
          <PastTasksSection 
            pastTasks={pastTasks.filter(task => task.status === "Completed")}
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onViewTask={onBookNow}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {searchPerformed && (
        <SearchResultsSection
          searchQuery={searchQuery}
          searchResults={searchResults}
          favoriteTaskIds={favoriteTaskIds}
          onClearResults={onClearResults}
          onFavoriteToggle={onFavoriteToggle}
          onBookNow={onBookNow}
          onRequestTask={onRequestTask}
        />
      )}

      {!searchPerformed && (
        <>
          <HomeNavigation 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          {renderSectionContent()}
        </>
      )}
    </div>
  );
};

export default HomeTabContent;
