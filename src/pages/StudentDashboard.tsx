
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
import ConfettiPopup from "@/components/ui/ConfettiPopup";

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
  
  const [availableGigs, setAvailableGigs] = useState([
    {
      id: "gig1",
      title: "Biology Tutoring",
      date: "Monday, 4:00 PM",
      location: "Science Building, Room 302",
      price: "$35/hr",
      category: "Academic Help",
      description: "Help a first-year student with biology fundamentals and lab preparation."
    },
    {
      id: "gig2",
      title: "Computer Science Project",
      date: "Wednesday, 2:30 PM",
      location: "Engineering Hall, Lab 104",
      price: "$45/hr",
      category: "Digital Services",
      description: "Assist with a Python programming project focused on data visualization."
    },
    {
      id: "gig3",
      title: "Math Homework Help",
      date: "Thursday, 5:00 PM",
      location: "University Center, Study Area",
      price: "$30/hr",
      category: "Academic Help",
      description: "Help with calculus problems and exam preparation."
    },
    {
      id: "gig4",
      title: "Move Furniture",
      date: "Saturday, 11:00 AM",
      location: "Student Apartments, Building C",
      price: "$25/hr",
      category: "Moving",
      description: "Help moving furniture to a new apartment on campus. Lifting required."
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
  
  const handleAcceptGig = (gig: typeof availableGigs[0]) => {
    setSelectedGig(gig);
    setShowConfirmationDialog(true);
  };
  
  const confirmAcceptGig = () => {
    setShowConfirmationDialog(false);
    
    // Add the gig to upcoming tasks
    const newTask = {
      title: selectedGig?.title || "",
      date: selectedGig?.date || "",
      status: "Confirmed",
      earnings: selectedGig?.price || "",
      category: selectedGig?.category || "",
      location: selectedGig?.location || ""
    };
    
    setUpcomingTasks([...upcomingTasks, newTask]);
    
    // Remove from available gigs
    if (selectedGig) {
      setAvailableGigs(availableGigs.filter(gig => gig.id !== selectedGig.id));
    }
    
    // Show success animation
    setShowSuccessConfetti(true);
    
    // Show toast notification
    toast.success("Gig accepted successfully!");
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
                                <ThumbsUp className="h-4 w-4 text-green-600" /> : 
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
                        onClick={() => document.getElementById('available-gigs-section')?.scrollIntoView({behavior: 'smooth'})}
                      >
                        Browse available gigs
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
            
            {/* Available Gigs Section */}
            <section id="available-gigs-section" className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">Available Gigs</h2>
              <div className="space-y-4">
                {availableGigs.map((gig) => (
                  <div key={gig.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-3 md:mb-0">
                        <h3 className="font-semibold text-lg">{gig.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center mt-2 space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{gig.date}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{gig.location}</span>
                          </div>
                          <div className="flex items-center font-medium text-green-600">
                            <Coins className="h-4 w-4 mr-1" />
                            <span>{gig.price}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{gig.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Button 
                          onClick={() => handleAcceptGig(gig)} 
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Accept Gig
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {availableGigs.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No available gigs at the moment.</p>
                    <p className="text-sm text-gray-400 mt-2">Check back later for new opportunities!</p>
                  </div>
                )}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Confirmation Dialog */}
      {showConfirmationDialog && selectedGig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-2">Confirm Gig Acceptance</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to accept this gig?</p>
            
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
                onClick={confirmAcceptGig}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Confetti Popup */}
      <ConfettiPopup
        isOpen={showSuccessConfetti}
        onClose={() => setShowSuccessConfetti(false)}
        title="Gig Accepted!"
        description="You've successfully accepted this gig. It has been added to your upcoming tasks."
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
