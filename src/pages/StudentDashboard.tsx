import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserRound, Coins, CalendarIcon, ArrowDown, BadgeCheck, BookOpen, Clock, CheckCircle, MapPin, ThumbsUp, Filter, DollarSign, Briefcase } from "lucide-react";
import MainHeader from "@/components/main-menu/MainHeader";
import StudentBalance from "@/components/student/StudentBalance";
import StudentBadges from "@/components/student/StudentBadges";
import StudentCalendar from "@/components/student/StudentCalendar";
import StudentWithdrawal from "@/components/student/StudentWithdrawal";
import StudentPoints from "@/components/student/StudentPoints";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskDetailView from "@/components/ui/TaskDetailView";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
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

  // Extract all unique locations, skills, and create price ranges
  const locations = ["all", ...new Set(availableTasks.map(task => task.location))];
  const skills = ["all", ...new Set(availableTasks.flatMap(task => task.skills))];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-25", label: "$0-$25" },
    { value: "26-35", label: "$26-$35" },
    { value: "36+", label: "$36+" }
  ];

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

  // Apply all filters
  const filteredTasks = availableTasks.filter(task => {
    // Filter by search text
    if (searchText && !task.title.toLowerCase().includes(searchText.toLowerCase()) && 
        !task.description.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (filterCategory !== 'all' && task.category !== filterCategory) {
      return false;
    }
    
    // Filter by location
    if (filterLocation !== 'all' && task.location !== filterLocation) {
      return false;
    }
    
    // Filter by price range
    if (filterPriceRange !== 'all') {
      const rate = task.rateNumeric;
      if (filterPriceRange === '0-25' && (rate < 0 || rate > 25)) return false;
      if (filterPriceRange === '26-35' && (rate < 26 || rate > 35)) return false;
      if (filterPriceRange === '36+' && rate < 36) return false;
    }
    
    // Filter by skills
    if (filterSkills !== 'all' && !task.skills.includes(filterSkills)) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <MainHeader 
        userName={userName}
        profileImage={profileImage}
        showFavorites={showFavorites}
        onToggleFavoriteView={handleToggleFavoriteView}
        onSetActiveTab={handleSetActiveTab}
        assistPoints={750} // Default student points
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <span className="bg-assist-blue/10 p-2 rounded-full mr-3">
                  <UserRound className="h-6 w-6 text-assist-blue" />
                </span>
                Student Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your tasks, earnings, and academic opportunities
              </p>
            </div>
            <Badge className="bg-assist-blue text-white px-3 py-1.5 text-sm">
              Student Account
            </Badge>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" onValueChange={setActiveTab} className="space-y-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <TabsList className="grid w-full grid-cols-5 gap-2">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-assist-blue data-[state=active]:text-white">
                <UserRound className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="earnings" className="flex items-center gap-2 data-[state=active]:bg-assist-blue data-[state=active]:text-white">
                <Coins className="h-4 w-4" />
                <span className="hidden md:inline">Earnings</span>
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex items-center gap-2 data-[state=active]:bg-assist-blue data-[state=active]:text-white">
                <BadgeCheck className="h-4 w-4" />
                <span className="hidden md:inline">Badges</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2 data-[state=active]:bg-assist-blue data-[state=active]:text-white">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden md:inline">Calendar</span>
              </TabsTrigger>
              <TabsTrigger value="withdrawal" className="flex items-center gap-2 data-[state=active]:bg-assist-blue data-[state=active]:text-white">
                <ArrowDown className="h-4 w-4" />
                <span className="hidden md:inline">Withdraw</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="mt-6 space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="overflow-hidden border-none shadow-soft hover:shadow-md transition-shadow duration-300">
                <CardHeader className="bg-soft-blue pb-2">
                  <CardTitle className="flex items-center text-lg text-gray-800">
                    <Coins className="mr-2 h-5 w-5 text-assist-blue" />
                    Balance
                  </CardTitle>
                  <CardDescription>Your current earnings</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <StudentBalance minimal />
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-soft hover:shadow-md transition-shadow duration-300">
                <CardHeader className="bg-soft-purple pb-2">
                  <CardTitle className="flex items-center text-lg text-gray-800">
                    <BadgeCheck className="mr-2 h-5 w-5 text-purple-500" />
                    Achievements
                  </CardTitle>
                  <CardDescription>Your earned badges</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <StudentPoints minimal />
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-soft hover:shadow-md transition-shadow duration-300">
                <CardHeader className="bg-soft-yellow pb-2">
                  <CardTitle className="flex items-center text-lg text-gray-800">
                    <BookOpen className="mr-2 h-5 w-5 text-yellow-600" />
                    Learning
                  </CardTitle>
                  <CardDescription>Your skills progress</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <StudentBadges minimal />
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">Available Tasks</h2>
                <p className="text-sm text-gray-500">Find opportunities to earn</p>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="col-span-2">
                    <Input
                      placeholder="Search tasks..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full h-9 bg-white">
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
                  
                  <Select value={filterLocation} onValueChange={setFilterLocation}>
                    <SelectTrigger className="w-full h-9 bg-white">
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
                  
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <Filter className="mr-2 h-4 w-4" />
                          More Filters
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Price Range</DropdownMenuLabel>
                        {priceRanges.map((range) => (
                          <DropdownMenuItem 
                            key={range.value}
                            className={filterPriceRange === range.value ? "bg-blue-50" : ""}
                            onClick={() => setFilterPriceRange(range.value)}
                          >
                            <DollarSign className="mr-2 h-4 w-4" />
                            {range.label}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Skills Required</DropdownMenuLabel>
                        {skills.map((skill) => (
                          <DropdownMenuItem 
                            key={skill}
                            className={filterSkills === skill ? "bg-blue-50" : ""}
                            onClick={() => setFilterSkills(skill)}
                          >
                            <Briefcase className="mr-2 h-4 w-4" />
                            {skill === "all" ? "All Skills" : skill}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={handleClearFilters}
                      title="Clear all filters"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 6 5 20M5 6l14 14"/>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
              
              {filteredTasks.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-gray-500">No tasks match your filters. Try adjusting your search criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
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
                      className="rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1 hover:border-assist-blue/20"
                      onClick={() => handleViewTaskDetails(task)}
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={task.image} 
                          alt={task.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
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
                          <span className="font-medium text-assist-blue">{task.rate}</span>
                        </div>
                        <div className="mt-2 mb-3">
                          <div className="flex flex-wrap gap-1">
                            {task.skills.map((skill, i) => (
                              <span key={i} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <Button 
                            className="w-full bg-assist-blue hover:bg-assist-blue/90" 
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
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
                <p className="text-sm text-gray-500">Your scheduled work for this week</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="p-5 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1.5 h-4 w-4" />
                          {task.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="mr-1.5 h-4 w-4" />
                          {task.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={
                          task.status === "Confirmed" ? "border-green-200 text-green-700 bg-green-50" :
                          task.status === "Scheduled" ? "border-blue-200 text-blue-700 bg-blue-50" :
                          "border-gray-200 text-gray-700"
                        }>
                          {task.status}
                        </Badge>
                        <span className="font-medium text-green-600">{task.earnings}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-end">
                <Button variant="outline" className="border-assist-blue text-assist-blue hover:bg-assist-blue/5">
                  View All Tasks
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <p className="text-sm text-gray-500">Your latest actions and updates</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors duration-150">
                    <div>
                      <h3 className="font-medium text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                    <Badge className={
                      activity.type === "earning" ? "bg-green-100 text-green-800" :
                      activity.type === "badge" ? "bg-purple-100 text-purple-800" :
                      "bg-blue-100 text-blue-800"
                    }>
                      {activity.amount}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="earnings" className="animate-fade-in">
            <StudentBalance />
          </TabsContent>
          
          <TabsContent value="badges" className="animate-fade-in">
            <StudentBadges />
          </TabsContent>
          
          <TabsContent value="calendar" className="animate-fade-in">
            <StudentCalendar />
          </TabsContent>
          
          <TabsContent value="withdrawal" className="animate-fade-in">
            <StudentWithdrawal />
          </TabsContent>
        </Tabs>
      </div>
      
      <TaskDetailView
        isOpen={taskDetailOpen}
        onClose={() => setTaskDetailOpen(false)}
        onTaskBooked={handleTaskBooked}
        task={selectedTask}
      />
    </div>
  );
};

export default StudentDashboard;
