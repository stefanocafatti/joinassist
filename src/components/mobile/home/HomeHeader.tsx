import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Check, X, Navigation, ArrowLeft, PlusCircle, Calendar, MapPinIcon, DollarSign } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

interface HomeHeaderProps {
  userName: string;
}

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  price?: string;
  image: string;
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
  
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showCategories, setShowCategories] = useState(true);

  const availableTasks: Task[] = [
    {
      title: "Clean my apartment",
      description: "I need help cleaning my 1-bedroom apartment including dusting, vacuuming, and bathroom cleaning.",
      category: "Cleaning",
      location: "UCLA Area",
      price: "$25/hr",
      image: "/lovable-uploads/8d0891f3-e455-4ef9-9c2b-8b077062435d.png"
    },
    {
      title: "Apartment deep cleaning",
      description: "Need a thorough cleaning of my apartment before move-out inspection.",
      category: "Cleaning",
      location: "Downtown LA",
      price: "$30/hr",
      image: "/lovable-uploads/e67a50a7-d7a9-4d4a-bdc8-b311dd1abaf4.png"
    },
    {
      title: "Make my bed and change sheets",
      description: "Need help changing my bed sheets and making my bed nicely.",
      category: "Home Services",
      location: "USC Campus",
      price: "$15",
      image: "/lovable-uploads/119edf91-7d11-444b-9db6-41d9aa9800fe.png"
    },
    {
      title: "Organize my closet",
      description: "Help me organize my closet and sort through clothes for donation.",
      category: "Home Services",
      location: "Westwood",
      price: "$20/hr",
      image: "/lovable-uploads/cbe8bf6e-c568-40f6-acf7-47eb4c4aa67c.png"
    },
    {
      title: "Build my IKEA desk",
      description: "I need help assembling my new IKEA desk with drawers.",
      category: "Furniture Assembly",
      location: "Santa Monica",
      price: "$35",
      image: "/lovable-uploads/d3cfa02f-5bf5-438d-b0bd-97a6beb2ba63.png"
    },
    {
      title: "Assemble bookshelf",
      description: "Need help putting together a 5-shelf bookcase from IKEA.",
      category: "Furniture Assembly",
      location: "Culver City",
      price: "$30",
      image: "/lovable-uploads/72545c93-f781-402e-ad25-5cd509be453c.png"
    },
    {
      title: "Meal prep for the week",
      description: "Looking for someone to help me cook and prepare 5 meals for my work week.",
      category: "Grocery Shopping",
      location: "Venice",
      price: "$40/hr",
      image: "/lovable-uploads/913318c0-10d3-4c6d-91f5-accf9169ae81.png"
    },
    {
      title: "Groceries and cooking dinner",
      description: "Need someone to pick up groceries and cook dinner for 4 people.",
      category: "Grocery Shopping",
      location: "Pasadena",
      price: "$45",
      image: "/lovable-uploads/79b50b55-1c38-4f6c-8542-561bb97fde56.png"
    }
  ];

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
    { name: "Home Services", icon: "🏠", color: "bg-soft-blue" },
    { name: "Custom Task", icon: "✨", color: "bg-soft-green" },
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
      setShowCategories(false);
      
      const query = searchQuery.toLowerCase();
      
      let matchedCategories: string[] = [];
      
      Object.entries(keywordMappings).forEach(([category, keywords]) => {
        if (keywords.some(keyword => 
          query.includes(keyword.toLowerCase()) || 
          keyword.toLowerCase().includes(query)
        )) {
          matchedCategories.push(category);
        }
      });
      
      if (query.includes("make my bed") || query.includes("make bed")) {
        matchedCategories = [
          ...new Set([
            ...matchedCategories,
            "Cleaning",
            "Laundry Help",
            "Furniture Assembly",
            "Home Services"
          ])
        ];
      }
      
      if (query.includes("cook") || query.includes("meal") || query.includes("food preparation")) {
        matchedCategories = [
          ...new Set([
            ...matchedCategories,
            "Grocery Shopping"
          ])
        ];
      }
      
      const matched = availableTasks.filter(task => {
        const titleMatch = task.title.toLowerCase().includes(query);
        const descMatch = task.description.toLowerCase().includes(query);
        const categoryMatch = matchedCategories.includes(task.category);
        
        return titleMatch || descMatch || categoryMatch;
      });
      
      setFilteredTasks(matched);
    } else {
      setShowCategories(true);
      setFilteredTasks([]);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/mobile/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
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

  const handleCategoryClick = (categoryName: string) => {
    const tasksInCategory = availableTasks.filter(task => 
      task.category === categoryName ||
      (categoryName === "Help Moving" && task.category === "Transportation") ||
      (categoryName === "Laundry Help" && task.category.includes("Cleaning")) ||
      (categoryName === "Heavy Lifting" && task.category.includes("Moving"))
    );
    
    setFilteredTasks(tasksInCategory);
    setShowCategories(false);
    setSearchQuery(categoryName);
  };

  const highlightMatchingText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const queryWords = query.trim().toLowerCase().split(/\s+/);
    
    let hasMatch = false;
    for (const word of queryWords) {
      if (text.toLowerCase().includes(word)) {
        hasMatch = true;
        break;
      }
    }
    
    if (!hasMatch) return text;
    
    const pattern = queryWords.map(word => `(${word})`).join('|');
    const regex = new RegExp(pattern, 'gi');
    
    const parts = text.split(regex);
    
    return parts.map((part, i) => {
      const isMatch = queryWords.some(word => 
        part.toLowerCase() === word
      );
      
      return isMatch ? 
        <span key={i} className="bg-yellow-100 text-yellow-800 px-0.5 rounded">{part}</span> : 
        part;
    });
  };

  return (
    <>
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
          
          {showCategories ? (
            <div className="pb-20">
              <h3 className="text-md font-medium text-gray-700 mb-4">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category, index) => (
                  <div 
                    key={index}
                    className={`${category.color} p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredTasks.length > 0 ? (
            <div className="pb-20">
              <h3 className="text-md font-medium text-gray-700 mb-4">
                Found {filteredTasks.length} tasks matching "{searchQuery.trim()}"
              </h3>
              <div className="space-y-4">
                {filteredTasks.map((task, index) => (
                  <div 
                    key={index}
                    className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-assist-blue/20 transition-all duration-200"
                    onClick={() => handleViewTask(task)}
                  >
                    <div className="flex">
                      <div className="w-24 h-24 rounded-lg overflow-hidden mr-3">
                        <img src={task.image} alt={task.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {highlightMatchingText(task.title, searchQuery)}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {highlightMatchingText(task.description, searchQuery)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="flex items-center gap-1 bg-gray-50 text-xs py-0.5">
                            <MapPinIcon className="h-3 w-3 text-gray-500" />
                            {task.location}
                          </Badge>
                          {task.price && (
                            <Badge variant="outline" className="flex items-center gap-1 bg-gray-50 text-xs py-0.5">
                              <DollarSign className="h-3 w-3 text-gray-500" />
                              {task.price}
                            </Badge>
                          )}
                          <Badge variant="secondary" className="bg-soft-blue/20 text-blue-700 border-0 text-xs py-0.5">
                            {task.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
        initialTaskTitle={searchQuery.includes("make my bed") ? "Make My Bed" : ""}
      />

      {selectedTask && (
        <TaskDetailView 
          isOpen={showTaskDetails}
          onClose={() => setShowTaskDetails(false)}
          onTaskBooked={handleTaskBooked}
          task={{
            title: selectedTask.title,
            description: selectedTask.description,
            category: selectedTask.category,
            location: selectedTask.location,
            price: selectedTask.price || "$25/hr",
            image: selectedTask.image
          }}
        />
      )}
    </>
  );
};

export default HomeHeader;
