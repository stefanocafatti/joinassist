
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, LucideIcon } from "lucide-react";

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
    <section className="mb-10 bg-blue-50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Personalize Your Experience</h2>
        <Button variant="ghost" size="sm" className="text-assist-blue">
          <Star className="h-4 w-4 mr-1" /> Save Preferences
        </Button>
      </div>
      
      <p className="text-gray-600 mb-4">
        Select your interests to get personalized task recommendations
      </p>
      
      <div className="flex flex-wrap gap-3">
        {interestTags.map(tag => (
          <Badge
            key={tag.id}
            className={`cursor-pointer flex items-center px-3 py-2 text-sm rounded-full ${
              userInterests.includes(tag.id) 
                ? 'bg-assist-blue text-white hover:bg-assist-blue/90' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onToggleInterest(tag.id)}
          >
            {tag.icon} {tag.label}
          </Badge>
        ))}
      </div>
      
      {userInterests.length > 0 && (
        <p className="text-sm text-assist-blue mt-3">
          {userInterests.length} interests selected - we'll customize your experience!
        </p>
      )}
    </section>
  );
};

export default InterestsSection;
