
import React from "react";
import { Button } from "@/components/ui/button";

interface RecentSearchesSectionProps {
  recentSearches: string[];
  onSearchClick: (search: string) => void;
}

const RecentSearchesSection: React.FC<RecentSearchesSectionProps> = ({ 
  recentSearches, 
  onSearchClick 
}) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Recent Searches</h2>
      {recentSearches.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {recentSearches.map((search, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="rounded-full bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
              onClick={() => onSearchClick(search)}
            >
              {search}
            </Button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent searches yet</p>
      )}
    </section>
  );
};

export default RecentSearchesSection;
