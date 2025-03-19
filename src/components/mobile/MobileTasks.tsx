
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

  // Sample data for tasks - setting to empty arrays to show empty states
  const scheduledTasks: any[] = [];
  const completedTasks: any[] = [];

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const renderScheduledEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center h-[70vh]">
      <div className="mb-6">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle cx="60" cy="60" r="55" stroke="#90EE90" strokeWidth="5" fill="#F2FCE2" />
            <rect x="85" y="45" width="30" height="40" rx="2" fill="#F2FCE2" stroke="#90EE90" strokeWidth="2" />
            <line x1="60" y1="30" x2="60" y2="62" stroke="#90EE90" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="60" x2="80" y2="60" stroke="#90EE90" strokeWidth="4" strokeLinecap="round" />
            <text x="35" y="20" fill="#90EE90" fontSize="12">1</text>
            <text x="80" y="25" fill="#90EE90" fontSize="12">2</text>
            <text x="93" y="50" fill="#90EE90" fontSize="12">3</text>
            
            <line x1="95" y1="60" x2="105" y2="60" stroke="#90EE90" strokeWidth="2" strokeLinecap="round" />
            <line x1="95" y1="70" x2="105" y2="70" stroke="#90EE90" strokeWidth="2" strokeLinecap="round" />
            <line x1="95" y1="80" x2="105" y2="80" stroke="#90EE90" strokeWidth="2" strokeLinecap="round" />
            
            <circle cx="92" cy="60" r="3" fill="#90EE90" />
            <circle cx="92" cy="70" r="3" fill="#90EE90" />
            <rect x="89" y="77" width="6" height="6" stroke="#90EE90" strokeWidth="2" fill="none" />
          </g>
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">No Current Tasks</h3>
      <p className="text-gray-500 max-w-xs mx-auto">
        Let us help you get the job done.
        <br />Book a task and see it here.
      </p>
    </div>
  );

  const renderCompletedEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center h-[70vh]">
      <div className="mb-6">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle cx="60" cy="60" r="55" stroke="#90EE90" strokeWidth="5" fill="#F2FCE2" />
            <rect x="85" y="45" width="30" height="40" rx="2" fill="#F2FCE2" stroke="#90EE90" strokeWidth="2" />
            <line x1="60" y1="30" x2="60" y2="62" stroke="#90EE90" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="60" x2="80" y2="60" stroke="#90EE90" strokeWidth="4" strokeLinecap="round" />
            <text x="35" y="20" fill="#90EE90" fontSize="12">1</text>
            <text x="80" y="25" fill="#90EE90" fontSize="12">2</text>
            <text x="93" y="50" fill="#90EE90" fontSize="12">3</text>
            
            <line x1="95" y1="60" x2="105" y2="60" stroke="#90EE90" strokeWidth="2" strokeLinecap="round" />
            <line x1="95" y1="70" x2="105" y2="70" stroke="#90EE90" strokeWidth="2" strokeLinecap="round" />
            <line x1="95" y1="80" x2="105" y2="80" stroke="#90EE90" strokeWidth="2" strokeLinecap="round" />
            
            <circle cx="92" cy="60" r="3" fill="#90EE90" />
            <circle cx="92" cy="70" r="3" fill="#90EE90" />
            <rect x="89" y="77" width="6" height="6" stroke="#90EE90" strokeWidth="2" fill="none" />
          </g>
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">Book a task today.</h3>
      <p className="text-gray-500 max-w-xs mx-auto">
        Once the task is done, you'll see it here.
        <br />No Completed Tasks
      </p>
    </div>
  );

  const renderScheduledTaskList = (tasks: any[]) => {
    if (tasks.length === 0) {
      return renderScheduledEmptyState();
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
      return renderCompletedEmptyState();
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
        title="Tasks" 
        showHeader={true}
        showLogo={false}
        headerClassName="bg-white text-center text-gray-800 border-b"
        contentClassName="pb-20 bg-gray-50"
      >
        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-0 bg-white border-b rounded-none shadow-none">
            <TabsTrigger 
              value="scheduled" 
              className="border-b-2 data-[state=active]:border-green-600 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-green-600 data-[state=active]:shadow-none"
            >
              Scheduled
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="border-b-2 data-[state=active]:border-green-600 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-green-600 data-[state=active]:shadow-none"
            >
              Completed
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled" className="mt-0">
            {renderScheduledTaskList(scheduledTasks)}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
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
