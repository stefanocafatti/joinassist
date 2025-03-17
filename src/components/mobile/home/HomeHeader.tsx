
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeHeaderProps {
  userName: string;
}

const HomeHeader = ({ userName }: HomeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header Section with gradient background */}
      <header className="mb-3 bg-gradient-to-r from-assist-blue/10 to-soft-purple/30 p-4 -mx-5 rounded-b-3xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Hello, {userName}!</h1>
        <p className="text-gray-600 text-sm font-medium">Find skilled students for your tasks</p>
      </header>
      
      {/* Search Bar with more prominence */}
      <div className="relative mb-2">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Type in what you need help with today"
          className="w-full h-12 pl-10 pr-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-assist-blue/30 focus:border-assist-blue shadow-sm"
          onClick={() => navigate('/mobile/search')}
        />
      </div>

      {/* New Task Button - Made more prominent with gradient */}
      <div className="mb-3">
        <Button 
          className="w-full bg-gradient-to-r from-assist-blue to-blue-500 hover:from-blue-600 hover:to-blue-700 text-white font-medium h-12 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
          onClick={() => navigate('/mobile/new-task')}
        >
          <Plus size={18} />
          <span>Request New Task</span>
        </Button>
      </div>
    </>
  );
};

export default HomeHeader;
