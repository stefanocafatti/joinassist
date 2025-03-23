
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import TaskDetailView from "@/components/ui/TaskDetailView";

// Default image for all tasks - updated to the blue Assist image
const DEFAULT_TASK_IMAGE = "/lovable-uploads/e44adaaa-4a6d-435e-a3de-9355591817a8.png";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image?: string; // Make image optional
}

interface RecommendedTasksSectionProps {
  tasks: Task[];
  favoriteTaskIds: string[];
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
  sectionTitle?: string;
  onBrowseTasks?: () => void;
}

const RecommendedTasksSection: React.FC<RecommendedTasksSectionProps> = ({ 
  tasks, 
  favoriteTaskIds, 
  onFavoriteToggle, 
  onBookNow,
  sectionTitle = "Recommended Tasks",
  onBrowseTasks
}) => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  
  // Get tag color based on category
  const getCategoryColor = (category: string) => {
    const categoryColorMap: {[key: string]: string} = {
      "Pets": "bg-amber-100 text-amber-800",
      "Home": "bg-lime-100 text-lime-800",
      "Delivery": "bg-teal-100 text-teal-800",
      "Transportation": "bg-indigo-100 text-indigo-800",
      "Academic": "bg-yellow-100 text-yellow-800",
    };
    
    return categoryColorMap[category] || "bg-gray-100 text-gray-800";
  };

  const handleTaskClick = (task: Task) => {
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
    onBookNow(taskTitle);
    setShowTaskDetail(false);
  };

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{sectionTitle}</h2>
        {onBrowseTasks && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBrowseTasks}
            className="text-assist-blue hover:text-assist-blue/90 border-assist-blue/20 hover:border-assist-blue/30"
          >
            Browse All Tasks
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer relative"
            onClick={() => handleTaskClick(task)}
          >
            <div className="relative">
              <div 
                className="h-40 bg-cover bg-center" 
                style={{ backgroundImage: `url(${DEFAULT_TASK_IMAGE})` }}
              />
              <button 
                className="absolute top-3 right-3 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteToggle(task.title);
                }}
              >
                <Heart 
                  className={`h-5 w-5 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                />
              </button>
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
                  <span>Earn points</span>
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <Badge className={cn(getCategoryColor(task.category), "hover:opacity-90")}>{task.category}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <TaskDetailView 
          isOpen={showTaskDetail}
          onClose={handleCloseTaskDetail}
          onTaskBooked={handleBookTask}
          task={selectedTask}
        />
      )}
    </section>
  );
};

export default RecommendedTasksSection;
