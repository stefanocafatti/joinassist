
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

  // List of tasks with their images
  const taskItems = [
    { title: "Help Moving", image: "/lovable-uploads/72545c93-f781-402e-ad25-5cd509be453c.png" },
    { title: "Furniture Assembly", image: "/lovable-uploads/83abea36-642f-4147-865a-c43794680e3b.png" },
    { title: "General Mounting", image: "/lovable-uploads/36f389d4-c8c6-40a8-9cc4-2ed5306d7dd5.png" },
    { title: "Cleaning", image: "/lovable-uploads/84373410-0ca0-44aa-bce4-fecda1465ffb.png" },
    { title: "TV Mounting", image: "/lovable-uploads/36f389d4-c8c6-40a8-9cc4-2ed5306d7dd5.png" },
    { title: "Heavy Lifting", image: "/lovable-uploads/72545c93-f781-402e-ad25-5cd509be453c.png" },
    { title: "Academic Tutoring", image: "/lovable-uploads/603a2dee-f790-49b1-aade-54b5318f754a.png" },
    { title: "Laundry Help", image: "/lovable-uploads/bd95bdf7-c140-465b-8e12-3a21d5d46a94.png" },
    { title: "Grocery Shopping", image: "/lovable-uploads/b1aee96b-9a26-4fd9-9872-57f40cbe16d7.png" },
    { title: "Pet Sitting", image: "/lovable-uploads/55ae04cd-8676-4a1c-b2b3-36c7005144af.png" },
    { title: "House Cleaning", image: "/lovable-uploads/84373410-0ca0-44aa-bce4-fecda1465ffb.png" },
    { title: "Car Wash", image: "/lovable-uploads/c9d970a2-7da1-4c02-997f-aa30ef2e5bba.png" },
    { title: "Yard Work", image: "/lovable-uploads/55ae04cd-8676-4a1c-b2b3-36c7005144af.png" },
    { title: "Meal Preparation", image: "/lovable-uploads/c63ac0bf-b196-42d2-8004-012ba59ad57e.png" },
    { title: "Tech Support", image: "/lovable-uploads/bab65021-5d30-4495-bcd8-b77a329626c7.png" },
    { title: "Plant Watering", image: "/lovable-uploads/55ae04cd-8676-4a1c-b2b3-36c7005144af.png" }
  ];

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {taskItems.map((task, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border border-gray-100"
            onClick={() => handleTaskClick(task)}
          >
            <div 
              className="h-24 bg-cover bg-center" 
              style={{ backgroundImage: `url(${task.image})` }}
            />
            <div className="p-2">
              <p className="text-sm font-medium text-gray-900">{task.title}</p>
            </div>
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
