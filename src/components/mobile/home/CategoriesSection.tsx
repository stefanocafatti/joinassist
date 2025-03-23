
import React from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  title: string;
  color: string;
}

interface CategoriesSectionProps {
  additionalTasks: Task[];
}

const CategoriesSection = ({ additionalTasks }: CategoriesSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <h2 className="text-lg font-semibold text-gray-900">Looking for something else?</h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {additionalTasks.map((task, index) => (
          <div 
            key={index}
            className={`${task.color} rounded-xl flex flex-col items-center justify-center py-3 px-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105`}
            onClick={() => navigate(`/mobile/task/${task.title.toLowerCase()}`)}
          >
            <span className="text-sm font-medium text-gray-800 text-center whitespace-nowrap">
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
