
import React, { useState } from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ClipboardCheck, 
  Clock, 
  PlusCircle, 
  MapPin, 
  Check, 
  Calendar, 
  DollarSign,
  UserRound
} from "lucide-react";
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
      status: "Confirmed",
      description: "Deep cleaning of 2-bedroom apartment",
      provider: "Sarah K.",
      duration: "3 hours"
    },
    {
      id: "task2",
      title: "Furniture Assembly",
      date: "Friday, 10:00 AM",
      location: "456 Elm St",
      price: "$85",
      status: "Pending",
      description: "Assembly of IKEA bookshelf and desk",
      provider: "Mike L.",
      duration: "2 hours"
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
      status: "Completed",
      rating: 5,
      description: "Weekly grocery shopping from Trader Joe's",
      duration: "1 hour"
    },
    {
      id: "task4",
      title: "Dog Walking",
      date: "Oct 10, 2023",
      location: "123 Main St",
      price: "$30",
      provider: "Sarah M.",
      status: "Completed",
      rating: 4,
      description: "30-minute walk for Golden Retriever",
      duration: "30 min"
    }
  ];

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const renderEmptyState = (message: string, isScheduled: boolean) => (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg shadow-sm mx-1 mt-4">
      <div className={`rounded-full p-5 mb-4 ${isScheduled ? 'bg-green-100' : 'bg-blue-100'}`}>
        <ClipboardCheck className={`h-10 w-10 ${isScheduled ? 'text-green-500' : 'text-blue-500'}`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Tasks</h3>
      <p className="text-gray-500 mb-6 max-w-xs px-6">
        {message}
      </p>
      <Button className={isScheduled ? "bg-green-500 hover:bg-green-600" : "bg-assist-blue hover:bg-assist-blue/90"}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Book a Task
      </Button>
    </div>
  );

  const renderScheduledTaskList = (tasks: any[]) => {
    if (tasks.length === 0) {
      return renderEmptyState("Let us help you get the job done. Book a task and see it here.", true);
    }

    return tasks.map((task) => (
      <Card 
        key={task.id} 
        className="mb-3 cursor-pointer hover:shadow-md transition-shadow bg-white border-l-4 border-l-green-500"
        onClick={() => handleTaskClick(task)}
      >
        <CardContent className="p-3">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-gray-900">{task.title}</h3>
            <Badge
              className={
                task.status === "Confirmed" ? "bg-green-100 text-green-800 border-green-200" :
                task.status === "Pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                "bg-gray-100 text-gray-800 border-gray-200"
              }
            >
              {task.status}
            </Badge>
          </div>
          
          <p className="text-xs text-gray-600 mb-2 line-clamp-1">{task.description}</p>
          
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <div className="flex items-center text-gray-500">
              <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{task.date}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{task.duration}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{task.location}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <UserRound className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{task.provider || "Assigning..."}</span>
            </div>
          </div>
          
          <div className="mt-2 font-medium text-right">
            <span className="text-green-600 flex items-center justify-end">
              <DollarSign className="h-3.5 w-3.5 mr-0.5" />
              {task.price}
            </span>
          </div>
        </CardContent>
      </Card>
    ));
  };

  const renderCompletedTaskList = (tasks: any[]) => {
    if (tasks.length === 0) {
      return renderEmptyState("You haven't completed any tasks yet. Once you do, they will appear here.", false);
    }

    return tasks.map((task) => (
      <Card 
        key={task.id} 
        className="mb-3 cursor-pointer hover:shadow-md transition-shadow bg-white border-l-4 border-l-assist-blue"
        onClick={() => handleTaskClick(task)}
      >
        <CardContent className="p-3">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-gray-900">{task.title}</h3>
            <div className="flex items-center">
              {task.rating && [...Array(task.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xs">★</span>
              ))}
            </div>
          </div>
          
          <p className="text-xs text-gray-600 mb-2 line-clamp-1">{task.description}</p>
          
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <div className="flex items-center text-gray-500">
              <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{task.date}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{task.duration}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{task.location}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <UserRound className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{task.provider}</span>
            </div>
          </div>
          
          <div className="mt-2 font-medium text-right">
            <span className="text-assist-blue flex items-center justify-end">
              <Check className="h-3.5 w-3.5 mr-0.5" />
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
        headerClassName="bg-gradient-to-r from-blue-400 via-assist-blue/90 to-blue-500 text-center text-white"
        contentClassName="pb-20"
      >
        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-2 bg-white p-1 rounded-lg shadow-sm">
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
            {renderScheduledTaskList(scheduledTasks)}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-2">
            {renderCompletedTaskList(completedTasks)}
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
