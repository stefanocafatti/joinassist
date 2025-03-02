
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tasks: string[];
  color?: string;
}

const CategoryCard = ({
  icon: Icon,
  title,
  description,
  tasks,
  color = "bg-blue-50",
}: CategoryCardProps) => {
  return (
    <div className={cn(
      "rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1",
      color
    )}>
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Icon size={16} className="text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{title}</h3>
            <p className="text-xs text-gray-600 line-clamp-1">{description}</p>
          </div>
        </div>
        
        <div className="mt-2 space-y-1.5 flex-grow">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="bg-white p-2 rounded-lg shadow-sm flex items-center text-left"
            >
              <span className="text-xs text-gray-700 line-clamp-1">{task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
