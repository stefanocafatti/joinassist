
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

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
      
      {/* Enhanced Search Bar with animation and better styling */}
      <div className="relative mb-4 group">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-assist-blue/60 group-hover:text-assist-blue transition-colors duration-200" />
        </div>
        <input
          type="text"
          placeholder="Try &quot;help moving&quot; or &quot;need a ride&quot;"
          className="w-full h-12 pl-11 pr-4 bg-white rounded-xl border-2 border-assist-blue/20 
                    focus:outline-none focus:ring-2 focus:ring-assist-blue/30 focus:border-assist-blue 
                    shadow-sm group-hover:border-assist-blue/40 group-hover:shadow 
                    transition-all duration-200 text-gray-800 placeholder:text-gray-400"
          onClick={() => navigate('/mobile/search')}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-assist-blue/60 to-soft-purple/60 
                       scale-x-0 group-hover:scale-x-100 rounded-b-xl transition-transform duration-300 origin-left"></div>
      </div>
    </>
  );
};

export default HomeHeader;
