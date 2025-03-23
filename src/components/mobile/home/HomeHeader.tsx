
import React, { useState } from "react";
import { Search, Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TaskDetailView from "@/components/ui/TaskDetailView";

interface HomeHeaderProps {
  userName: string;
}

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image?: string;
}

const HomeHeader = ({ userName }: HomeHeaderProps) => {
  const navigate = useNavigate();
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate('/mobile/search');
    }
  };

  const handleCreateTask = () => {
    setShowTaskDetail(true);
  };
  
  const handleTaskBooked = (
    taskTitle: string, 
    date: Date, 
    time: string, 
    priceType?: string, 
    price?: number,
    location?: string,
    additionalInfo?: string
  ) => {
    console.log("Custom task created:", {
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
    <div className="pt-4 pb-1">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hi, {userName}!</h1>
          <p className="text-sm text-gray-500">What do you need done today?</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white"
            onClick={() => navigate('/mobile/notifications')}
          >
            <Bell size={20} className="text-gray-700" />
          </Button>
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarImage src="/lovable-uploads/33ac30a4-4b4d-47a9-89a9-63711ff5e3fd.png" alt="profile" />
            <AvatarFallback>👤</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search tasks..." 
            className="pl-9 bg-white border-gray-200"
            onKeyDown={handleSearch}
          />
        </div>
        <Button 
          className="bg-assist-blue text-white hover:bg-blue-600 rounded-md flex-shrink-0"
          onClick={handleCreateTask}
        >
          <Plus size={18} className="mr-1" />
          <span>Post</span>
        </Button>
      </div>

      <TaskDetailView 
        isOpen={showTaskDetail}
        onClose={() => setShowTaskDetail(false)}
        onTaskBooked={handleTaskBooked}
        isCustomTask={true}
      />
    </div>
  );
};

export default HomeHeader;
