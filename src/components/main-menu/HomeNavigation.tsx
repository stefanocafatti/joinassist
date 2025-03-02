
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, ThumbsUp, Search, History, Grid } from "lucide-react";

interface HomeNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: "recommended", label: "Recommended", icon: <ThumbsUp className="h-4 w-4 mr-2" /> },
    { id: "categories", label: "Categories", icon: <Grid className="h-4 w-4 mr-2" /> },
    { id: "recent", label: "Recently Viewed", icon: <Clock className="h-4 w-4 mr-2" /> },
    { id: "searches", label: "Search History", icon: <Search className="h-4 w-4 mr-2" /> },
    { id: "pastTasks", label: "Past Tasks", icon: <History className="h-4 w-4 mr-2" /> },
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
