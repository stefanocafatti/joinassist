import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserRound, Coins, CalendarIcon, BadgeCheck, BookOpen, Clock, MapPin, ThumbsUp, Filter, Search, Sparkles, X, SlidersHorizontal } from "lucide-react";
import MainHeader from "@/components/main-menu/MainHeader";
import StudentBalance from "@/components/student/StudentBalance";
import StudentBadges from "@/components/student/StudentBadges";
import StudentCalendar from "@/components/student/StudentCalendar";
import StudentWithdrawal from "@/components/student/StudentWithdrawal";
import StudentPoints from "@/components/student/StudentPoints";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskDetailView from "@/components/ui/TaskDetailView";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Define props interface for TaskDetailView
interface TaskDetailViewProps {
  isOpen: boolean;
  task: any;
  onClose: () => void;
  onTaskBooked: (
    taskTitle: string,
    date: Date,
    time: string,
    priceType?: string,
    price?: number,
    location?: string,
    additionalInfo?: string
  ) => void;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isStudent, setIsStudent] = useState(false);
  const [userName, setUserName] = useState("Student");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterPriceRange, setFilterPriceRange] = useState("all");
  const [filterSkills, setFilterSkills] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [currentBalance, setCurrentBalance] = useState(345.50);
  const [campus, setCampus] = useState("University of Technology");
  const [viewMode, setViewMode] = useState<"provider" | "requester">("provider");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
      title: "Chemistry Tutoring",
      description: "Help a fellow student understand basic chemistry concepts",
      category: "Academic Help",
      location: "Campus Center",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop",
      rate: "$40/hr",
      rateNumeric: 40,
      skills: ["Chemistry", "Teaching"]
    },
    {
      title: "Resume Review",
      description: "Provide feedback on resumes for engineering students",
      category: "Academic Help",
      location: "Career Center",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
      rate: "$30/hr",
      rateNumeric: 30,
      skills: ["Writing", "Career Services"]
    },
    {
      title: "Mobile App Testing",
      description: "Test a new social media app and provide feedback",
      category: "Digital Services",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2074&auto=format&fit=crop",
      rate: "$25/hr",
      rateNumeric: 25,
      skills: ["Mobile", "Testing", "UX"]
    },
    {
      title: "Graphic Design Help",
      description: "Create social media graphics for student organization",
      category: "Digital Services",
      location: "Media Lab",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
      rate: "$35/hr",
      rateNumeric: 35,
      skills: ["Design", "Social Media"]
    },
    {
      title: "Fitness Training Session",
      description: "Lead a small group fitness session for beginners",
      category: "Fitness & Wellness",
      location: "Campus Gym",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop", 
      rate: "$40/hr",
      rateNumeric: 40,
      skills: ["Fitness", "Coaching"]
    },
    {
      title: "Essay Proofreading",
      description: "Proofread and provide feedback on academic essays",
      category: "Academic Help",
      location: "Library",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000&auto=format&fit=crop",
      rate: "$25/hr",
      rateNumeric: 25,
      skills: ["Writing", "Editing", "Grammar"]
    },
    {
      title: "Python Programming Help",
      description: "Assist with debugging a data analysis project",
      category: "Digital Services",
      location: "Computer Lab",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
      rate: "$45/hr",
      rateNumeric: 45,
      skills: ["Python", "Data Analysis", "Programming"]
    },
    {
      title: "Campus Tour Guide",
      description: "Lead campus tours for prospective students",
      category: "Campus Services",
      location: "Main Campus",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop",
      rate: "$20/hr",
      rateNumeric: 20,
      skills: ["Communication", "Campus Knowledge"]
    },
    {
      title: "Social Media Management",
      description: "Manage Instagram account for university club",
      category: "Digital Services",
      location: "Student Union",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2000&auto=format&fit=crop",
      rate: "$30/hr",
      rateNumeric: 30,
      skills: ["Social Media", "Content Creation"]
    },
    {
      title: "Language Conversation Partner",
      description: "Help international students practice conversational English",
      category: "Academic Help",
      location: "International Center",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
      rate: "$22/hr",
      rateNumeric: 22,
      skills: ["Languages", "Communication"]
    }
  ]);
  
  const [recentActivity, setRecentActivity] = useState([
    {
      title: "Task Completed: Math Tutoring",
      date: "March 15, 2023",
      amount: "+$45",
      type: "earning"
    },
    {
      title: "Badge Earned: Quick Responder",
      date: "March 10, 2023",
      amount: "+50 points",
      type: "badge"
    },
    {
      title: "Withdrawal Processed",
      date: "March 5, 2023",
      amount: "-$120",
      type: "withdrawal"
    }
  ]);

  const [locations, setLocations] = useState(["all", ...new Set(availableTasks.map(task => task.location))]);
  const [skills, setSkills] = useState(["all", ...new Set(availableTasks.flatMap(task => task.skills))]);
  const [priceRanges, setPriceRanges] = useState([
    { value: "all", label: "All Prices" },
    { value: "0-25", label: "$0-$25" },
    { value: "26-35", label: "$26-$35" },
    { value: "36+", label: "$36+" }
  ]);

  const [requests, setRequests] = useState([
    {
      id: "r1",
      title: "Math Tutoring",
      date: "May 10, 2023",
      location: "Library",
      price: "$45",
      status: "Confirmed",
      provider: "Alex K.",
      additionalInfo: "Calculus II session for 1.5 hours"
    },
    {
      id: "r2",
      title: "Room Cleaning",
      date: "May 12, 2023",
      location: "Dorm Building",
      price: "$30",
      status: "Pending",
      provider: "Pending Assignment",
      additionalInfo: "Deep cleaning of living area"
    },
    {
      id: "r3",
      title: "Grocery Delivery",
      date: "May 15, 2023",
      location: "Campus Store",
      price: "$25",
      status: "Pending",
      provider: "Pending Assignment",
      additionalInfo: "Weekend grocery run - see shopping list"
    }
  ]);

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

  const getCategoryColor = (category: string) => {
    const categoryColorMap: {[key: string]: string} = {
      "Academic Help": "bg-yellow-100 text-yellow-800",
      "Digital Services": "bg-red-100 text-red-800",
      "Fitness & Wellness": "bg-emerald-100 text-emerald-800",
    };
    
    return categoryColorMap[category] || "bg-gray-100 text-gray-800";
  };
  
  const handleViewTaskDetails = (task: any) => {
    setSelectedTask(task);
    setTaskDetailOpen(true);
  };
  
  const handleAcceptTask = (task: any, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newTask = {
      title: task.title,
      date: "Today, " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: "Pending",
      earnings: task.rate,
      category: task.category,
      location: task.location
    };
    
    setUpcomingTasks([...upcomingTasks, newTask]);
    toast.success(`Successfully accepted: ${task.title}`);
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
    const newTask = {
      title: taskTitle,
      date: `${date.toLocaleDateString()}, ${time}`,
      status: "Pending",
      earnings: `$${price}`,
      category: selectedTask?.category || "Academic Help",
      location: location || "Campus"
    };
    
    setUpcomingTasks([...upcomingTasks, newTask]);
    toast.success(`Successfully booked: ${taskTitle}`);
    setTaskDetailOpen(false);
  };
  
  const handleClearFilters = () => {
    setFilterCategory("all");
    setFilterLocation("all");
    setFilterPriceRange("all");
    setFilterSkills("all");
    setSearchText("");
  };

  const filteredTasks = availableTasks.filter(task => {
    if (searchText && !task.title.toLowerCase().includes(searchText.toLowerCase()) && 
        !task.description.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }
    
    if (filterCategory !== 'all' && task.category !== filterCategory) {
      return false;
    }
    
    if (filterLocation !== 'all' && task.location !== filterLocation) {
      return false;
    }
    
    if (filterPriceRange !== 'all') {
      const rate = task.rateNumeric;
      if (filterPriceRange === '0-25' && (rate < 0 || rate > 25)) return false;
      if (filterPriceRange === '26-35' && (rate < 26 || rate > 35)) return false;
      if (filterPriceRange === '36+' && rate < 36) return false;
    }
    
    if (filterSkills !== 'all' && !task.skills.includes(filterSkills)) {
      return false;
    }
    
    return true;
  });

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
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-assist-blue to-indigo-600 rounded-2xl p-6 shadow-md text-white">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <UserRound className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">My Dashboard</h1>
                <p className="text-white/80 mb-2">
                  Manage your tasks, earnings, and rewards
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-4 md:mt-0 md:items-end">
              <Badge className="bg-white text-assist-blue px-4 py-2 text-sm font-medium shadow-sm">
                Student Account
              </Badge>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" onValueChange={setActiveTab} className="space-y-8">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <TabsList className="flex w-full justify-between gap-1 p-1 bg-gray-100/70 rounded-lg">
              <TabsTrigger 
                value="dashboard" 
                className="flex-1 flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-assist-blue data-[state=active]:text-white rounded-lg transition-all duration-200 hover:bg-gray-200/80"
              >
                <UserRound className="h-5 w-5" />
                <span className="text-xs font-medium">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="earnings" 
                className="flex-1 flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-assist-blue data-[state=active]:text-white rounded-lg transition-all duration-200 hover:bg-gray-200/80"
              >
                <Coins className="h-5 w-5" />
                <span className="text-xs font-medium">Earnings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="badges" 
                className="flex-1 flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-assist-blue data-[state=active]:text-white rounded-lg transition-all duration-200 hover:bg-gray-200/80"
              >
                <BadgeCheck className="h-5 w-5" />
                <span className="text-xs font-medium">Badges</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="flex-1 flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-assist-blue data-[state=active]:text-white rounded-lg transition-all duration-200 hover:bg-gray-200/80"
              >
                <CalendarIcon className="h-5 w-5" />
                <span className="text-xs font-medium">Calendar</span>
              </TabsTrigger>
              <TabsTrigger 
                value="payments" 
                className="flex-1 flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-assist-blue data-[state=active]:text-white rounded-lg transition-all duration-200 hover:bg-gray-200/80"
              >
                <Coins className="h-5 w-5" />
                <span className="text-xs font-medium">Payments</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="mt-6 space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-soft-blue to-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg text-gray-800">
                    <div className="bg-assist-blue/10 p-2 rounded-full mr-3">
                      <Coins className="h-5 w-5 text-assist-blue" />
                    </div>
                    Balance
                  </CardTitle>
                  <CardDescription>Your current earnings</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <StudentBalance minimal />
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-soft-purple to-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg text-gray-800">
                    <div className="bg-purple-500/10 p-2 rounded-full mr-3">
                      <BadgeCheck className="h-5 w-5 text-purple-500" />
                    </div>
                    Achievements
                  </CardTitle>
                  <CardDescription>Your earned badges</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <StudentPoints minimal />
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-soft-yellow to-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg text-gray-800">
                    <div className="bg-yellow-500/10 p-2 rounded-full mr-3">
                      <BookOpen className="h-5 w-5 text-yellow-600" />
                    </div>
                    Learning
                  </CardTitle>
                  <CardDescription>Your skills progress</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <StudentBadges minimal />
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">Available Tasks</h2>
                  </div>
                  <p className="text-sm text-gray-500">Find opportunities to earn</p>
                </div>
                
                <div className="mt-5 flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search tasks..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full pl-9 border-assist-blue/20 focus:border-assist-blue"
                    />
                  </div>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        className="bg-gradient-to-r from-assist-blue to-indigo-600 hover:bg-assist-blue/90 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                        {(filterCategory !== 'all' || filterLocation !== 'all' || filterPriceRange !== 'all' || filterSkills !== 'all') && (
                          <Badge className="ml-2 bg-white text-assist-blue">
                            {(filterCategory !== 'all' ? 1 : 0) + 
                            (filterLocation !== 'all' ? 1 : 0) + 
                            (filterPriceRange !== 'all' ? 1 : 0) + 
                            (filterSkills !== 'all' ? 1 : 0)}
                          </Badge>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0 border-none rounded-xl shadow-xl">
                      <div className="p-5 bg-gradient-to-r from-assist-blue to-indigo-600 rounded-t-xl">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-white flex items-center">
                            <Filter className="h-5 w-5 mr-2" />
                            Filter Tasks
                          </h3>
                          <Button 
                            size="smallIcon" 
                            variant="ghost" 
                            className="text-white hover:bg-white/20 rounded-full"
                            onClick={handleClearFilters}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Category</label>
                          <Select value={filterCategory} onValueChange={setFilterCategory}>
                            <SelectTrigger className="w-full bg-white border-gray-200">
                              <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="Academic Help">Academic Help</SelectItem>
                              <SelectItem value="Digital Services">Digital Services</SelectItem>
                              <SelectItem value="Fitness & Wellness">Fitness & Wellness</SelectItem>
                              <SelectItem value="Campus Services">Campus Services</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Location</label>
                          <Select value={filterLocation} onValueChange={setFilterLocation}>
                            <SelectTrigger className="w-full bg-white border-gray-200">
                              <SelectValue placeholder="All Locations" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location === "all" ? "All Locations" : location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Price Range</label>
                          <Select value={filterPriceRange} onValueChange={setFilterPriceRange}>
                            <SelectTrigger className="w-full bg-white border-gray-200">
                              <SelectValue placeholder="All Prices" />
                            </SelectTrigger>
                            <SelectContent>
                              {priceRanges.map((range) => (
                                <SelectItem key={range.value} value={range.value}>
                                  {range.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Skills</label>
                          <Select value={filterSkills} onValueChange={setFilterSkills}>
                            <SelectTrigger className="w-full bg-white border-gray-200">
                              <SelectValue placeholder="All Skills" />
                            </SelectTrigger>
                            <SelectContent>
                              {skills.map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                  {skill === "all" ? "All Skills" : skill}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="pt-2 flex justify-between">
                          <Button 
                            variant="outline" 
                            className="border-gray-200"
                            onClick={handleClearFilters}
                          >
                            Reset
                          </Button>
                          <Button 
                            className="bg-assist-blue hover:bg-assist-blue/90"
                          >
                            Apply Filters
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {filteredTasks.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-gray-500">No tasks match your filters. Try adjusting your search criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-assist-blue text-assist-blue"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTasks.map((task, index) => (
                    <div 
                      key={index}
                      className="rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-300 hover:border-assist-blue/50 bg-white"
                      onClick={() => handleViewTaskDetails(task)}
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={task.image} 
                          alt={task.title} 
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{task.title}</h3>
                          <Badge className={getCategoryColor(task.category)}>
                            {task.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center text-gray-500">
                            <MapPin className="mr-1 h-3.5 w-3.5" />
                            {task.location}
                          </div>
                          <span className="font-bold text-assist-blue">{task.rate}</span>
                        </div>
                        <div className="mt-3 mb-3">
                          <div className="flex flex-wrap gap-1">
                            {task.skills.map((skill, i) => (
                              <span key={i} className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <Button 
                            className="w-full bg-assist-blue hover:bg-assist-blue/90 font-medium" 
                            size="sm"
                            onClick={(e) => handleAcceptTask(task, e)}
                          >
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Accept Task
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-5">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-assist-blue mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
                </div>
                <p className="mt-1 text-sm text-gray-500 ml-7">Your scheduled work for this week</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="p-5 hover:bg-blue-50/30 transition-colors duration-150">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <Badge className={getCategoryColor(task.category)}>
                        {task.category}
                      </Badge>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{task.date}</p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="mr-1 h-3.5 w-3.5" />
                        {task.location}
                      </div>
                      <span className="font-bold text-assist-blue">{task.earnings}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Button 
                        className="w-full bg-assist-blue hover:bg-assist-blue/90 font-medium" 
                        size="sm"
                        onClick={(e) => handleAcceptTask(task, e)}
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Accept Task
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="earnings" className="mt-6 space-y-4">
            <StudentBalance />
          </TabsContent>
          
          <TabsContent value="badges" className="mt-6 space-y-4">
            <StudentBadges />
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-6 space-y-4">
            <StudentCalendar />
          </TabsContent>
          
          <TabsContent value="payments" className="mt-6 space-y-4">
            <StudentWithdrawal />
          </TabsContent>
        </Tabs>
      </div>
      
      {taskDetailOpen && selectedTask && (
        <TaskDetailView
          isOpen={taskDetailOpen}
          task={selectedTask}
          onClose={() => setTaskDetailOpen(false)}
          onTaskBooked={handleTaskBooked}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
