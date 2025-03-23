
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TaskDetailView from "@/components/ui/TaskDetailView";

interface PopularTask {
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  image?: string;
}

interface PopularTasksSectionProps {
  popularTasks: PopularTask[];
}

const PopularTasksSection = ({ popularTasks }: PopularTasksSectionProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<PopularTask | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [showCustomTaskForm, setShowCustomTaskForm] = useState(false);

  const categories = Array.from(new Set(popularTasks.map(task => task.category)));

  const getDisplayedTasks = () => {
    return selectedCategory
      ? popularTasks.filter(task => task.category === selectedCategory)
      : popularTasks;
  };

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleTaskClick = (task: PopularTask) => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  const handleCloseTaskDetail = () => {
    setShowTaskDetail(false);
  };

  const handleBookTask = (
    taskTitle: string, 
    date: Date, 
    time: string, 
    priceType?: string, 
    price?: number,
    location?: string,
    additionalInfo?: string
  ) => {
    console.log("Task booked:", {
      taskTitle,
      date,
      time,
      priceType,
      price,
      location,
      additionalInfo
    });
    setShowTaskDetail(false);
    setShowCustomTaskForm(false);
  };

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'cleaning':
        return {
          border: 'border-soft-blue',
          text: 'text-blue-600',
          bg: 'bg-blue-100'
        };
      case 'furniture assembly':
        return {
          border: 'border-soft-orange',
          text: 'text-orange-600',
          bg: 'bg-orange-100'
        };
      case 'home services':
        return {
          border: 'border-soft-green',
          text: 'text-green-600',
          bg: 'bg-green-100'
        };
      case 'moving':
        return {
          border: 'border-soft-yellow',
          text: 'text-amber-600',
          bg: 'bg-amber-100'
        };
      case 'academic':
        return {
          border: 'border-soft-purple',
          text: 'text-purple-600',
          bg: 'bg-purple-100'
        };
      case 'errands':
        return {
          border: 'border-soft-pink',
          text: 'text-pink-600',
          bg: 'bg-pink-100'
        };
      case 'tech':
        return {
          border: 'border-soft-blue',
          text: 'text-cyan-600',
          bg: 'bg-cyan-100'
        };
      default:
        return {
          border: 'border-soft-orange',
          text: 'text-orange-600',
          bg: 'bg-orange-100'
        };
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
            {categories.map((category, index) => {
              const colors = getCategoryColor(category);
              return (
                <CarouselItem key={index} className="pl-2 basis-auto">
                  <div 
                    className={`px-4 py-2 rounded-full border shadow-sm cursor-pointer whitespace-nowrap ${
                      selectedCategory === category 
                        ? `${colors.bg} ${colors.text} font-medium` 
                        : 'bg-white text-gray-700'
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <span className="text-xs">{category}</span>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Browse Tasks</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {getDisplayedTasks().map((task, index) => {
          const colors = getCategoryColor(task.category);
          return (
            <div 
              key={index} 
              className={`group bg-white rounded-lg border ${colors.border} shadow-sm hover:shadow-md transition-all overflow-hidden transform hover:scale-[1.01]`}
              onClick={() => handleTaskClick(task)}
            >
              <div className="relative">
                <div 
                  className="h-28 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: `url(${task.image})`
                  }}
                />
                <Badge 
                  className={`absolute top-2 right-2 text-xs ${colors.text} ${colors.bg} hover:${colors.bg}`}
                >
                  {task.category}
                </Badge>
              </div>
              <div className="p-3 flex items-center justify-center">
                <h3 className="font-medium text-sm text-gray-900 text-center line-clamp-2">
                  {task.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedTask && (
        <TaskDetailView 
          isOpen={showTaskDetail}
          onClose={handleCloseTaskDetail}
          onTaskBooked={handleBookTask}
          task={{
            title: selectedTask.title,
            description: selectedTask.description,
            category: selectedTask.category,
            location: selectedTask.location,
            image: selectedTask.image
          }}
        />
      )}

      <TaskDetailView 
        isOpen={showCustomTaskForm}
        onClose={() => setShowCustomTaskForm(false)}
        onTaskBooked={handleBookTask}
        isCustomTask={true}
      />
    </section>
  );
};

export default PopularTasksSection;
