
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserRound, Coins, CalendarIcon, ArrowDown, BadgeCheck } from "lucide-react";
import MainHeader from "@/components/main-menu/MainHeader";
import StudentBalance from "@/components/student/StudentBalance";
import StudentBadges from "@/components/student/StudentBadges";
import StudentCalendar from "@/components/student/StudentCalendar";
import StudentWithdrawal from "@/components/student/StudentWithdrawal";
import StudentPoints from "@/components/student/StudentPoints";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isStudent, setIsStudent] = useState(false);
  const [userName, setUserName] = useState("Student");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader 
        userName={userName}
        profileImage={profileImage}
        showFavorites={showFavorites}
        onToggleFavoriteView={handleToggleFavoriteView}
        onSetActiveTab={handleSetActiveTab}
        assistPoints={750} // Default student points
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Manage your student account, earnings, and rewards</p>
        </div>
        
        <Tabs defaultValue="dashboard" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 md:w-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              <span className="hidden md:inline">Earnings</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              <span className="hidden md:inline">Badges</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden md:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="withdrawal" className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4" />
              <span className="hidden md:inline">Withdrawal</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <StudentBalance minimal />
              <StudentPoints minimal />
              <StudentBadges minimal />
            </div>
            
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <h3 className="font-medium">Task Completed: Math Tutoring</h3>
                    <p className="text-sm text-gray-600">March 15, 2023</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+$45</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <h3 className="font-medium">Badge Earned: Quick Responder</h3>
                    <p className="text-sm text-gray-600">March 10, 2023</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">+50 points</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <h3 className="font-medium">Withdrawal Processed</h3>
                    <p className="text-sm text-gray-600">March 5, 2023</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">-$120</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="earnings">
            <StudentBalance />
          </TabsContent>
          
          <TabsContent value="badges">
            <StudentBadges />
          </TabsContent>
          
          <TabsContent value="calendar">
            <StudentCalendar />
          </TabsContent>
          
          <TabsContent value="withdrawal">
            <StudentWithdrawal />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
