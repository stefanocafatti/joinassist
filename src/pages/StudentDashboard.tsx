import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserRound, Coins, CalendarIcon, BadgeCheck, Clock, MapPin, ThumbsUp, Filter, Search, X, Award, Star, Trophy, Sliders, ChevronDown } from "lucide-react";
import MainHeader from "@/components/main-menu/MainHeader";
import StudentBalance from "@/components/student/StudentBalance";
import StudentPoints from "@/components/student/StudentPoints";
import StudentCalendar from "@/components/student/StudentCalendar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ConfettiPopup from "@/components/ui/ConfettiPopup";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import SearchHeader from "@/components/main-menu/SearchHeader";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isStudent, setIsStudent] = useState(false);
  const [userName, setUserName] = useState("Student");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentBalance, setCurrentBalance] = useState(345.50);
  const [campus, setCampus] = useState("University of Technology");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showSuccessConfetti, setShowSuccessConfetti] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedGig, setSelectedGig] = useState<{
    id: string;
    title: string;
    date: string;
    location: string;
    price: string;
    category: string;
  } | null>(null);
  
  const [upcomingTasks, setUpcomingTasks] = useState([
    {
      title: "Mathematics Tutoring",
      date: "Today, 3:00 PM",
      status: "Scheduled",
      earnings: "$45",
      category: "Academic Help",
      location: "University Library"
    },
    {
      title: "Physics Study Group",
      date: "Tomorrow, 2:30 PM",
      status: "Pending",
      earnings: "$35",
      category: "Academic Help",
      location: "Science Building"
    },
    {
      title: "Website Debugging",
      date: "Friday, 4:00 PM",
      status: "Confirmed",
      earnings: "$60",
      category: "Digital Services", 
      location: "Remote"
    }
  ]);
  
  const [availableTasks, setAvailableTasks] = useState([
    {
      id: "task1",
      title: "Biology Tutoring",
      date: "Monday, 4:00 PM",
      location: "Science Building, Room 302",
      price: "$35/hr",
      priceValue: 35,
      category: "Academic Help",
      description: "Help a first-year student with biology fundamentals and lab preparation.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "task2",
      title: "Computer Science Project",
      date: "Wednesday, 2:30 PM",
      location: "Engineering Hall, Lab 104",
      price: "$45/hr",
      priceValue: 45,
      category: "Digital Services",
      description: "Assist with a Python programming project focused on data visualization.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "task3",
      title: "Math Homework Help",
      date: "Thursday, 5:00 PM",
      location: "University Center, Study Area",
      price: "$30/hr",
      priceValue: 30,
      category: "Academic Help",
      description: "Help with calculus problems and exam preparation.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "task4",
      title: "Move Furniture",
      date: "Saturday, 11:00 AM",
      location: "Student Apartments, Building C",
      price: "$25/hr",
      priceValue: 25,
      category: "Moving",
      description: "Help moving furniture to a new apartment on campus. Lifting required.",
      image: "https://images.unsplash.com/photo-1534710961216-75c88202f43e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "task5",
      title: "Website Design Help",
      date: "Monday, 6:00 PM",
      price: "$40/hr",
      priceValue: 40,
      location: "Remote",
      category: "Digital Services",
      description: "Need help with designing a personal portfolio website using React.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "task6",
      title: "English Essay Review",
      date: "Tuesday, 1:00 PM",
      price: "$25/hr",
      priceValue: 25,
      location: "Library, 2nd Floor",
      category: "Academic Help",
      description: "Need someone to review and edit a 5-page essay on American Literature.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop"
    }
  ]);

  const [badges, setBadges] = useState([
    {
      id: "badge1",
      name: "Quick Responder",
      description: "Responded to 10 requests within 1 hour",
      icon: <BadgeCheck className="h-6 w-6 text-green-500" />,
      color: "bg-green-100"
    },
    {
      id: "badge2",
      name: "Math Tutor",
      description: "Completed 5 math tutoring sessions",
      icon: <Award className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100"
    },
    {
      id: "badge3",
      name: "5-Star Helper",
      description: "Received 5 five-star ratings",
      icon: <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />,
      color: "bg-yellow-100"
    },
    {
      id: "badge4",
      name: "Top Earner",
      description: "Earned over $200 in a month",
      icon: <Trophy className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100"
    }
  ]);
  
  const [visibleTasks, setVisibleTasks] = useState(6);
  const totalTasks = availableTasks.length;
  
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (!userSession) {
      navigate("/welcome", { replace: true });
      return;
    }

    try {
      const sessionData = JSON.parse(userSession);
      const isStudentEmail = sessionData.email?.includes(".edu") || 
        sessionData.email?.includes("ac.uk") || 
        sessionData.email?.includes("edu.au") ||
        sessionData.isStudent === true;
      
      setIsStudent(isStudentEmail);
      
      if (!isStudentEmail) {
        toast.error("This page is only accessible to student accounts");
        navigate("/main-menu", { replace: true });
      }
      
      if (sessionData.firstName) {
        setUserName(sessionData.firstName);
      }

      if (sessionData.campus) {
        setCampus(sessionData.campus);
      }
    } catch (error) {
      console.error("Error parsing user session:", error);
      navigate("/welcome", { replace: true });
    }
  }, [navigate]);

  const handleToggleFavoriteView = () => {
    setShowFavorites(!showFavorites);
  };

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleAcceptTask = (task: typeof availableTasks[0]) => {
    setSelectedGig(task);
    setShowConfirmationDialog(true);
  };
  
  const confirmAcceptTask = () => {
    setShowConfirmationDialog(false);
    
    const newTask = {
      title: selectedGig?.title || "",
      date: selectedGig?.date || "",
      status: "Confirmed",
      earnings: selectedGig?.price || "",
      category: selectedGig?.category || "",
      location: selectedGig?.location || ""
    };
    
    setUpcomingTasks([...upcomingTasks, newTask]);
    
    if (selectedGig) {
      setAvailableTasks(availableTasks.filter(task => task.id !== selectedGig.id));
    }
    
    setShowSuccessConfetti(true);
    
    toast.success("Task accepted successfully!");
  };

  const filteredTasks = availableTasks.filter(task => {
    const matchesSearch = searchText === "" || 
      task.title.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase()) ||
      task.category.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(task.category);
    
    const minPriceValue = minPrice === "" ? 0 : parseInt(minPrice);
    const maxPriceValue = maxPrice === "" ? Infinity : parseInt(maxPrice);
    const matchesPrice = task.priceValue >= minPriceValue && 
      task.priceValue <= maxPriceValue;
    
    const matchesLocation = selectedLocations.length === 0 || 
      selectedLocations.includes(task.location);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesLocation;
  });

  const categories = [...new Set(availableTasks.map(task => task.category))];
  
  const locations = [...new Set(availableTasks.map(task => task.location))];

  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleLocationFilter = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location) 
        : [...prev, location]
    );
  };

  const resetFilters = () => {
    setSearchText("");
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedLocations([]);
    setIsFilterOpen(false);
  };

  const loadMoreTasks = () => {
    setVisibleTasks(prev => Math.min(prev + 3, totalTasks));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-8">
      <div className="pt-4 px-4">
        <MainHeader 
          userName={userName}
          profileImage={profileImage}
          showFavorites={showFavorites}
          onToggleFavoriteView={handleToggleFavoriteView}
          onSetActiveTab={handleSetActiveTab}
          assistPoints={750}
          balance={currentBalance}
          campus={campus}
        />
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <Tabs defaultValue="dashboard" onValueChange={setActiveTab} className="space-y-8">
          <TabsContent value="dashboard" className="mt-6 space-y-8 animate-fade-in">
            <section className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">My Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="rounded-lg bg-gradient-to-r from-purple-500/90 to-indigo-500/90 p-6 text-white">
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-6 w-6 mr-2" />
                        <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
                      </div>
                      <p className="text-sm text-blue-50 mt-1">Your scheduled tasks</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white"
                      onClick={() => setActiveTab("requests")}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-3 mt-2">
                    {upcomingTasks.slice(0, 2).map((task, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-3">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{task.title}</h4>
                          <span className="text-green-300 font-medium">{task.earnings}</span>
                        </div>
                        <div className="flex items-center text-sm text-blue-50 mt-1">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span>{task.date}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{task.location}</span>
                        </div>
                      </div>
                    ))}
                    
                    {upcomingTasks.length === 0 && (
                      <div className="text-center py-4 bg-white/10 rounded-lg">
                        <p className="text-sm">No upcoming tasks</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">Balance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-blue-500 mb-1">
                        <Coins className="h-5 w-5 mx-auto" />
                      </div>
                      <p className="text-sm text-gray-600">Current Balance</p>
                      <p className="text-xl font-bold text-gray-900">${currentBalance.toFixed(2)}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-green-500 mb-1">
                        <Trophy className="h-5 w-5 mx-auto" />
                      </div>
                      <p className="text-sm text-gray-600">All-time Earnings</p>
                      <p className="text-xl font-bold text-gray-900">$1,270.80</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setActiveTab("balance")}
                    >
                      Manage Funds
                    </Button>
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-3">Badges and Points</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className={`${badge.color} rounded-lg p-4 text-center transition-transform hover:scale-105`}
                  >
                    <div className="flex justify-center mb-2">
                      {badge.icon}
                    </div>
                    <h4 className="font-medium text-gray-900">{badge.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("points")}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  View All Achievements
                </Button>
              </div>
            </section>
            
            <section id="available-tasks-section" className="bg-white rounded-xl shadow-md p-6 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-semibold mb-4 md:mb-0">Available Tasks</h2>
                
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-grow md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search tasks..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="pl-10 bg-gray-50 focus-visible:ring-blue-400"
                    />
                    {searchText && (
                      <button 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setSearchText("")}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className={cn(
                          "relative overflow-hidden group",
                          (selectedCategories.length > 0 || selectedLocations.length > 0 || minPrice || maxPrice) ?
                          "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500 border-blue-300" :
                          "bg-gradient-to-r from-blue-200/50 to-blue-100/50 hover:from-blue-300/60 hover:to-blue-200/60 border-blue-200"
                        )}
                      >
                        <Filter className={cn(
                          "h-4 w-4 relative z-10",
                          (selectedCategories.length > 0 || selectedLocations.length > 0 || minPrice || maxPrice) ? 
                          "text-white" : "text-gray-600 group-hover:text-gray-800"
                        )} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0 overflow-hidden border border-blue-100 shadow-lg rounded-lg">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sliders className="h-4 w-4" />
                          <h3 className="font-medium">Filter Options</h3>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="smallIcon" 
                          onClick={resetFilters}
                          className="h-7 w-7 text-white hover:bg-blue-600/20 hover:text-white"
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      
                      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div>
                          <h4 className="text-sm font-medium mb-2 text-gray-700">Categories</h4>
                          <div className="space-y-2 grid grid-cols-1">
                            {categories.map((category) => (
                              <div key={category} className="flex items-center gap-2">
                                <Checkbox 
                                  id={`category-${category}`} 
                                  checked={selectedCategories.includes(category)}
                                  onCheckedChange={() => toggleCategoryFilter(category)}
                                  className="text-blue-500 border-blue-200 data-[state=checked]:bg-blue-500"
                                />
                                <label 
                                  htmlFor={`category-${category}`} 
                                  className="text-sm cursor-pointer hover:text-blue-600"
                                >
                                  {category}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-3">
                          <h4 className="text-sm font-medium mb-2 text-gray-700">Price Range ($/hr)</h4>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              placeholder="Min" 
                              value={minPrice}
                              onChange={(e) => setMinPrice(e.target.value)}
                              className="w-full border-blue-200 focus-visible:ring-blue-400"
                            />
                            <span className="text-gray-400">to</span>
                            <Input 
                              type="number" 
                              placeholder="Max" 
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(e.target.value)}
                              className="w-full border-blue-200 focus-visible:ring-blue-400"
                            />
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-3">
                          <h4 className="text-sm font-medium mb-2 text-gray-700">Locations</h4>
                          <div className="space-y-2 grid grid-cols-1 max-h-40 overflow-y-auto pr-1">
                            {locations.map((location) => (
                              <div key={location} className="flex items-center gap-2">
                                <Checkbox 
                                  id={`location-${location}`} 
                                  checked={selectedLocations.includes(location)}
                                  onCheckedChange={() => toggleLocationFilter(location)}
                                  className="text-blue-500 border-blue-200 data-[state=checked]:bg-blue-500"
                                />
                                <label 
                                  htmlFor={`location-${location}`} 
                                  className="text-sm cursor-pointer hover:text-blue-600"
                                >
                                  {location}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={resetFilters}
                          className="text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        >
                          Reset All
                        </Button>
                        <Button 
                          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-sm"
                          size="sm"
                          onClick={() => setIsFilterOpen(false)}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    onClick={() => setActiveTab("calendar")}
                  >
                    View All
                  </Button>
                </div>
              </div>
              
              {(selectedCategories.length > 0 || selectedLocations.length > 0 || minPrice || maxPrice) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCategories.map((category) => (
                    <Badge 
                      key={`filter-${category}`}
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200 gap-1"
                    >
                      {category}
                      <button 
                        onClick={() => toggleCategoryFilter(category)}
                        className="ml-1 hover:text-blue-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  
                  {(minPrice || maxPrice) && (
                    <Badge 
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200 gap-1"
                    >
                      {minPrice && maxPrice 
                        ? `$${minPrice}-$${maxPrice}/hr` 
                        : minPrice 
                          ? `>$${minPrice}/hr` 
                          : `<$${maxPrice}/hr`}
                      <button 
                        onClick={() => {
                          setMinPrice("");
                          setMaxPrice("");
                        }}
                        className="ml-1 hover:text-blue-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  
                  {selectedLocations.map((location) => (
                    <Badge 
                      key={`filter-${location}`}
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200 gap-1"
                    >
                      {location}
                      <button 
                        onClick={() => toggleLocationFilter(location)}
                        className="ml-1 hover:text-blue-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="h-6 px-2 py-0 text-sm text-blue-600 hover:bg-blue-50"
                  >
                    Clear All
                  </Button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.slice(0, visibleTasks).map((task) => (
                  <div key={task.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={task.image} 
                        alt={task.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <Badge className={
                          task.category === "Academic Help" ? "bg-yellow-100 text-yellow-800" :
                          task.category === "Digital Services" ? "bg-purple-100 text-purple-800" :
                          task.category === "Moving" ? "bg-green-100 text-green-800" :
                          "bg-blue-100 text-blue-800"
                        }>
                          {task.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{task.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center text-sm font-medium text-green-600">
                          <Coins className="h-4 w-4 mr-2 text-green-500" />
                          <span>{task.price}</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleAcceptTask(task)}
                        className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 text-white"
                      >
                        Accept Task
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredTasks.length > 0 && visibleTasks < filteredTasks.length && (
                <div className="mt-8 text-center">
                  <Button 
                    onClick={loadMoreTasks}
                    variant="outline"
                    size="lg"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 group"
                  >
                    Load More Tasks
                    <ChevronDown className="h-4 w-4 ml-1 group-hover:animate-bounce" />
                  </Button>
                </div>
              )}
              
              {filteredTasks.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No matching tasks found</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Try adjusting your search or filters to find available tasks that match your criteria.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </section>
          </TabsContent>
          <TabsContent value="requests">
            <section className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">My Requests</h2>
              <p>This is where the student requests will go</p>
            </section>
          </TabsContent>
          <TabsContent value="balance">
            <section className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">My Balance</h2>
              <StudentBalance />
            </section>
          </TabsContent>
          <TabsContent value="points">
            <section className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">My Points</h2>
              <StudentPoints />
            </section>
          </TabsContent>
          <TabsContent value="calendar">
            <section className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">My Calendar</h2>
              <StudentCalendar tasks={upcomingTasks} />
            </section>
          </TabsContent>
        </Tabs>
      </div>
      
      {showConfirmationDialog && selectedGig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-2">Confirm Task Acceptance</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to accept this task?</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium">{selectedGig.title}</h3>
              <div className="text-sm text-gray-600 mt-1 space-y-1">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>{selectedGig.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{selectedGig.location}</span>
                </div>
                <div className="flex items-center text-green-600 font-medium">
                  <Coins className="h-4 w-4 mr-2" />
                  <span>{selectedGig.price}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmationDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={confirmAcceptTask}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <ConfettiPopup
        isOpen={showSuccessConfetti}
        onClose={() => setShowSuccessConfetti(false)}
        title="Task Accepted!"
        description="You've successfully accepted this task. It has been added to your upcoming tasks."
        confirmText="View Calendar"
        onConfirm={() => {
          setShowSuccessConfetti(false);
          setActiveTab("calendar");
        }}
        secondaryText="Close"
        onSecondaryAction={() => setShowSuccessConfetti(false)}
        taskTitle={selectedGig?.title}
      />
    </div>
  );
};

export default StudentDashboard;
