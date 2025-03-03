
import React from "react";
import { LucideIcon, Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tasks: string[];
  color?: string;
  emoji?: string;
  onFavoriteToggle?: (taskTitle: string) => void;
  onViewTask?: (taskTitle: string) => void;
  isFavorite?: boolean;
}

const CategoryCard = ({
  icon: Icon,
  title,
  description,
  tasks,
  color = "bg-blue-50",
  emoji = "✨",
  onFavoriteToggle,
  onViewTask,
  isFavorite = false,
}: CategoryCardProps) => {
  // Function to get corresponding text color based on background color
  const getTextColor = (bgColor: string) => {
    // Extract the color type (e.g., "blue" from "bg-blue-50")
    const colorType = bgColor.split('-')[1];
    return `text-${colorType}-800`;
  };

  return (
    <div className={cn(
      "rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative",
      color
    )}>
      {onFavoriteToggle && (
        <button 
          className="absolute top-3 right-3 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(title);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
          />
        </button>
      )}
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
            <div className="text-xl">{emoji}</div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{title}</h3>
            <p className="text-xs text-gray-600 line-clamp-1">{description}</p>
          </div>
        </div>
        
        <div className="mt-4 space-y-3 flex-grow">
          {tasks.map((task, i) => {
            // This will ensure we extract just the emoji and text, removing any numbers
            const taskContent = task.trim();
            
            return (
              <div
                key={i}
                className="bg-white py-3 px-4 rounded-lg shadow-sm text-left relative group hover:bg-gray-50 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onViewTask) {
                    // Get task name without emoji
                    const taskName = taskContent.replace(/^[\p{Emoji}\s]+/u, '').trim();
                    onViewTask(taskName);
                  }
                }}
              >
                <span className="text-sm text-gray-700 line-clamp-2">{taskContent}</span>
                {onViewTask && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 flex items-center justify-end transition-opacity duration-200 opacity-0 group-hover:opacity-100 rounded-lg">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className={cn("mr-2 hover:bg-opacity-10", getTextColor(color))}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onViewTask) {
                          // Get task name without emoji
                          const taskName = taskContent.replace(/^[\p{Emoji}\s]+/u, '').trim();
                          onViewTask(taskName);
                        }
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" /> View
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
