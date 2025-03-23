
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TaskDetailView from "@/components/ui/TaskDetailView";

// Define the TASK_IMAGE constant
const TASK_IMAGE = "/lovable-uploads/239bf11e-868d-49c4-b2cf-e3fdd3bc7c20.png";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  price?: string;
}

interface PopularTasksSectionProps {
  popularTasks: Task[];
}

const PopularTasksSection = ({ popularTasks }: PopularTasksSectionProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
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

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  const handleCloseTaskDetail = () => {
    setShowTaskDetail(false);
  };

  const handleCreateCustomTask = () => {
    setShowCustomTaskForm(true);
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
      </div>
      <div className="grid grid-cols-2 gap-3">
        {getDisplayedTasks().map((task, index) => (
          <div 
            key={index} 
            className={`group bg-white rounded-lg border ${getCategoryBorder(task.category)} shadow-sm hover:shadow-md transition-all overflow-hidden transform hover:scale-[1.01]`}
            onClick={() => handleTaskClick(task)}
          >
            <div className="relative">
              <div 
                className="h-28 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url(${TASK_IMAGE})`
                }}
              />
              <Badge 
                className={`absolute top-2 right-2 text-xs ${getCategoryTextColor(task.category)} ${getCategoryBgColor(task.category)} hover:${getCategoryBgColor(task.category)}`}
              >
                {task.category}
              </Badge>
            </div>
            <div className="p-2.5">
              <h3 className="font-medium text-sm text-gray-900 truncate flex items-center">
                {task.title}
              </h3>
            </div>
          </div>
        ))}
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
            price: selectedTask.price,
            image: TASK_IMAGE
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
