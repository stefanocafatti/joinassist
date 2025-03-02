
import React from "react";
import SearchResultsSection from "./SearchResultsSection";
import RecommendedTasksSection from "./RecommendedTasksSection";
import InterestsSection from "./InterestsSection";
import PastTasksSection from "./PastTasksSection";
import CategoriesSection from "./CategoriesSection";

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
          <InterestsSection
            interestTags={interestTags}
            userInterests={userInterests}
            onToggleInterest={onToggleInterest}
          />
          
          <CategoriesSection />
          
          <RecommendedTasksSection
            tasks={recommendedTasks}
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onBookNow={onBookNow}
          />
          
          <PastTasksSection 
            pastTasks={pastTasks} 
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onViewTask={onBookNow} // Using onBookNow for the onViewTask functionality
          />
        </>
      )}
    </div>
  );
};

export default HomeTabContent;
