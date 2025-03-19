
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PopularTask {
  title: string;
  description: string;
  price: string;
  category: string;
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
      default:
        return 'from-soft-purple to-purple-300/20';
    }
  };

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Star size={18} className="text-amber-500" />
          <h2 className="text-lg font-semibold text-gray-900">Popular Tasks</h2>
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
      <div className="space-y-2">
        {popularTasks.map((task, index) => (
          <div 
            key={index} 
            className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden transform hover:scale-[1.01]"
            onClick={() => navigate(`/mobile/new-task?template=${task.title.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <div className="flex items-stretch">
              <div className={`bg-gradient-to-br ${getCategoryGradient(task.category)} flex items-center justify-center h-auto min-w-[48px]`}>
                <span className="text-xl">{task.category === 'Cleaning' ? '🧹' : task.category === 'Delivery' ? '🚚' : '📚'}</span>
              </div>
              <div className="flex-1 p-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  {task.title}
                  {/* Removed Sparkles icon from next to the first task title */}
                </h3>
                <p className="text-xs text-gray-500 mb-1">{task.description}</p>
                <div className="flex items-center text-sm">
                  <span className={`bg-gradient-to-r ${getCategoryGradient(task.category)} text-${task.category.toLowerCase() === 'cleaning' ? 'assist-blue' : task.category.toLowerCase() === 'delivery' ? 'green-600' : 'amber-600'} px-2 py-0.5 rounded text-xs font-medium`}>{task.price}</span>
                  <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-assist-blue transition-colors" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularTasksSection;
