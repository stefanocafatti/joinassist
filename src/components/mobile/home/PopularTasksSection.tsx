
import React from "react";
import { ChevronRight } from "lucide-react";

interface Task {
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  image: string;
}

interface PopularTasksSectionProps {
  popularTasks: Task[];
  onTaskClick: (task: Task) => void;
}

const PopularTasksSection = ({ popularTasks, onTaskClick }: PopularTasksSectionProps) => {
  return (
    <div className="my-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Tasks</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2 w-max">
          {popularTasks.map((task, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl w-64 flex-shrink-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              onClick={() => onTaskClick(task)}
            >
              <div className="h-32 overflow-hidden rounded-t-xl">
                <img src={task.image} alt={task.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 h-10">{task.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{task.location}</span>
                  <span className="text-xs font-medium text-assist-blue">{task.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTasksSection;
