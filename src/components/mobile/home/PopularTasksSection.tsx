
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PopularTasksSectionProps {
  popularTasks: {
    title: string;
    description: string;
    price: string;
    category: string;
    location: string;
    image: string;
  }[];
  onTaskSelect?: (taskTitle: string) => void;
}

const PopularTasksSection: React.FC<PopularTasksSectionProps> = ({ 
  popularTasks,
  onTaskSelect = () => {}
}) => {
  return (
    <section className="mb-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Popular Tasks</h2>
        <Button variant="link" className="text-assist-blue p-0 h-auto">
          See All <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap pb-4" type="scroll">
        <div className="flex space-x-4 pb-2">
          {popularTasks.map((task, index) => (
            <div 
              key={index} 
              className="w-[220px] inline-block bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => onTaskSelect(task.title)}
            >
              <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${task.image})` }} />
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{task.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{task.location}</span>
                  <span className="text-xs font-medium text-assist-blue">{task.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default PopularTasksSection;
