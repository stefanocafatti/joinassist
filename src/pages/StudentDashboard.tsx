import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserRound, Coins, CalendarIcon, BadgeCheck, Clock, MapPin, ThumbsUp, Filter, Search, X, Award, Star, Trophy } from "lucide-react";
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
            <section className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">My Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-6 w-6 mr-2" />
                        <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
                      </div>
                      <p className="text-sm text-blue-200 mt-1">Your scheduled gigs</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/20 hover:text-white"
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
                        <div className="flex items-center text-sm text-blue-200 mt-1">
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
                      <p className="text-xl font-bold text-gray-900">$345.00</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 text-center">
                      <div className="text-yellow-500 mb-1">
                        <CalendarIcon className="h-5 w-5 mx-auto" />
                      </div>
                      <p className="text-sm text-gray-600">Tasks Completed</p>
                      <p className="text-xl font-bold text-gray-900">8</p>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-3 text-center">
                      <div className="text-cyan-500 mb-1">
                        <Star className="h-5 w-5 mx-auto fill-yellow-500" />
                      </div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-xl font-bold text-gray-900">4.8</p>
                    </div>
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
