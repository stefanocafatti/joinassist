
import React from "react";
import InterestsSection from "./InterestsSection";
import SearchResultsSection from "./SearchResultsSection";
import RecommendedTasksSection from "./RecommendedTasksSection";
import RecentSearchesSection from "./RecentSearchesSection";
import PastTasksSection from "./PastTasksSection";
import CategoriesSection from "./CategoriesSection";
import { LucideIcon } from "lucide-react";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  price: number;
  priceType: string;
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
  return (
    <>
      <InterestsSection 
        interestTags={interestTags} 
        userInterests={userInterests} 
        onToggleInterest={onToggleInterest} 
      />
      
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
          <RecommendedTasksSection 
            tasks={recommendedTasks}
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onBookNow={onBookNow}
          />
          
          <RecentSearchesSection 
            recentSearches={recentSearches}
            onSearchClick={onSearchClick}
          />
          
          <PastTasksSection 
            pastTasks={pastTasks}
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onViewTask={onBookNow}
          />
          
          <CategoriesSection />
        </>
      )}
    </>
  );
};

export default HomeTabContent;
