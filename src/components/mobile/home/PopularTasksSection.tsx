
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronRight } from "lucide-react";
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

  return (
    <section className="mb-1"> {/* Reduced bottom margin */}
      <div className="flex items-center justify-between mb-2"> {/* Reduced margin */}
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
          <Star size={18} className="text-amber-500" />
          Popular Tasks
        </h2>
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
      <div className="space-y-2"> {/* Reduced gap between task cards */}
        {popularTasks.map((task, index) => (
          <div 
            key={index} 
            className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all overflow-hidden"
            onClick={() => navigate(`/mobile/new-task?template=${task.title.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <div className="flex items-start">
              <div className={`bg-soft-${task.category.toLowerCase() === 'cleaning' ? 'blue' : task.category.toLowerCase() === 'delivery' ? 'green' : 'yellow'} p-3 flex items-center justify-center`}> {/* Reduced padding */}
                <span className="text-xl">{task.category === 'Cleaning' ? '🧹' : task.category === 'Delivery' ? '🚚' : '📚'}</span>
              </div>
              <div className="flex-1 p-3"> {/* Reduced padding */}
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-xs text-gray-500 mb-1">{task.description}</p> {/* Reduced margin */}
                <div className="flex items-center text-sm">
                  <span className={`bg-${task.category.toLowerCase() === 'cleaning' ? 'assist-blue' : task.category.toLowerCase() === 'delivery' ? 'green-500' : 'amber-500'}/10 text-${task.category.toLowerCase() === 'cleaning' ? 'assist-blue' : task.category.toLowerCase() === 'delivery' ? 'green-600' : 'amber-600'} px-2 py-0.5 rounded text-xs font-medium`}>{task.price}</span>
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
