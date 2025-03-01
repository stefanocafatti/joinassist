
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tasks: string[];
  color?: string;
}

const CategoryCard = ({ 
  icon: Icon, 
  title, 
  description, 
  tasks, 
  color = "bg-assist-blue/10"
}: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group rounded-2xl bg-white shadow-card overflow-hidden hover-scale transition-all cursor-pointer"
      onClick={() => console.log(`Category clicked: ${title}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View ${title} tasks`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          console.log(`Category clicked via keyboard: ${title}`);
        }
      }}
    >
      <div className="p-6 relative">
        {/* Playful elements for interaction */}
        <div className={`absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 rounded-full transform transition-all duration-300 
          ${isHovered ? "scale-100 opacity-10" : "scale-0 opacity-0"} ${color.replace('/10', '/5')}`} />
        
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative overflow-hidden`}>
          <Icon className="text-assist-blue" size={28} />
          <div className={`absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity`} />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-assist-blue transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-2">
          {tasks.slice(0, 3).map((task, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-assist-blue/70 group-hover:bg-assist-blue transition-colors" />
              <span className="text-gray-700">{task}</span>
            </div>
          ))}
          
          {tasks.length > 3 && (
            <div className="text-assist-blue font-medium text-sm mt-2 task-link group-hover:underline">
              +{tasks.length - 3} more tasks
            </div>
          )}
        </div>
        
        <div className={`mt-4 py-2 px-4 rounded-full text-center text-assist-blue bg-assist-blue/5 font-medium text-sm 
          transform transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          View all tasks
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
