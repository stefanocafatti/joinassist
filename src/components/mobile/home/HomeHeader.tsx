
import React, { useState } from "react";
import { Bell, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HomeHeaderProps {
  userName?: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ userName = "User" }) => {
  const navigate = useNavigate();
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNotificationsClick = () => {
    navigate("/mobile/notifications");
  };

  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const handleCloseSearch = () => {
    setSearchActive(false);
    setSearchQuery("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/mobile/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // List of tasks with their images
  const taskItems = [
    { title: "Help Moving", image: "/lovable-uploads/72545c93-f781-402e-ad25-5cd509be453c.png" },
    { title: "Furniture Assembly", image: "/lovable-uploads/83abea36-642f-4147-865a-c43794680e3b.png" },
    { title: "General Mounting", image: "/lovable-uploads/36f389d4-c8c6-40a8-9cc4-2ed5306d7dd5.png" },
    { title: "Cleaning", image: "/lovable-uploads/84373410-0ca0-44aa-bce4-fecda1465ffb.png" },
    { title: "TV Mounting", image: "/lovable-uploads/36f389d4-c8c6-40a8-9cc4-2ed5306d7dd5.png" },
    { title: "Heavy Lifting", image: "/lovable-uploads/72545c93-f781-402e-ad25-5cd509be453c.png" },
    { title: "Academic Tutoring", image: "/lovable-uploads/603a2dee-f790-49b1-aade-54b5318f754a.png" },
    { title: "Laundry Help", image: "/lovable-uploads/bd95bdf7-c140-465b-8e12-3a21d5d46a94.png" }
  ];

  return (
    <header className="px-4 pt-6 pb-2 bg-gray-50">
      {!searchActive ? (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Hello, {userName}! 👋</h1>
            <p className="text-sm text-gray-500 mt-1">What can we help you with today?</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full text-gray-600"
              onClick={handleNotificationsClick}
            >
              <Bell className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full text-gray-600"
              onClick={handleSearchClick}
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center">
            <form onSubmit={handleSearchSubmit} className="flex-1 relative">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-assist-blue/50"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
            <Button 
              variant="ghost" 
              size="icon"
              className="ml-2 text-gray-600"
              onClick={handleCloseSearch}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="pb-2">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Tasks</h3>
            <div className="grid grid-cols-2 gap-3">
              {taskItems.map((task, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border border-gray-100"
                  onClick={() => navigate(`/mobile/task/${encodeURIComponent(task.title)}`)}
                >
                  <div 
                    className="h-24 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${task.image})` }}
                  />
                  <div className="p-2">
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
