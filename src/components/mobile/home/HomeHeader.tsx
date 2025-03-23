
import React from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Task {
  title: string;
  description?: string;
  category?: string;
  location?: string;
  image?: string;
  price?: string;
}

interface HomeHeaderProps {
  userName: string;
}

const HomeHeader = ({ userName }: HomeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="pb-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hi, {userName}!</h1>
          <p className="text-sm text-gray-600">What are you looking for today?</p>
        </div>
        <Button 
          size="smallIcon" 
          variant="outline"
          className="rounded-full"
          onClick={() => navigate('/mobile/notifications')}
        >
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
      
      <Button 
        variant="outline"
        className="w-full justify-start text-gray-500 bg-white"
        onClick={() => navigate('/mobile/search')}
      >
        <Search className="h-4 w-4 mr-2" />
        <span>Search for a task...</span>
      </Button>
    </div>
  );
};

export default HomeHeader;
