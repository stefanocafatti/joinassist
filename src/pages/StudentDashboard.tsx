import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserRound, Coins, CalendarIcon, BadgeCheck, Clock, MapPin, ThumbsUp, Filter, Search, X } from "lucide-react";
import MainHeader from "@/components/main-menu/MainHeader";
import StudentBalance from "@/components/student/StudentBalance";
import StudentPoints from "@/components/student/StudentPoints";
import StudentCalendar from "@/components/student/StudentCalendar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
          <TabsContent value="dashboard" className="mt-6 space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-soft-green to-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg text-gray-800">
                    <div className="bg-green-500/10 p-2 rounded-full mr-3">
                      <CalendarIcon className="h-5 w-5 text-green-600" />
                    </div>
                    Upcoming Tasks
                  </CardTitle>
                  <CardDescription>Tasks you need to complete</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  {upcomingTasks.length > 0 ? (
                    <div className="space-y-2">
                      {upcomingTasks.slice(0, 2).map((task, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                              ${task.status === "Confirmed" ? "bg-green-100" : 
                              task.status === "Pending" ? "bg-yellow-100" : "bg-blue-100"}`}>
                              {task.status === "Confirmed" ? 
                                <CheckCircle className="h-4 w-4 text-green-600" /> : 
                                <Clock className="h-4 w-4 text-yellow-600" />
                              }
                            </div>
                            <div className="ml-2">
                              <p className="text-sm font-medium text-gray-900 line-clamp-1">{task.title}</p>
                              <p className="text-xs text-gray-500">{task.date}</p>
                            </div>
                          </div>
                          <Badge className={`text-xs ${
                            task.status === "Confirmed" ? "bg-green-100 text-green-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {task.status}
                          </Badge>
                        </div>
                      ))}
                      {upcomingTasks.length > 2 && (
                        <button 
                          className="text-xs text-assist-blue hover:text-assist-blue/80 mt-2 font-medium"
                          onClick={() => setActiveTab("calendar")}
                        >
                          View all {upcomingTasks.length} tasks
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-sm text-gray-500">No upcoming tasks</p>
                      <button 
                        className="text-xs text-assist-blue hover:text-assist-blue/80 mt-2 font-medium"
                        onClick={() => document.getElementById('available-tasks-section')?.scrollIntoView({behavior: 'smooth'})}
                      >
                        Browse available tasks
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
