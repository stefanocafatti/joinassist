
import React from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  icon: string;
  color: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <h2 className="text-lg font-semibold text-gray-900">Popular Categories</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {categories.map((category, index) => (
          <div 
            key={index}
            className={`${category.color} rounded-xl flex flex-col items-center justify-center py-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105`}
            onClick={() => navigate(`/mobile/category/${category.name.toLowerCase()}`)}
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-1.5 shadow-sm">
              <span className="text-lg">{category.icon}</span>
            </div>
            <span className="text-xs font-medium text-gray-800 text-center px-1">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
