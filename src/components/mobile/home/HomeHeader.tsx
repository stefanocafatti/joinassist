
import React, { useState, useEffect } from "react";
import { Bell, Search, MapPin, X, Check, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

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
  onTaskSelect?: (taskTitle: string) => void;
}

interface LocationData {
  street: string;
  city: string;
  state: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ 
  userName = "User",
  onTaskSelect = () => {} 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState<LocationData>({
    street: "Columbia University",
    city: "New York City",
    state: "New York"
  });
  const [tempLocation, setTempLocation] = useState<LocationData>({
    street: "",
    city: "",
    state: ""
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isLocationDialogOpen) {
      setTempLocation({ ...location });
    }
  }, [isLocationDialogOpen]);

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

  const handleLocationClick = () => {
    setIsLocationDialogOpen(true);
  };

  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setIsGettingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      position => {
        setTempLocation({
          street: "Current Location",
          city: "Near You",
          state: "Current Area"
        });
        
        toast({
          title: "Location Updated",
          description: "Using your current location"
        });
        
        setIsGettingLocation(false);
      },
      error => {
        let errorMessage = "Unable to retrieve your location";
        
        if (error.code === 1) {
          errorMessage = "Location access denied. Please enable location services.";
        }
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        });
        
        setIsGettingLocation(false);
      }
    );
  };

  const handleSaveLocation = () => {
    setLocation(tempLocation);
    setIsLocationDialogOpen(false);
    
    toast({
      title: "Location Updated",
      description: "Your service location has been updated"
    });
  };

  const getDisplayLocation = () => {
    return `${location.street}, ${location.state}`;
  };

  const handleTaskClick = (taskTitle: string) => {
    setIsSearchOpen(false);
    console.log(`Selected task: ${taskTitle}`);
    onTaskSelect(taskTitle);
  };

  return (
    <div className="pt-4 pb-2">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="font-bold text-xl">
            Hi <span className="bg-gradient-to-r from-assist-blue via-blue-500 to-blue-400 bg-clip-text text-transparent">{userName}<span>,</span></span> 👋
          </h1>
          <div 
            className="flex items-center mt-1 text-sm text-gray-500 cursor-pointer"
            onClick={handleLocationClick}
          >
            <MapPin className="h-3.5 w-3.5 mr-1 text-assist-blue" />
            <span className="truncate max-w-[200px]">{getDisplayLocation()}</span>
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
        <span className="text-gray-400 font-normal">Try "walk my dog" or "wash my car"</span>
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
          
          <DialogTitle className="sr-only">Find a task</DialogTitle>
          
          <div className="p-4 overflow-y-auto max-h-[70vh]">
            {filteredTasks.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredTasks.map((task, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border border-gray-100"
                    onClick={() => handleTaskClick(task.title)}
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
                    setIsSearchOpen(false);
                    onTaskSelect("Custom Task");
                  }}
                >
                  Request Custom Task
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Update Your Location</DialogTitle>
          
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <Input
                id="street"
                value={tempLocation.street}
                onChange={(e) => setTempLocation({...tempLocation, street: e.target.value})}
                placeholder="Enter street address"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <Input
                  id="city"
                  value={tempLocation.city}
                  onChange={(e) => setTempLocation({...tempLocation, city: e.target.value})}
                  placeholder="City"
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <Input
                  id="state"
                  value={tempLocation.state}
                  onChange={(e) => setTempLocation({...tempLocation, state: e.target.value})}
                  placeholder="State"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <Button
                variant="outline"
                type="button"
                className="w-full flex justify-center items-center gap-2"
                onClick={handleGetCurrentLocation}
                disabled={isGettingLocation}
              >
                <Navigation className="h-4 w-4" />
                {isGettingLocation ? "Getting location..." : "Use Current Location"}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-2">
            <Button 
              variant="outline" 
              onClick={() => setIsLocationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveLocation}
              className="bg-assist-blue hover:bg-assist-blue/90"
            >
              <Check className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeHeader;
