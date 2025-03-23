
import React, { useState } from "react";
import { Bell, Search, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Task items that will be displayed in the search dialog
const taskItems = [
  { title: "Help Moving", image: "/lovable-uploads/72545c93-f781-402e-ad25-5cd509be453c.png" },
  { title: "Furniture Assembly", image: "/lovable-uploads/83abea36-642f-4147-865a-c43794680e3b.png" },
  { title: "General Mounting", image: "/lovable-uploads/36f389d4-c8c6-40a8-9cc4-2ed5306d7dd5.png" },
  { title: "Cleaning", image: "/lovable-uploads/84373410-0ca0-44aa-bce4-fecda1465ffb.png" },
  { title: "TV Mounting", image: "/lovable-uploads/36f389d4-c8c6-40a8-9cc4-2ed5306d7dd5.png" },
  { title: "Heavy Lifting", image: "/lovable-uploads/72545c93-f781-402e-ad25-5cd509be453c.png" },
  { title: "Academic Tutoring", image: "/lovable-uploads/603a2dee-f790-49b1-aade-54b5318f754a.png" },
  { title: "Laundry Help", image: "/lovable-uploads/bd95bdf7-c140-465b-8e12-3a21d5d46a94.png" },
  { title: "Grocery Shopping", image: "/lovable-uploads/b1aee96b-9a26-4fd9-9872-57f40cbe16d7.png" },
  { title: "Pet Sitting", image: "/lovable-uploads/55ae04cd-8676-4a1c-b2b3-36c7005144af.png" },
  { title: "House Cleaning", image: "/lovable-uploads/84373410-0ca0-44aa-bce4-fecda1465ffb.png" },
  { title: "Car Wash", image: "/lovable-uploads/c9d970a2-7da1-4c02-997f-aa30ef2e5bba.png" },
  { title: "Yard Work", image: "/lovable-uploads/55ae04cd-8676-4a1c-b2b3-36c7005144af.png" },
  { title: "Meal Preparation", image: "/lovable-uploads/c63ac0bf-b196-42d2-8004-012ba59ad57e.png" },
  { title: "Tech Support", image: "/lovable-uploads/bab65021-5d30-4495-bcd8-b77a329626c7.png" },
  { title: "Plant Watering", image: "/lovable-uploads/55ae04cd-8676-4a1c-b2b3-36c7005144af.png" }
];

interface HomeHeaderProps {
  userName?: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ userName = "User" }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredTasks = searchQuery 
    ? taskItems.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : taskItems;

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };

  return (
    <div className="pt-4 pb-2">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="font-bold text-xl text-gray-900">Hi, {userName}! 👋</h1>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5 mr-1 text-assist-blue" />
            Columbia University, New York
          </div>
        </div>
        <Button
          size="smallIcon"
          variant="outline"
          className="rounded-full border-gray-200"
          onClick={handleNotificationClick}
        >
          <Bell className="h-5 w-5 text-gray-500" />
        </Button>
      </div>

      <div 
        className="bg-white flex items-center px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm cursor-pointer"
        onClick={() => setIsSearchOpen(true)}
      >
        <Search className="h-5 w-5 text-gray-400 mr-3" />
        <span className="text-gray-400 font-normal">What task do you need help with?</span>
      </div>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Button
                size="smallIcon"
                variant="ghost"
                className="rounded-full hover:bg-gray-100"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5 text-gray-500" />
              </Button>
              <h3 className="text-lg font-semibold">Find a task</h3>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-assist-blue/20 focus:border-assist-blue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <Button
                  size="smallIcon"
                  variant="ghost"
                  className="absolute right-2 top-2 rounded-full hover:bg-gray-200"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="p-4 overflow-y-auto max-h-[70vh]">
            {filteredTasks.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredTasks.map((task, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border border-gray-100"
                    onClick={() => {
                      console.log(`Selected task: ${task.title}`);
                      setIsSearchOpen(false);
                    }}
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
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No tasks found for "{searchQuery}"</p>
                <Button 
                  className="mt-4 bg-assist-blue hover:bg-assist-blue/90"
                  onClick={() => {
                    console.log("Create custom task");
                    setIsSearchOpen(false);
                  }}
                >
                  Request Custom Task
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeHeader;
