
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserRound, Coins, CalendarIcon, ArrowDown, BadgeCheck, BookOpen } from "lucide-react";
import MainHeader from "@/components/main-menu/MainHeader";
import StudentBalance from "@/components/student/StudentBalance";
import StudentBadges from "@/components/student/StudentBadges";
import StudentCalendar from "@/components/student/StudentCalendar";
import StudentWithdrawal from "@/components/student/StudentWithdrawal";
import StudentPoints from "@/components/student/StudentPoints";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isStudent, setIsStudent] = useState(false);
  const [userName, setUserName] = useState("Student");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [upcomingTasks, setUpcomingTasks] = useState([
    {
      title: "Mathematics Tutoring",
      date: "Today, 3:00 PM",
      status: "Scheduled",
      earnings: "$45",
      category: "Academic Help"
    },
    {
      title: "Physics Study Group",
      date: "Tomorrow, 2:30 PM",
      status: "Pending",
      earnings: "$35",
      category: "Academic Help"
    },
    {
      title: "Website Debugging",
      date: "Friday, 4:00 PM",
      status: "Confirmed",
      earnings: "$60",
      category: "Digital Services"
    }
  ]);

  useEffect(() => {
    // Check if user is logged in as a student
    const userSession = localStorage.getItem("userSession");
    if (!userSession) {
      navigate("/welcome", { replace: true });
      return;
    }

    try {
      // Check if the user is a student by looking for an educational email
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
      
      // Set user name from session data
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Student Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your tasks, earnings, and rewards
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
            
            {/* Upcoming Tasks Section */}
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
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="mr-1.5 h-4 w-4" />
                        {task.date}
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-gray-200 text-gray-700">
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
            
            {/* Recent Activity Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <p className="text-sm text-gray-500">Your latest actions and updates</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors duration-150">
                  <div>
                    <h3 className="font-medium text-gray-900">Task Completed: Math Tutoring</h3>
                    <p className="text-sm text-gray-600">March 15, 2023</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+$45</Badge>
                </div>
                <div className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors duration-150">
                  <div>
                    <h3 className="font-medium text-gray-900">Badge Earned: Quick Responder</h3>
                    <p className="text-sm text-gray-600">March 10, 2023</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">+50 points</Badge>
                </div>
                <div className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors duration-150">
                  <div>
                    <h3 className="font-medium text-gray-900">Withdrawal Processed</h3>
                    <p className="text-sm text-gray-600">March 5, 2023</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">-$120</Badge>
                </div>
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
    </div>
  );
};

export default StudentDashboard;
