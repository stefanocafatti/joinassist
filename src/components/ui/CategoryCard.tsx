
import { LucideIcon } from "lucide-react";

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
  return (
    <div className="group rounded-2xl bg-white shadow-card overflow-hidden hover-scale transition-all">
      <div className="p-6">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="text-assist-blue" size={28} />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-2">
          {tasks.slice(0, 3).map((task, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-assist-blue/70" />
              <span className="text-gray-700">{task}</span>
            </div>
          ))}
          
          {tasks.length > 3 && (
            <div className="text-assist-blue font-medium text-sm mt-2 task-link">
              +{tasks.length - 3} more tasks
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
