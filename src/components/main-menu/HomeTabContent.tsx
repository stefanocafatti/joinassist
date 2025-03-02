
import React, { useState } from "react";
import InterestsSection from "./InterestsSection";
import SearchResultsSection from "./SearchResultsSection";
import RecommendedTasksSection from "./RecommendedTasksSection";
import RecentSearchesSection from "./RecentSearchesSection";
import PastTasksSection from "./PastTasksSection";
import CategoriesSection from "./CategoriesSection";
import HomeNavigation from "./HomeNavigation";
import { LucideIcon } from "lucide-react";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  price: number;
  priceType: string;
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
  const [activeSection, setActiveSection] = useState<string>("recommended");
  
  // Add points to be earned for each task (based on price)
  const tasksWithPoints = recommendedTasks.map(task => ({
    ...task,
    pointsEarned: Math.round(task.price * 2) // Example: 2 points per dollar
  }));
  
  const searchResultsWithPoints = searchResults 
    ? searchResults.map(task => ({
        ...task, 
        pointsEarned: Math.round(task.price * 2)
      }))
    : null;
  
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
      case "recommended":
        return (
          <RecommendedTasksSection 
            tasks={tasksWithPoints}
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onBookNow={onBookNow}
          />
        );
      case "searches":
        return (
          <RecentSearchesSection 
            recentSearches={recentSearches}
            onSearchClick={onSearchClick}
          />
        );
      case "pastTasks":
        return (
          <PastTasksSection 
            pastTasks={pastTasks}
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onViewTask={onBookNow}
          />
        );
      case "categories":
        return <CategoriesSection />;
      case "recent":
        // For simplicity, showing recommended tasks as recent
        return (
          <RecommendedTasksSection 
            tasks={tasksWithPoints.slice().reverse()}
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onBookNow={onBookNow}
          />
        );
      default:
        return (
          <RecommendedTasksSection 
            tasks={tasksWithPoints}
            favoriteTaskIds={favoriteTaskIds}
            onFavoriteToggle={onFavoriteToggle}
            onBookNow={onBookNow}
          />
        );
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
