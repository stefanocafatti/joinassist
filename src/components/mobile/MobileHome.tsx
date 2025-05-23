
import React, { useState } from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import HomeHeader from "./home/HomeHeader";
import PopularTasksSection from "./home/PopularTasksSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import TaskDetailView from "@/components/ui/TaskDetailView";
import { useToast } from "@/hooks/use-toast";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image?: string;
}

const MobileHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  const commonTasks = [
    "Cleaning",
    "Furniture Assembly", 
    "Moving Help",
    "Delivery",
    "Heavy Lifting",
    "Handyman"
  ];

  const popularTasks = [
    {
      title: "Clean my apartment",
      description: "Professional cleaning services by verified students",
      price: "From $25/hr",
      category: "Cleaning",
      location: "Columbia University",
      image: "/lovable-uploads/84373410-0ca0-44aa-bce4-fecda1465ffb.png"
    },
    {
      title: "Wash my car",
      description: "Get your car washed by students for an affordable price",
      price: "From $20/hr",
      category: "Cleaning",
      location: "NYU Area",
      image: "/lovable-uploads/c9d970a2-7da1-4c02-997f-aa30ef2e5bba.png"
    },
    {
      title: "Do my laundry", 
      description: "Assistance with moving and packing your belongings",
      price: "From $30/hr",
      category: "Home Services",
      location: "Midtown",
      image: "/lovable-uploads/bd95bdf7-c140-465b-8e12-3a21d5d46a94.png"
    },
    {
      title: "Organize my closet",
      description: "One-on-one math tutoring from STEM students",
      price: "From $25/hr",
      category: "Home Services",
      location: "Brooklyn",
      image: "/lovable-uploads/049d1420-586e-4794-b6e1-5c14cfeb328e.png"
    },
    {
      title: "Build my IKEA desk", 
      description: "Thorough cleaning service for your entire home",
      price: "From $40/hr",
      category: "Furniture Assembly",
      location: "Upper East Side",
      image: "/lovable-uploads/eb78ee8e-c334-4102-b507-3e323c2fc98c.png"
    },
    {
      title: "Proofreading",
      description: "Get your essays and papers proofread by English majors",
      price: "From $15/hr",
      category: "Academic",
      location: "Harlem",
      image: "/lovable-uploads/603a2dee-f790-49b1-aade-54b5318f754a.png"
    },
    {
      title: "Food Delivery",
      description: "Get food delivered from your favorite restaurants",
      price: "From $15/hr",
      category: "Errands",
      location: "Lower East Side",
      image: "/lovable-uploads/c63ac0bf-b196-42d2-8004-012ba59ad57e.png"
    },
    {
      title: "Tech Support",
      description: "Troubleshooting and tech setup by IT students",
      price: "From $20/hr",
      category: "Tech",
      location: "Chelsea",
      image: "/lovable-uploads/bab65021-5d30-4495-bcd8-b77a329626c7.png"
    },
    {
      title: "Grocery Delivery",
      description: "Student runners for your grocery shopping needs",
      price: "From $15/hr",
      category: "Errands",
      location: "Financial District",
      image: "/lovable-uploads/b1aee96b-9a26-4fd9-9872-57f40cbe16d7.png"
    },
    {
      title: "Website Building",
      description: "Basic website creation by CS students",
      price: "From $30/hr",
      category: "Tech",
      location: "Upper West Side",
      image: "/lovable-uploads/bab65021-5d30-4495-bcd8-b77a329626c7.png"
    },
    {
      title: "Dorm Room Setup",
      description: "Help setting up your dorm room efficiently",
      price: "From $20/hr",
      category: "Moving",
      location: "Columbia University",
      image: "/lovable-uploads/049d1420-586e-4794-b6e1-5c14cfeb328e.png"
    },
    {
      title: "Language Tutoring",
      description: "Learn a new language from native-speaking students",
      price: "From $25/hr",
      category: "Academic",
      location: "Greenwich Village",
      image: "/lovable-uploads/603a2dee-f790-49b1-aade-54b5318f754a.png"
    }
  ];

  const handleTaskClick = (task: string) => {
    console.log(`Selected task: ${task}`);
    setSelectedTask({
      title: task,
      description: `Professional ${task.toLowerCase()} service provided by verified students`,
      category: "Services",
      location: "Your location"
    });
    setShowTaskDetail(true);
  };

  const handleSearchTaskSelect = (task: Task) => {
    console.log("Search task selected:", task);
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  const handleRequestTask = () => {
    console.log("Request a custom task");
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
    toast({
      title: "Task Booked!",
      description: `Your ${taskTitle} has been scheduled for ${date.toLocaleDateString()} at ${time}`,
    });
    setShowTaskDetail(false);
  };

  return (
    <>
      <MobileLayout showHeader={false} contentClassName="pb-20 pt-0">
        <div className="space-y-3">
          <HomeHeader 
            userName="Sarah" 
            onTaskSelect={handleSearchTaskSelect}
          />
          
          <PopularTasksSection popularTasks={popularTasks} />
          
          <div className="my-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Looking for something else?</h2>
            <div className="grid grid-cols-2 gap-3">
              {commonTasks.map((task, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-12 bg-white text-assist-blue border border-gray-200 shadow-sm hover:bg-gray-50 font-medium rounded-full"
                  onClick={() => handleTaskClick(task)}
                >
                  {task}
                </Button>
              ))}
            </div>
            
            <div className="mt-3">
              <Button
                className="w-full h-12 bg-assist-blue text-white border border-assist-blue shadow-sm hover:bg-assist-blue/90 font-medium rounded-full flex items-center justify-center"
                onClick={handleRequestTask}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Request a Task
              </Button>
            </div>
          </div>
        </div>
      </MobileLayout>
      <BottomNavigation />

      {selectedTask && (
        <TaskDetailView 
          isOpen={showTaskDetail}
          onClose={handleCloseTaskDetail}
          onTaskBooked={handleBookTask}
          task={selectedTask}
        />
      )}
    </>
  );
};

export default MobileHome;
