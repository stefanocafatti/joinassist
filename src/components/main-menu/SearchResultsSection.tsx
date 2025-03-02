import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye } from "lucide-react";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  price: number;
  priceType: string;
}

interface SearchResultsSectionProps {
  searchQuery: string;
  searchResults: Task[] | null;
  favoriteTaskIds: string[];
  onClearResults: () => void;
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
  onRequestTask: () => void;
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({ 
  searchQuery, 
  searchResults, 
  favoriteTaskIds, 
  onClearResults, 
  onFavoriteToggle, 
  onBookNow,
  onRequestTask
}) => {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Search Results for "{searchQuery}"</h2>
        <Button variant="outline" size="sm" onClick={onClearResults}>
          Clear Results
        </Button>
      </div>
      
      {searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((task, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
              onClick={() => onBookNow(task.title)}
            >
              <div className="relative">
                <div 
                  className="h-40 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${task.image})` }}
                />
                <button 
                  className="absolute top-3 right-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavoriteToggle(task.title);
                  }}
                >
                  <Heart 
                    className={`h-5 w-5 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{task.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                <div className="flex justify-end items-center">
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
        <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any tasks matching "{searchQuery}". Would you like to request this task?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={onRequestTask}
                className="bg-assist-blue hover:bg-assist-blue/90"
              >
                Request This Task
              </Button>
              <Button 
                variant="outline" 
                onClick={onClearResults}
              >
                Browse Other Tasks
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchResultsSection;
