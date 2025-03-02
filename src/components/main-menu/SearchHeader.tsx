
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ 
  searchQuery, 
  onSearchQueryChange, 
  onSearch 
}) => {
  return (
    <form onSubmit={onSearch} className="mb-8">
      <div className="relative flex items-center">
        <Input 
          type="text" 
          placeholder="What do you need help with today?"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pr-12 h-14 rounded-full border-2 border-assist-blue/30 shadow-sm bg-white focus:border-assist-blue focus:ring-2 focus:ring-assist-blue/20 text-base placeholder:text-assist-blue/60"
        />
        <button 
          type="submit" 
          className="absolute right-4 text-assist-blue hover:text-assist-blue/80 transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchHeader;
