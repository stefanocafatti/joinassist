
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Check, X, Navigation, ArrowLeft, PlusCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import TaskDetailView from "@/components/ui/TaskDetailView";

interface HomeHeaderProps {
  userName: string;
}

const HomeHeader = ({ userName }: HomeHeaderProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Los Angeles, CA");
  const [editLocation, setEditLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [useDeviceLocation, setUseDeviceLocation] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCustomTaskForm, setShowCustomTaskForm] = useState(false);
  
  const [filteredCategories, setFilteredCategories] = useState<Array<{name: string, icon: string, color: string}>>([]);

  const categories = [
    { name: "Help Moving", icon: "📦", color: "bg-soft-blue" },
    { name: "Furniture Assembly", icon: "🪑", color: "bg-soft-green" },
    { name: "General Mounting", icon: "🔨", color: "bg-soft-yellow" },
    { name: "Cleaning", icon: "🧹", color: "bg-soft-purple" },
    { name: "TV Mounting", icon: "📺", color: "bg-soft-pink" },
    { name: "Heavy Lifting", icon: "💪", color: "bg-soft-orange" },
    { name: "Academic Tutoring", icon: "📚", color: "bg-soft-blue" },
    { name: "Laundry Help", icon: "👕", color: "bg-soft-green" },
    { name: "Grocery Shopping", icon: "🛒", color: "bg-soft-yellow" },
    { name: "Pet Sitting", icon: "🐕", color: "bg-soft-purple" },
    { name: "Photography", icon: "📸", color: "bg-soft-pink" },
    { name: "Tech Support", icon: "💻", color: "bg-soft-orange" },
    { name: "Home Services", icon: "🏠", color: "bg-soft-blue" }, // Added new category
    { name: "Custom Task", icon: "✨", color: "bg-soft-green" }, // Added new category
  ];

  const keywordMappings: Record<string, string[]> = {
    "Help Moving": ["move", "moving", "relocation", "transport", "carry", "haul", "shift", "furniture moving"],
    "Furniture Assembly": ["assemble", "build", "construct", "put together", "ikea", "desk", "chair", "table", "shelf", "bookcase", "bed frame", "make my bed", "assemble bed"],
    "General Mounting": ["mount", "hang", "install", "setup", "attach", "wall", "drill", "fix", "picture", "mirror", "shelf"],
    "Cleaning": ["clean", "wash", "tidy", "dust", "sweep", "mop", "vacuum", "sanitize", "apartment", "house", "room", "bathroom", "kitchen", "make my bed", "make bed", "fold sheets", "change sheets", "change linens", "bed sheets"],
    "TV Mounting": ["tv", "television", "mount", "install", "hang", "setup", "wall", "bracket"],
    "Heavy Lifting": ["lift", "heavy", "move", "weight", "big", "bulky", "large"],
    "Academic Tutoring": ["tutor", "help", "study", "homework", "math", "science", "english", "history", "exam", "essay", "assignment", "paper"],
    "Laundry Help": ["laundry", "wash", "fold", "clothes", "dry cleaning", "iron", "ironing", "bedding", "sheets", "make my bed", "make bed", "change sheets"],
    "Grocery Shopping": ["grocery", "shop", "shopping", "food", "supermarket", "store", "buy", "purchase", "market", "cook", "cooking", "meal", "dinner", "lunch", "breakfast", "prepare food", "meal prep"],
    "Pet Sitting": ["pet", "dog", "cat", "walk", "sit", "feed", "animal", "care", "boarding"],
    "Photography": ["photo", "picture", "portrait", "event", "session", "camera", "photoshoot", "headshot"],
    "Tech Support": ["tech", "computer", "laptop", "phone", "setup", "fix", "repair", "install", "software", "hardware", "printer", "wifi", "internet"],
    "Home Services": ["home", "house", "apartment", "room", "bedroom", "kitchen", "bathroom", "living room", "make my bed", "make bed", "organize", "setup", "furniture", "decorate", "decorating"],
    "Custom Task": ["custom", "specific", "unique", "special", "personalized", "tailored"],
  };

  const handleEditLocation = () => {
    if (editLocation.trim()) {
      setLocation(editLocation);
    }
    setIsOpen(false);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`
          );
          
          if (!response.ok) throw new Error("Failed to fetch location data");
          
          const data = await response.json();
          
          let locationText = "";
          
          if (data.address) {
            const address = data.address;
            
            if (address.neighbourhood) {
              locationText = address.neighbourhood;
            } else if (address.suburb) {
              locationText = address.suburb;
            } else if (address.district) {
              locationText = address.district;
            } else if (address.city_district) {
              locationText = address.city_district;
            } else if (address.aeroway) {
              locationText = address.aeroway;
            }
            
            if (address.city) {
              locationText += locationText ? `, ${address.city}` : address.city;
            } else if (address.town) {
              locationText += locationText ? `, ${address.town}` : address.town;
            } else if (address.village) {
              locationText += locationText ? `, ${address.village}` : address.village;
            }
            
            if (address.state) {
              if (address.state_code) {
                locationText += locationText ? `, ${address.state_code}` : address.state_code;
              } else {
                locationText += locationText ? `, ${address.state}` : address.state;
              }
            }
          }
          
          if (!locationText && data.display_name) {
            locationText = data.display_name.split(',').slice(0, 3).join(', ');
          }
          
          if (locationText) {
            setLocation(locationText);
            setEditLocation(locationText);
            toast.success("Location updated based on your device");
          } else {
            throw new Error("Could not determine your location name");
          }
        } catch (error) {
          console.error("Error getting location:", error);
          toast.error("Could not retrieve your location. Please enter it manually.");
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        setIsGettingLocation(false);
        console.error("Geolocation error:", error);
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Location access denied. Please enable location services for this site.");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            toast.error("Location request timed out.");
            break;
          default:
            toast.error("An unknown error occurred while retrieving location.");
        }
      }
    );
  };

  useEffect(() => {
    if (useDeviceLocation) {
      getCurrentLocation();
    }
  }, [useDeviceLocation]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      
      // First try direct matches with category names
      let matched = categories.filter(category => 
        category.name.toLowerCase().includes(query)
      );
      
      // If no direct matches, try keyword matching
      if (matched.length === 0) {
        matched = categories.filter(category => {
          const keywords = keywordMappings[category.name] || [];
          return keywords.some(keyword => 
            query.includes(keyword.toLowerCase()) || 
            keyword.toLowerCase().includes(query)
          );
        });
      }
      
      // Special handling for specific phrases like "make my bed"
      if (query.includes("make my bed") || query.includes("make bed")) {
        // Ensure both cleaning and furniture assembly categories are included
        const relevantCategories = ["Cleaning", "Laundry Help", "Furniture Assembly", "Home Services"];
        
        matched = [
          ...matched,
          ...categories.filter(category => 
            relevantCategories.includes(category.name) && 
            !matched.some(m => m.name === category.name)
          )
        ];
      }
      
      // For cooking related queries
      if (query.includes("cook") || query.includes("meal") || query.includes("food preparation")) {
        matched = [
          ...matched,
          ...categories.filter(category => 
            category.name === "Grocery Shopping" && 
            !matched.some(m => m.name === "Grocery Shopping")
          )
        ];
      }
      
      setFilteredCategories(matched);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/mobile/search?q=${encodeURIComponent(searchQuery)}`);
    }
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
    console.log("Task booked:", {
      taskTitle,
      date,
      time,
      priceType,
      price,
      location,
      additionalInfo
    });
    toast.success("Your custom task has been created");
    setShowCustomTaskForm(false);
  };

  const handleCreateCustomTask = () => {
    setShowCustomTaskForm(true);
  };

  return (
    <>
      <div className="hidden">
        {/* Removing the transparent background element */}
      </div>
      
      <header className="p-4 bg-transparent">
        <div className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-r from-blue-400 via-assist-blue to-blue-500">
          <div className="flex items-center justify-between p-4">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <div className="flex items-center text-white text-sm cursor-pointer bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors">
                  <MapPin className="h-4 w-4 mr-1 text-white" />
                  <span>{location}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 border-2 border-soft-purple/40 animate-fade-in">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Edit your location</h4>
                  <Input 
                    placeholder="Enter your location" 
                    value={editLocation} 
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="h-9 focus:border-soft-purple focus:ring-soft-purple/30"
                    onFocus={() => setEditLocation(location)}
                  />
                  
                  <div className="flex items-center justify-between pt-2 pb-1">
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="use-device-location" 
                        checked={useDeviceLocation}
                        onCheckedChange={setUseDeviceLocation}
                        disabled={isGettingLocation}
                        className="data-[state=checked]:bg-assist-blue"
                      />
                      <label 
                        htmlFor="use-device-location" 
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        Use device location
                      </label>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="smallIcon"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="h-7 w-7 hover:bg-soft-blue/40 hover:border-assist-blue/40"
                    >
                      <Navigation className="h-3.5 w-3.5 text-assist-blue" />
                    </Button>
                  </div>
                  
                  {isGettingLocation && (
                    <p className="text-xs text-gray-500 animate-pulse">
                      Getting your location...
                    </p>
                  )}
                  
                  <div className="flex justify-end space-x-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsOpen(false)}
                      className="h-8 px-3 text-xs hover:bg-soft-pink/30 hover:text-pink-700 hover:border-pink-200"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleEditLocation}
                      size="sm"
                      className="h-8 px-3 text-xs bg-assist-blue hover:bg-assist-blue/90"
                    >
                      <Check className="h-3.5 w-3.5 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <button 
              className="flex items-center justify-center h-8 w-8 text-white bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              onClick={() => setSearchQuery(" ")}
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
          <Separator className="w-full h-[1px] bg-white/20" />
        </div>
        
        <div className="pt-14 pb-1 px-1">
          {!searchQuery && (
            <div className="mb-3 text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                Hello, <span className="text-assist-blue">{userName}</span>!
              </h1>
              <p className="text-gray-600 text-sm font-medium mt-0.5">Find skilled students for your tasks</p>
            </div>
          )}
          
          {!searchQuery && (
            <div className="relative mb-2">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="How can we assist you today"
                className="w-full h-12 pl-11 pr-4 bg-white rounded-xl border border-gray-200
                          focus:outline-none focus:ring-2 focus:ring-assist-blue/30 focus:border-assist-blue/50
                          shadow-sm text-gray-800 placeholder:text-gray-400"
                onClick={() => setSearchQuery(" ")}
              />
            </div>
          )}
        </div>
      </header>
      
      {searchQuery && (
        <div className="fixed top-16 left-0 right-0 bottom-0 overflow-auto bg-white z-[5] px-4 pt-4">
          <div className="flex items-center gap-2 mb-6">
            <button 
              onClick={() => setSearchQuery("")}
              className="text-white bg-assist-blue/80 p-2 rounded-full hover:bg-assist-blue transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try 'clean my apartment' or 'build my desk'"
                className="w-full h-10 pl-10 pr-4 bg-white rounded-full border border-gray-300
                          focus:outline-none focus:ring-1 focus:ring-assist-blue/30 focus:border-assist-blue/40
                          shadow-sm text-gray-800 placeholder:text-gray-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
            </div>
          </div>
          
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 pb-20">
              {filteredCategories.map((category, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-assist-blue/20 transition-all duration-200 transform hover:scale-[1.02]"
                  onClick={() => navigate(`/mobile/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`)}
                >
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mr-3 shadow-sm`}>
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{category.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any tasks matching "{searchQuery.trim()}"
              </p>
              <div className="space-y-4">
                <Button
                  variant="default"
                  className="bg-assist-blue hover:bg-assist-blue/90"
                  onClick={handleCreateCustomTask}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Custom Task
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <TaskDetailView 
        isOpen={showCustomTaskForm}
        onClose={() => setShowCustomTaskForm(false)}
        onTaskBooked={handleTaskBooked}
        isCustomTask={true}
      />
    </>
  );
};

export default HomeHeader;
