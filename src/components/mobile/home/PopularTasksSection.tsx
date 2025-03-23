
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronRight, Sparkles, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  // Function to get a gradient based on category
  const getCategoryGradient = (category: string) => {
    switch(category.toLowerCase()) {
      case 'cleaning':
        return 'from-soft-blue to-assist-blue/20';
      case 'furniture':
        return 'from-soft-green to-green-300/20';
      case 'moving':
        return 'from-soft-yellow to-amber-300/20';
      case 'mounting':
        return 'from-soft-purple to-purple-300/20';
      default:
        return 'from-soft-orange to-orange-300/20';
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

  // Function to get an icon based on category
  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'cleaning':
        return '🧹';
      case 'furniture':
        return '🪑';
      case 'moving':
        return '📦';
      case 'mounting':
        return '🔨';
      default:
        return '🛠️';
    }
  };

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <Star size={18} className="text-amber-500" />
          <h2 className="text-lg font-semibold text-gray-900">Browse Tasks</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-assist-blue text-sm p-0 hover:bg-transparent" 
          onClick={() => navigate('/mobile/popular')}
        >
          View All
          <ChevronRight size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {popularTasks.map((task, index) => (
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
              <Badge className={`absolute top-2 right-2 text-xs ${getCategoryTextColor(task.category)} bg-white`}>
                {task.category}
              </Badge>
            </div>
            <div className="p-2.5">
              <h3 className="font-medium text-sm text-gray-900 truncate flex items-center">
                {task.title}
                {index === 0 && (
                  <Sparkles size={12} className="ml-1 text-amber-500" />
                )}
              </h3>
              <div className="flex items-center text-xs text-gray-500 mt-1 mb-1">
                <MapPin size={12} className="mr-1" />
                <span className="truncate">{task.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign size={12} className="text-green-600" />
                  <span className="text-xs font-medium text-green-600">{task.price.replace('From ', '')}</span>
                </div>
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
