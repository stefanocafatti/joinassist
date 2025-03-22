
import React, { useState } from "react";
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
  UserRound,
  Package,
  Gift
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TaskStatusView from "@/components/ui/TaskStatusView";
import ReferralDialog from "../ui/ReferralDialog";

const MobileTasks = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showReferralDialog, setShowReferralDialog] = useState(false);

  const scheduledTasks: any[] = [];
  const completedTasks: any[] = [];

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const renderEmptyState = (message: string, isScheduled: boolean) => (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg shadow-sm mx-1 mt-4">
      <div className={`rounded-full p-5 mb-4 ${isScheduled ? 'bg-green-100' : 'bg-blue-100'}`}>
        {isScheduled ? (
          <Package className="h-10 w-10 text-green-500" />
        ) : (
          <ClipboardCheck className="h-10 w-10 text-blue-500" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {isScheduled ? "No Active Tasks" : "No Tasks"}
      </h3>
      <p className="text-gray-500 mb-6 max-w-xs px-6">
        {message}
      </p>
      {!isScheduled && (
        <Button className="bg-assist-blue hover:bg-assist-blue/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Book a Task
        </Button>
      )}
    </div>
  );

  const renderScheduledTaskList = (tasks: any[]) => {
    if (tasks.length === 0) {
      return renderEmptyState("Let us help you get things done. Book your first task and see it here.", true);
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
      return renderEmptyState("You haven't completed any tasks yet. Completed tasks will appear here.", false);
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

  const giftIcon = (
    <div className="absolute top-4 right-4 z-10">
      <Button 
        size="smallIcon" 
        variant="ghost" 
        className="text-assist-blue hover:bg-transparent"
        onClick={() => setShowReferralDialog(true)}
      >
        <Gift className="h-48 w-48 text-assist-blue drop-shadow-md" strokeWidth={1.5} />
      </Button>
    </div>
  );

  return (
    <>
      <div className="relative flex flex-col min-h-screen bg-blue-50">
        {giftIcon}
        
        <main className="flex-1 overflow-auto pb-16 pt-10">
          <div className="px-5 py-4 pb-20">
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
          </div>
        </main>
      </div>
      
      <TaskStatusView 
        isOpen={showTaskDetails} 
        onClose={() => setShowTaskDetails(false)} 
        task={selectedTask}
      />

      <ReferralDialog 
        isOpen={showReferralDialog}
        onClose={() => setShowReferralDialog(false)}
      />
      
      <BottomNavigation />
    </>
  );
};

export default MobileTasks;
