
import React, { useState } from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Clock, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TaskStatusView from "@/components/ui/TaskStatusView";

const MobileTasks = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  // Sample data for tasks
  const scheduledTasks = [
    {
      id: "task1",
      title: "Home Cleaning",
      date: "Tomorrow, 2:00 PM",
      location: "123 Main St",
      price: "$120",
      status: "Confirmed"
    },
    {
      id: "task2",
      title: "Furniture Assembly",
      date: "Friday, 10:00 AM",
      location: "456 Elm St",
      price: "$85",
      status: "Pending"
    }
  ];

  const completedTasks = [
    {
      id: "task3",
      title: "Grocery Delivery",
      date: "Oct 15, 2023",
      location: "123 Main St",
      price: "$45",
      provider: "John D.",
      status: "Completed"
    },
    {
      id: "task4",
      title: "Dog Walking",
      date: "Oct 10, 2023",
      location: "123 Main St",
      price: "$30",
      provider: "Sarah M.",
      status: "Completed"
    }
  ];

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const renderTaskList = (tasks: any[], emptyMessage: string, isScheduled: boolean) => {
    if (tasks.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-100 rounded-full p-5 mb-4">
            <ClipboardCheck className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Tasks</h3>
          <p className="text-gray-500 mb-6 max-w-xs">
            {emptyMessage}
          </p>
          <Button className="bg-assist-blue hover:bg-assist-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Book a Task
          </Button>
        </div>
      );
    }

    return tasks.map((task) => (
      <Card 
        key={task.id} 
        className={`mb-4 cursor-pointer hover:shadow-md transition-shadow ${
          isScheduled 
            ? "bg-gradient-to-r from-white to-soft-green/30" 
            : "bg-gradient-to-r from-white to-assist-blue/30"
        }`}
        onClick={() => handleTaskClick(task)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{task.title}</h3>
            <Badge
              className={
                task.status === "Confirmed" ? "bg-green-100 text-green-800 border-green-200" :
                task.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                task.status === "Completed" ? "bg-blue-100 text-blue-800 border-blue-200" :
                "bg-gray-100 text-gray-800 border-gray-200"
              }
            >
              {task.status}
            </Badge>
          </div>
          <div className="flex items-center text-gray-500 mb-1">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{task.date}</span>
          </div>
          <div className="text-sm text-gray-500">
            {task.location}
          </div>
          <div className="mt-2 font-medium">
            <span className={isScheduled ? "text-green-600" : "text-assist-blue"}>
              {task.price}
            </span>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <>
      <MobileLayout 
        title="My Tasks" 
        showHeader={true}
        showLogo={false}
        headerClassName="bg-white text-center"
        contentClassName="pb-20"
      >
        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="scheduled" 
              className="rounded-md data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Scheduled
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="rounded-md data-[state=active]:bg-assist-blue data-[state=active]:text-white"
            >
              Completed
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled" className="mt-2">
            {renderTaskList(scheduledTasks, "Let us help you get the job done. Book a task and see it here.", true)}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-2">
            {renderTaskList(completedTasks, "You haven't completed any tasks yet.", false)}
          </TabsContent>
        </Tabs>
      </MobileLayout>
      
      <TaskStatusView 
        isOpen={showTaskDetails} 
        onClose={() => setShowTaskDetails(false)} 
        task={selectedTask}
      />
      
      <BottomNavigation />
    </>
  );
};

export default MobileTasks;
