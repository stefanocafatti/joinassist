
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  pointsEarned?: number;
}

interface RecommendedTasksSectionProps {
  tasks: Task[];
  favoriteTaskIds: string[];
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
}

const RecommendedTasksSection: React.FC<RecommendedTasksSectionProps> = ({ 
  tasks, 
  favoriteTaskIds, 
  onFavoriteToggle, 
  onBookNow 
}) => {
  // Get tag color based on category
  const getCategoryColor = (category: string) => {
    const categoryColorMap: {[key: string]: string} = {
      "Cleaning": "bg-sky-100 text-sky-800",
      "Transportation": "bg-indigo-100 text-indigo-800",
      "Transportation and Moving": "bg-indigo-100 text-indigo-800",
      "Delivery": "bg-teal-100 text-teal-800",
      "Assembly": "bg-purple-100 text-purple-800",
      "Academic & Professional Help": "bg-yellow-100 text-yellow-800",
      "Digital Services": "bg-red-100 text-red-800",
      "Fitness and Wellness": "bg-emerald-100 text-emerald-800",
      "Event and Hospitality": "bg-pink-100 text-pink-800",
      "Special Tasks": "bg-orange-100 text-orange-800",
      "For Brands": "bg-blue-100 text-blue-800",
      "Pets": "bg-amber-100 text-amber-800",
      "Home": "bg-lime-100 text-lime-800",
    };
    
    return categoryColorMap[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recommended For You</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
            onClick={() => onBookNow(task.title)}
          >
            <div className="relative">
              <div 
                className="h-40 bg-cover bg-center" 
                style={{ backgroundImage: `url(${task.image})` }}
              />
              <button 
                className="absolute top-3 right-3"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteToggle(task.title);
                }}
              >
                <Heart 
                  className={`h-5 w-5 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                />
              </button>
              {task.pointsEarned && (
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-assist-blue/80 text-white flex items-center">
                    <Coins className="h-3 w-3 mr-1" />
                    Earn {task.pointsEarned} points
                  </Badge>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <Badge className={cn(getCategoryColor(task.category), "hover:opacity-90")}>{task.category}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>
              <div className="flex justify-end items-center">
                <Button 
                  size="sm" 
                  className="bg-assist-blue hover:bg-assist-blue/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookNow(task.title);
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" /> View Task
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="link" className="text-assist-blue">
          View all recommendations →
        </Button>
      </div>
    </section>
  );
};

export default RecommendedTasksSection;
