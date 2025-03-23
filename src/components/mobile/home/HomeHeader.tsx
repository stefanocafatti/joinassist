
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeHeaderProps {
  userName: string;
}

const HomeHeader = ({ userName }: HomeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold">
            Hello, {userName}
          </h1>
          <p className="text-sm text-gray-500">
            What task do you need help with today?
          </p>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="rounded-full hover:bg-gray-100"
          onClick={() => navigate('/mobile/notifications')}
        >
          <Bell size={24} className="text-gray-700" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
      
      <Button
        variant="outline"
        className="w-full bg-white border border-gray-200 shadow-sm text-gray-500 justify-start h-12 px-4 rounded-xl hover:bg-gray-50"
        onClick={() => navigate('/mobile/search')}
      >
        <Search size={18} className="mr-2 text-gray-400" />
        Search for a task or service...
      </Button>
    </div>
  );
};

export default HomeHeader;
