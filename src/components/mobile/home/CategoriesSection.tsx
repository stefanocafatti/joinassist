
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskDetailView from "@/components/ui/TaskDetailView";

interface CategoriesSectionProps {
  additionalTasks: { title: string; color?: string }[];
}

const CategoriesSection = ({ additionalTasks }: CategoriesSectionProps) => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<{ title: string } | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  const handleCreateCustomTask = () => {
    navigate("/mobile/new-task");
  };

  const handleTaskClick = (task: { title: string }) => {
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

  // List of tasks with their background colors and emoji icons
  const taskItems = [
    { title: "Help Moving", bgColor: "bg-blue-50", emoji: "📦" },
    { title: "Furniture Assembly", bgColor: "bg-green-50", emoji: "🪑" },
    { title: "General Mounting", bgColor: "bg-yellow-50", emoji: "🔨" },
    { title: "Cleaning", bgColor: "bg-purple-50", emoji: "🧹" },
    { title: "TV Mounting", bgColor: "bg-pink-50", emoji: "📺" },
    { title: "Heavy Lifting", bgColor: "bg-orange-50", emoji: "💪" },
    { title: "Academic Tutoring", bgColor: "bg-blue-50", emoji: "📚" },
    { title: "Laundry Help", bgColor: "bg-green-50", emoji: "👕" },
    { title: "Grocery Shopping", bgColor: "bg-yellow-50", emoji: "🛒" },
    { title: "Pet Sitting", bgColor: "bg-purple-50", emoji: "🐕" },
    { title: "House Cleaning", bgColor: "bg-pink-50", emoji: "✨" },
    { title: "Car Wash", bgColor: "bg-orange-50", emoji: "🚗" },
    { title: "Yard Work", bgColor: "bg-blue-50", emoji: "🌿" },
    { title: "Meal Preparation", bgColor: "bg-green-50", emoji: "🍳" },
    { title: "Tech Support", bgColor: "bg-yellow-50", emoji: "💻" },
    { title: "Plant Watering", bgColor: "bg-purple-50", emoji: "🪴" }
  ];

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <h2 className="text-lg font-semibold text-gray-900">All Services</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {taskItems.map((task, index) => (
          <div 
            key={index}
            className={`${task.bgColor} rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-3`}
            onClick={() => handleTaskClick(task)}
          >
            <div className="text-2xl">{task.emoji}</div>
            <span className="text-sm font-medium text-gray-900">{task.title}</span>
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
            category: "Services",
            location: "Your location",
            image: undefined
          }}
        />
      )}
    </section>
  );
};

export default CategoriesSection;
