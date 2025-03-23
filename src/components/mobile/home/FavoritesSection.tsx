
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TaskDetailView from "@/components/ui/TaskDetailView";

// Updated image path
const TASK_IMAGE = "/lovable-uploads/239bf11e-868d-49c4-b2cf-e3fdd3bc7c20.png";

interface FavoriteTask {
  title: string;
  price: string;
  image: string;
  description?: string;
  category?: string;
  location?: string;
}

interface FavoritesSectionProps {
  favoritedTasks: FavoriteTask[];
}

const FavoritesSection = ({ favoritedTasks }: FavoritesSectionProps) => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<FavoriteTask | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  const handleTaskClick = (task: FavoriteTask) => {
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
    // Close the detail view after booking
    setShowTaskDetail(false);
  };

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
          <Heart size={18} className="text-red-500" />
          Favorites
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-assist-blue text-sm p-0 hover:bg-transparent" 
          onClick={() => navigate('/mobile/favorites')}
        >
          View All
          <ChevronRight size={16} />
        </Button>
      </div>
      
      {favoritedTasks.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {favoritedTasks.map((task, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-gray-100 shadow-sm hover:shadow transition-all cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <CardContent className="p-0">
                <div 
                  className="h-28 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${TASK_IMAGE})` }}
                />
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-1">{task.title}</h3>
                  <p className="text-xs text-assist-blue font-medium">{task.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-50 rounded-lg p-6 border border-gray-100">
          <p className="text-gray-600 text-sm">No favorite tasks yet</p>
        </div>
      )}

      {selectedTask && (
        <TaskDetailView 
          isOpen={showTaskDetail}
          onClose={handleCloseTaskDetail}
          onTaskBooked={handleBookTask}
          task={{
            title: selectedTask.title,
            description: selectedTask.description || `Details for ${selectedTask.title}`,
            category: selectedTask.category || "Special Tasks",
            location: selectedTask.location || "Not specified",
            image: TASK_IMAGE
          }}
        />
      )}
    </section>
  );
};

export default FavoritesSection;
