
import React from "react";
import { Button } from "@/components/ui/button";
import { Grid, Star, Eye, List } from "lucide-react";

interface HomeNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: "allTasks", label: "All Tasks", icon: <List className="h-4 w-4 mr-2" /> },
    { id: "recommended", label: "Recommended Tasks", icon: <Star className="h-4 w-4 mr-2" /> },
    { id: "recentlyViewed", label: "Recently Viewed", icon: <Eye className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-100 p-2">
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
            size="sm"
            className={`flex items-center ${activeSection === section.id ? 'bg-assist-blue text-white' : 'text-gray-700'}`}
            onClick={() => onSectionChange(section.id)}
          >
            {section.icon}
            {section.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HomeNavigation;
