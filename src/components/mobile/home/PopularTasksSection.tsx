
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface PopularTask {
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  image: string;
}

interface PopularTasksSectionProps {
  popularTasks: PopularTask[];
}

const PopularTasksSection = ({ popularTasks }: PopularTasksSectionProps) => {
  const navigate = useNavigate();
  const [viewAll, setViewAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const tasksPerPage = 4;

  // Extract unique categories from tasks
  const categories = Array.from(new Set(popularTasks.map(task => task.category)));

  // Get filtered tasks based on selected category and view mode
  const getDisplayedTasks = () => {
    // First apply category filter (if any)
    const filteredTasks = selectedCategory
      ? popularTasks.filter(task => task.category === selectedCategory)
      : popularTasks;
    
    // When "All" category is selected, show all tasks
    // When specific category is selected but not viewing all, apply page limit
    if (selectedCategory !== null && !viewAll) {
      return filteredTasks.slice(0, tasksPerPage);
    }
    
    // When viewAll is true, show all filtered tasks
    return filteredTasks;
  };

  const handleViewAllToggle = () => {
    setViewAll(!viewAll);
  };

  const handleCategorySelect = (category: string) => {
    // If we click the already selected category, clear the filter
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  // Function to get a border color based on category
  const getCategoryBorder = (category: string) => {
    switch(category.toLowerCase()) {
      case 'cleaning':
        return 'border-soft-blue';
      case 'furniture':
        return 'border-soft-green';
      case 'moving':
        return 'border-soft-yellow';
      case 'mounting':
        return 'border-soft-purple';
      default:
        return 'border-soft-orange';
    }
  };

  // Function to get a text color based on category
  const getCategoryTextColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'cleaning':
        return 'text-blue-600';
      case 'furniture':
        return 'text-green-600';
      case 'moving':
        return 'text-amber-600';
      case 'mounting':
        return 'text-purple-600';
      default:
        return 'text-orange-600';
    }
  };

  // Function to get background color for category buttons
  const getCategoryBgColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'cleaning':
        return 'bg-blue-100';
      case 'furniture':
        return 'bg-green-100';
      case 'moving':
        return 'bg-amber-100';
      case 'mounting':
        return 'bg-purple-100';
      default:
        return 'bg-orange-100';
    }
  };

  // Function to get background and text color for category buttons
  const getCategoryButtonColor = (category: string) => {
    const isSelected = selectedCategory === category;
    
    switch(category.toLowerCase()) {
      case 'cleaning':
        return isSelected ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700';
      case 'furniture':
        return isSelected ? 'bg-green-100 text-green-700' : 'bg-white text-gray-700';
      case 'moving':
        return isSelected ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-700';
      case 'mounting':
        return isSelected ? 'bg-purple-100 text-purple-700' : 'bg-white text-gray-700';
      default:
        return isSelected ? 'bg-orange-100 text-orange-700' : 'bg-white text-gray-700';
    }
  };

  return (
    <section className="mb-1">
      <div className="mb-3 overflow-x-auto">
        <Carousel className="w-full" opts={{ align: "start", loop: false }}>
          <CarouselContent className="-ml-2">
            <CarouselItem className="pl-2 basis-auto">
              <div 
                className={`px-4 py-2 rounded-full border shadow-sm cursor-pointer ${selectedCategory === null ? 'bg-gray-100 text-gray-800 font-medium' : 'bg-white text-gray-700'}`}
                onClick={() => setSelectedCategory(null)}
              >
                <span className="text-xs whitespace-nowrap">All</span>
              </div>
            </CarouselItem>
            {categories.map((category, index) => (
              <CarouselItem key={index} className="pl-2 basis-auto">
                <div 
                  className={`px-4 py-2 rounded-full border shadow-sm cursor-pointer whitespace-nowrap ${
                    selectedCategory === category 
                      ? `${getCategoryBgColor(category)} ${getCategoryTextColor(category)} font-medium` 
                      : 'bg-white text-gray-700'
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <span className="text-xs">{category}</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <h2 className="text-lg font-semibold text-gray-900">Browse Tasks</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-assist-blue text-sm p-0 hover:bg-transparent" 
          onClick={handleViewAllToggle}
        >
          {viewAll ? "Show Less" : "View All"}
          <ChevronRight size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {getDisplayedTasks().map((task, index) => (
          <div 
            key={index} 
            className={`group bg-white rounded-lg border ${getCategoryBorder(task.category)} shadow-sm hover:shadow-md transition-all overflow-hidden transform hover:scale-[1.01]`}
            onClick={() => navigate(`/mobile/new-task?template=${task.title.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <div className="relative">
              <div 
                className="h-28 bg-cover bg-center" 
                style={{ backgroundImage: `url(${task.image})` }}
              />
              <Badge className={`absolute top-2 right-2 text-xs ${getCategoryTextColor(task.category)} ${getCategoryBgColor(task.category)}`}>
                {task.category}
              </Badge>
            </div>
            <div className="p-2.5">
              <h3 className="font-medium text-sm text-gray-900 truncate flex items-center">
                {task.title}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-medium text-green-600">{task.price.replace('From ', '')}</span>
                <ChevronRight size={14} className="text-gray-400 group-hover:text-assist-blue transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularTasksSection;
