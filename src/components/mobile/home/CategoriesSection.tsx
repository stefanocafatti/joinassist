
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="rounded-xl mb-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Popular Categories</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-assist-blue text-sm p-0 hover:bg-transparent" 
          onClick={() => navigate('/mobile/categories')}
        >
          View All
          <ChevronRight size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category, index) => (
          <div 
            key={index}
            className={`${category.color} rounded-xl flex flex-col items-center justify-center py-4 shadow-sm hover:shadow transition-all duration-200 cursor-pointer`}
            onClick={() => navigate(`/mobile/category/${category.name.toLowerCase()}`)}
          >
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
              <span className="text-xl">{category.icon}</span>
            </div>
            <span className="text-xs font-medium text-gray-800">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
