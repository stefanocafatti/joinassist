
import React from "react";
import { useNavigate } from "react-router-dom";

interface TaskItem {
  name: string;
  icon: string;
}

interface CategoriesSectionProps {
  categories: TaskItem[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <h2 className="text-lg font-semibold text-gray-900">Looking for something else?</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {categories.map((task, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl flex flex-col items-center justify-center py-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105 border border-blue-400"
            onClick={() => navigate(`/mobile/new-task?task=${task.name.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-1.5 shadow-sm border border-blue-300">
              <span className="text-lg">{task.icon}</span>
            </div>
            <span className="text-xs font-medium text-blue-600 text-center px-1">{task.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
