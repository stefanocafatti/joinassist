
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsInputFocused(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRecentSearchClick = (search: string) => {
    onSearchQueryChange(search);
    setIsInputFocused(false);
    
    setTimeout(() => {
      if (formRef.current) {
        const fakeEvent = new Event('submit', { cancelable: true }) as unknown as React.FormEvent;
        onSearch(fakeEvent);
      } else {
        onSearchClick(search);
      }
    }, 10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(e);
    }
  };

  const handleMobileRedirect = () => {
    if (searchQuery.trim()) {
      navigate(`/mobile/home?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (!isVisible) return null;

  return (
    <div ref={searchContainerRef} className="mb-8 relative">
      <form ref={formRef} onSubmit={handleSubmit} className="group">
        <div className="relative flex items-center">
          <div className="absolute left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-assist-blue/80 group-hover:text-assist-blue transition-colors duration-200" />
          </div>
          <Input 
            type="text" 
            placeholder="Try 'moving help' or 'math tutoring'"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            className="pl-12 pr-12 h-14 rounded-full border-2 border-assist-blue/40 shadow 
                      bg-white focus:border-assist-blue focus:ring-2 focus:ring-assist-blue/20 
                      text-base placeholder:text-gray-400 group-hover:border-assist-blue/60 
                      group-hover:shadow-md transition-all duration-200"
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => onSearchQueryChange("")}
              className="absolute right-12 text-gray-400 hover:text-gray-600 hover:bg-gray-100 
                        p-1 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button 
            type="submit" 
            className="absolute right-4 text-white bg-assist-blue hover:bg-assist-blue/90 
                      p-2 rounded-full transition-all duration-200 shadow-sm hover:shadow"
            onClick={handleMobileRedirect}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-5 right-5 h-0.5 bg-gradient-to-r from-assist-blue/70 to-assist-purple/80 
                      scale-x-0 group-hover:scale-x-100 rounded-full transition-transform duration-300 origin-left"></div>
      </form>
      
      {isInputFocused && recentSearches.length > 0 && !searchQuery && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 py-2 
                       animate-in fade-in-50 duration-100 overflow-hidden">
          <h3 className="px-4 py-2 text-sm font-medium text-gray-500 flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            Recent Searches
          </h3>
          <div className="max-h-48 overflow-y-auto">
            {recentSearches.map((search, index) => (
              <div 
                key={index} 
                className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center"
                onClick={() => handleRecentSearchClick(search)}
              >
                <Search className="h-4 w-4 text-gray-400 mr-2.5" />
                <span className="text-gray-800">{search}</span>
              </div>
            ))}
          </div>
          <div className="px-3 pt-1 pb-2 border-t border-gray-100 mt-1 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50"
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
