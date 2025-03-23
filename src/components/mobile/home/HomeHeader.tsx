
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HomeHeaderProps {
  userName: string;
  onSearch?: (query: string) => boolean; // Return true if a task was found and opened
}

const HomeHeader = ({ userName, onSearch }: HomeHeaderProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Try to find and open a matching task
      const taskFound = onSearch ? onSearch(searchQuery) : false;
      
      // If no task was found or opened, perform default search action
      if (!taskFound) {
        console.log("Searching for:", searchQuery);
        // Additional search logic can go here
      }
      
      // Reset search field
      setSearchQuery("");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-assist-blue text-white pt-8 pb-6 px-4 rounded-b-3xl shadow-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            Hi <span className="bg-gradient-to-r from-white to-blue-200">{userName}</span><span className="bg-gradient-to-r from-white to-blue-200">,</span>
          </h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/mobile/profile')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <span className="text-white text-lg font-medium">
                {userName.charAt(0)}
              </span>
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="mt-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for help with any task..."
              className="w-full py-3 pl-10 pr-4 bg-white text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeHeader;
