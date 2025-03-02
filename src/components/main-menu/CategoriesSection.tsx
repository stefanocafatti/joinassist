
import React, { useState } from "react";
import TaskCategories from "../home/TaskCategories";
import { Button } from "@/components/ui/button";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  pointsEarned?: number;
}

// Mock tasks data for additional listings when "Load More" is clicked
const additionalTasks: Task[] = [
  {
    title: "Clean my Windows",
    description: "Help with cleaning exterior windows",
    category: "Cleaning",
    location: "Westwood",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Grocery Delivery",
    description: "Deliver groceries from Trader Joe's",
    category: "Delivery",
    location: "Santa Monica",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Moving Assistance",
    description: "Help moving furniture to new apartment",
    category: "Transportation",
    location: "UCLA Campus",
    image: "https://images.unsplash.com/photo-1600518464441-9306b008de8d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Assemble IKEA Furniture",
    description: "Need help putting together a desk and chair",
    category: "Assembly",
    location: "Brentwood",
    image: "https://images.unsplash.com/photo-1595428774863-a38feabce63f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Teach me Math",
    description: "Need tutoring for Calculus",
    category: "Academic Help",
    location: "UCLA Library",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Video Editing",
    description: "Edit a 5-minute YouTube video",
    category: "Digital Services",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1574717024453-354056afd6fc?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Meal Prep",
    description: "Prepare healthy meals for the week",
    category: "Fitness & Wellness",
    location: "Your Kitchen",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Event Setup",
    description: "Help setting up for a birthday party",
    category: "Event & Hospitality",
    location: "Venice Beach",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Water my Plants",
    description: "Take care of houseplants while I'm away",
    category: "Special Tasks",
    location: "Marina Del Rey",
    image: "https://images.unsplash.com/photo-1623411235843-9ee9f41856c4?q=80&w=1000&auto=format&fit=crop"
  }
];

interface CategoriesSectionProps {
  showAllTasks?: boolean;
  onRequestTask?: () => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ 
  showAllTasks = false,
  onRequestTask 
}) => {
  const [showMoreTasks, setShowMoreTasks] = useState(showAllTasks);
  
  const handleLoadMoreTasks = () => {
    setShowMoreTasks(true);
  };
  
  const renderTaskCard = (task: Task, index: number) => (
    <div 
      key={index} 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="relative">
        <div 
          className="h-40 bg-cover bg-center" 
          style={{ backgroundImage: `url(${task.image})` }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {task.category}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{task.location}</span>
          <Button 
            size="sm" 
            className="bg-assist-blue hover:bg-assist-blue/90"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      <TaskCategories showAllTasks={false} />
      
      {showMoreTasks && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">More Available Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {additionalTasks.map(renderTaskCard)}
          </div>
        </div>
      )}
      
      {!showMoreTasks && (
        <div className="mt-8 text-center">
          <Button 
            onClick={handleLoadMoreTasks}
            className="bg-assist-blue hover:bg-assist-blue/90 text-white rounded-full px-8 py-2"
          >
            Load More Tasks
          </Button>
        </div>
      )}
      
      <div className="mt-10 bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Didn't find what you were looking for?</h3>
          <p className="text-gray-600 mb-6">
            We can help you with custom tasks that aren't listed above.
          </p>
          <Button 
            onClick={onRequestTask}
            className="bg-assist-blue hover:bg-assist-blue/90"
          >
            Request a Task
          </Button>
        </div>
      </div>
    </>
  );
};

export default CategoriesSection;
