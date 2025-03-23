
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, X, MapPin, DollarSign, Plus, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchResultsSectionProps {
  searchQuery: string;
  searchResults: {
    title: string;
    description: string;
    category: string;
    location: string;
    image: string;
  }[];
  favoriteTaskIds: string[];
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
  onClearResults: () => void;
  onRequestTask: () => void;
  onBrowseTasks?: () => void;
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  searchQuery,
  searchResults,
  favoriteTaskIds,
  onFavoriteToggle,
  onBookNow,
  onClearResults,
  onRequestTask,
  onBrowseTasks
}) => {
  // Helper function to highlight matching text in search results
  const highlightMatchingText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    // Split query into words for better matching
    const queryWords = query.trim().toLowerCase().split(/\s+/);
    
    // Create regex pattern that matches any of the words
    const pattern = queryWords.map(word => `(${word})`).join('|');
    const regex = new RegExp(pattern, 'gi');
    
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => {
          // Check if this part matches any of our query words
          const isMatch = queryWords.some(word => 
            part.toLowerCase() === word
          );
          
          return isMatch ? 
            <span key={i} className="bg-yellow-100 text-yellow-800 px-1 rounded">{part}</span> : 
            part;
        })}
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Results for "{searchQuery}"
          </h2>
          <button
            onClick={onClearResults}
            className="ml-3 text-gray-400 hover:text-gray-600"
            aria-label="Clear search results"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((task) => (
            <div
              key={task.title}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => onBookNow(task.title)}
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={task.image}
                  alt={task.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {highlightMatchingText(task.title, searchQuery)}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  {highlightMatchingText(task.description, searchQuery)}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    {task.location}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
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
                      fill={
                        favoriteTaskIds.includes(task.title)
                          ? "currentColor"
                          : "none"
                      }
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                  <Button 
                    size="sm" 
                    className="bg-assist-blue hover:bg-assist-blue/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookNow(task.title);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View Task
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No results found
          </h3>
          <p className="text-gray-500 mb-6">
            We couldn't find any tasks matching "{searchQuery}"
          </p>
          <div className="space-y-4">
            <Button
              variant="default"
              className="bg-assist-blue hover:bg-assist-blue/90"
              onClick={onRequestTask}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Task
            </Button>
            <div className="block text-center my-2">or</div>
            <Button
              variant="outline"
              className="border-assist-blue text-assist-blue hover:bg-assist-blue/5"
              onClick={onBrowseTasks}
            >
              Browse Other Tasks
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsSection;
