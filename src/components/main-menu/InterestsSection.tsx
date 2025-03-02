
import React from "react";
import { Badge } from "@/components/ui/badge";

interface InterestTag {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface InterestsSectionProps {
  interestTags: InterestTag[];
  userInterests: string[];
  onToggleInterest: (id: string) => void;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ 
  interestTags, 
  userInterests, 
  onToggleInterest 
}) => {
  return (
    <section className="mb-6 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Select your interests</h2>
      
      <div className="flex flex-wrap gap-2">
        {interestTags.map(tag => (
          <Badge
            key={tag.id}
            className={`cursor-pointer flex items-center px-3 py-1.5 rounded-full ${
              userInterests.includes(tag.id) 
                ? 'bg-assist-blue text-white hover:bg-assist-blue/90' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-0'
            }`}
            onClick={() => onToggleInterest(tag.id)}
          >
            {tag.icon} <span className="ml-1">{tag.label}</span>
          </Badge>
        ))}
      </div>
      
      {userInterests.length > 0 && (
        <p className="text-xs text-gray-500 mt-3">
          {userInterests.length} selected
        </p>
      )}
    </section>
  );
};

export default InterestsSection;
