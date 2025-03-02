
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
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Icon size={26} className="text-gray-700" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{title}</h3>
            <p className="text-xs text-gray-600 line-clamp-1">{description}</p>
          </div>
        </div>
        
        <div className="mt-4 space-y-3 flex-grow">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="bg-white py-3 px-4 rounded-lg shadow-sm text-left"
            >
              <span className="text-sm text-gray-700 line-clamp-2">{task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
