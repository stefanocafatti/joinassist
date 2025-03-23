
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskDetailView from "@/components/ui/TaskDetailView";

interface Task {
  title: string;
  color?: string; // Making this optional since we're using a standard style now
}

interface CategoriesSectionProps {
  additionalTasks: Task[];
}

const CategoriesSection = ({ additionalTasks }: CategoriesSectionProps) => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  const handleCreateCustomTask = () => {
    // This function will open the custom task form
    navigate("/mobile/new-task");
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
    setShowTaskDetail(false);
  };

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <h2 className="text-lg font-semibold text-gray-900">Looking for something else?</h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {additionalTasks.map((task, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl flex flex-col items-center justify-center py-3 px-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105 border border-gray-100"
            onClick={() => handleTaskClick(task)}
          >
            <span className="text-sm font-medium text-assist-blue text-center whitespace-nowrap">
              {task.title}
            </span>
          </div>
        ))}
      </div>
      
      {/* Request Custom Task button */}
      <Button 
        className="w-full bg-assist-blue hover:bg-assist-blue/90 text-white rounded-2xl mt-4 py-3 px-4 flex items-center justify-center gap-2"
        onClick={handleCreateCustomTask}
      >
        <Plus className="h-5 w-5" />
        <span className="text-sm font-medium">Request Custom Task</span>
      </Button>

      {selectedTask && (
        <TaskDetailView 
          isOpen={showTaskDetail}
          onClose={handleCloseTaskDetail}
          onTaskBooked={handleBookTask}
          task={{
            title: selectedTask.title,
            description: `Professional ${selectedTask.title.toLowerCase()} service provided by local students`,
            category: "Academic Help",
            location: "Your location",
            image: undefined
          }}
        />
      )}
    </section>
  );
};

export default CategoriesSection;
