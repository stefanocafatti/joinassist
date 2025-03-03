
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchHeaderProps {
  searchQuery: string;
  recentSearches: string[];
  onSearchQueryChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onSearchClick: (search: string) => void;
  isVisible?: boolean;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ 
  searchQuery, 
  recentSearches,
  onSearchQueryChange, 
  onSearch,
  onSearchClick,
  isVisible = true
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsInputFocused(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle clicking on a recent search
  const handleRecentSearchClick = (search: string) => {
    onSearchQueryChange(search);
    setIsInputFocused(false);
    
    // Manually trigger the search after a short delay to ensure the query is updated
    setTimeout(() => {
      if (formRef.current) {
        const fakeEvent = new Event('submit', { cancelable: true }) as unknown as React.FormEvent;
        onSearch(fakeEvent);
      } else {
        // Fallback if form ref isn't available
        onSearchClick(search);
      }
    }, 10);
  };

  if (!isVisible) return null;

  return (
    <div ref={searchContainerRef} className="mb-8 relative">
      <form ref={formRef} onSubmit={onSearch}>
        <div className="relative flex items-center">
          <Input 
            type="text" 
            placeholder="What do you need help with today?"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            className="pr-12 h-14 rounded-full border-2 border-assist-blue/30 shadow-sm bg-white focus:border-assist-blue focus:ring-2 focus:ring-assist-blue/20 text-base placeholder:text-assist-blue/60"
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => onSearchQueryChange("")}
              className="absolute right-12 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button 
            type="submit" 
            className="absolute right-4 text-assist-blue hover:text-assist-blue/80 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>
      
      {isInputFocused && recentSearches.length > 0 && !searchQuery && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-in fade-in-50 duration-100">
          <h3 className="px-3 py-1 text-sm font-medium text-gray-500">Recent Searches</h3>
          <div className="max-h-48 overflow-y-auto">
            {recentSearches.map((search, index) => (
              <div 
                key={index} 
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                onClick={() => handleRecentSearchClick(search)}
              >
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-800">{search}</span>
              </div>
            ))}
          </div>
          <div className="px-3 pt-1 pb-2 border-t border-gray-100 mt-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={() => setIsInputFocused(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
