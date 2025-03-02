import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CircleBlocks from "@/components/background/CircleBlocks";
import { PawPrint, Car, Home, Package, Briefcase } from "lucide-react";
import TaskDetailView from "@/components/ui/TaskDetailView";
import { format } from "date-fns";

// Import refactored components
import WelcomeOverlay from "@/components/main-menu/WelcomeOverlay";
import MainHeader from "@/components/main-menu/MainHeader";
import SearchHeader from "@/components/main-menu/SearchHeader";
import NavigationTabs from "@/components/main-menu/NavigationTabs";
import ProfileTab from "@/components/main-menu/ProfileTab";
import RequestsTab from "@/components/main-menu/RequestsTab";
import FavoritesSection from "@/components/main-menu/FavoritesSection";
import HomeTabContent from "@/components/main-menu/HomeTabContent";
import StoreTab from "@/components/main-menu/StoreTab";

const mockUser = {
  firstName: "Alex",
  lastName: "Smith",
  recentSearches: ["Dog walker", "House cleaning", "Grocery delivery"],
  preferences: [],
  pastTasks: [
    { id: "1", title: "Dog Walking", date: "May 15, 2023", status: "Completed" },
    { id: "2", title: "House Cleaning", date: "Apr 28, 2023", status: "Completed" },
    { id: "3", title: "Grocery Delivery", date: "Mar 10, 2023", status: "Completed" }
  ],
  paymentMethods: [
    { id: "1", type: "Credit Card", last4: "4242", brand: "Visa", isDefault: true },
    { id: "2", type: "Credit Card", last4: "1234", brand: "Mastercard", isDefault: false }
  ],
  assistPoints: 150,
  badges: [
    { id: "1", name: "Early Adopter", description: "Joined during our launch period", icon: "🏆" },
    { id: "2", name: "Task Master", description: "Completed 3 tasks", icon: "⭐" }
  ]
};

const interestTags = [
  { id: "pets", label: "Pets", icon: <PawPrint className="h-4 w-4 mr-1" /> },
  { id: "transport", label: "Transportation", icon: <Car className="h-4 w-4 mr-1" /> },
  { id: "housekeeping", label: "Home Services", icon: <Home className="h-4 w-4 mr-1" /> },
  { id: "delivery", label: "Delivery", icon: <Package className="h-4 w-4 mr-1" /> },
  { id: "work", label: "Professional Help", icon: <Briefcase className="h-4 w-4 mr-1" /> },
];

// Updated tasks without price and priceType
const recommendedTasks = [
  {
    title: "Dog Walking",
    description: "Regular walks for your furry friend",
    category: "Pets", 
    location: "Near Westwood",
    image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "House Cleaning",
    description: "Get your space spotless",
    category: "Home", 
    location: "Campus Area",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Grocery Delivery",
    description: "Get groceries delivered to your door",
    category: "Delivery", 
    location: "Santa Monica",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop"
  }
];

const mockSubmittedRequests = [
  {
    id: "1",
    title: "Dog Walking",
    date: "May 20, 2023",
    location: "Westwood",
    price: "$25/hr",
    status: "Confirmed",
    provider: "Jessica T."
  },
  {
    id: "2",
    title: "Furniture Assembly",
    date: "May 18, 2023",
    location: "Santa Monica",
    price: "$45",
    status: "Pending",
    provider: ""
  },
  {
    id: "3",
    title: "Grocery Delivery",
    date: "May 15, 2023",
    location: "UCLA Campus",
    price: "$30",
    status: "Rejected",
    provider: ""
  },
  {
    id: "4",
    title: "Car Ride to Airport",
    date: "May 10, 2023",
    location: "LAX",
    price: "$60",
    status: "Confirmed",
    provider: "Michael R."
  }
];

const MainMenu = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [userName, setUserName] = useState(mockUser.firstName);
  const [user, setUser] = useState(mockUser);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [searchResults, setSearchResults] = useState<typeof recommendedTasks | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedTask, setSelectedTask] = useState<(typeof recommendedTasks)[0] | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [favoriteTaskIds, setFavoriteTaskIds] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [assistPoints, setAssistPoints] = useState(mockUser.assistPoints);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateUserName = (firstName: string, lastName: string) => {
    setUser(prevUser => ({
      ...prevUser,
      firstName,
      lastName
    }));
    setUserName(firstName);
  };

  const handleUpdateProfile = (firstName: string, lastName: string, image: string | null) => {
    setUser(prevUser => ({
      ...prevUser,
      firstName,
      lastName
    }));
    setUserName(firstName);
    setProfileImage(image);
  };

  const handlePointsUpdated = (newPoints: number) => {
    setAssistPoints(newPoints);
    setUser(prevUser => ({
      ...prevUser,
      assistPoints: newPoints
    }));
  };

  const handleFavoriteToggle = (taskTitle: string) => {
    setFavoriteTaskIds(prev => {
      if (prev.includes(taskTitle)) {
        toast.success(`Removed ${taskTitle} from favorites`);
        return prev.filter(id => id !== taskTitle);
      } else {
        toast.success(`Added ${taskTitle} to favorites`);
        return [...prev, taskTitle];
      }
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchPerformed(true);
      
      const results = recommendedTasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
        task.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      
      if (results.length > 0) {
        toast.info(`Found ${results.length} results for "${searchQuery}"`);
      } else {
        toast.info(`No results found for "${searchQuery}"`);
      }
    }
  };

  const handleRequestTask = () => {
    toast.success("Task request submitted!", {
      description: "We'll notify our providers about this task request."
    });
    
    console.log(`Task requested: ${searchQuery}`);
    
    setSearchQuery("");
    setSearchResults(null);
    setSearchPerformed(false);
  };

  const toggleInterest = (id: string) => {
    setUserInterests(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
    
    toast.success(`Preferences updated!`);
  };

  const handleBookTask = (taskTitle: string, date: Date, time: string) => {
    // Add fixed points instead of calculating from task price
    const pointsToAdd = 50;
    
    setAssistPoints(prevPoints => prevPoints + pointsToAdd);
    
    toast.success(`You earned ${pointsToAdd} Assist Points!`, {
      description: "Points can be used for discounts on future tasks"
    });
    
    setUser(prevUser => ({
      ...prevUser,
      assistPoints: prevUser.assistPoints + pointsToAdd
    }));
    
    setIsTaskDetailOpen(false);
  };

  const handleBookNow = (taskTitle: string) => {
    toast.success(`Viewing task: ${taskTitle}`, {
      description: "You'll be redirected to the task details page"
    });
    
    console.log(`Viewing task: ${taskTitle}`);
    
    const task = [...recommendedTasks, ...(searchResults || [])].find(
      t => t.title === taskTitle
    );
    
    if (task) {
      setSelectedTask(task);
      setIsTaskDetailOpen(true);
    }
  };

  const getFavoriteListings = () => {
    const allTasks = [...recommendedTasks, ...(searchResults || [])];
    return allTasks.filter(task => favoriteTaskIds.includes(task.title));
  };

  const toggleFavoriteView = () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      toast.info("Showing your favorited listings");
    } else {
      setActiveTab("home");
    }
  };

  const handleClearSearchResults = () => {
    setSearchResults(null);
    setSearchPerformed(false);
    setSearchQuery("");
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    handleSearch(new Event('submit') as any);
  };

  const renderContent = () => {
    if (activeTab === "profile") {
      return <ProfileTab 
        user={user} 
        onUpdateUserName={handleUpdateUserName} 
        onUpdateProfile={handleUpdateProfile}
        profileImage={profileImage}
      />;
    } else if (activeTab === "requests") {
      return <RequestsTab requests={mockSubmittedRequests} onNavigateToHome={() => setActiveTab("home")} />;
    } else if (activeTab === "store") {
      return <StoreTab 
        assistPoints={assistPoints} 
        onPointsUpdated={handlePointsUpdated} 
      />;
    } else if (showFavorites) {
      const favorites = getFavoriteListings();
      return (
        <FavoritesSection 
          favorites={favorites} 
          favoriteTaskIds={favoriteTaskIds}
          onFavoriteToggle={handleFavoriteToggle}
          onBookNow={handleBookNow}
          onHideSection={() => setShowFavorites(false)}
        />
      );
    }
    
    return (
      <HomeTabContent
        searchQuery={searchQuery}
        searchPerformed={searchPerformed}
        searchResults={searchResults}
        recommendedTasks={recommendedTasks}
        interestTags={interestTags}
        userInterests={userInterests}
        favoriteTaskIds={favoriteTaskIds}
        recentSearches={user.recentSearches}
        pastTasks={user.pastTasks}
        onToggleInterest={toggleInterest}
        onClearResults={handleClearSearchResults}
        onFavoriteToggle={handleFavoriteToggle}
        onBookNow={handleBookNow}
        onRequestTask={handleRequestTask}
        onSearchClick={handleRecentSearchClick}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <CircleBlocks />
      
      <WelcomeOverlay userName={userName} showWelcome={showWelcome} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 relative z-10">
        <header className="mb-8">
          <MainHeader 
            userName={userName}
            profileImage={profileImage}
            showFavorites={showFavorites}
            onToggleFavoriteView={toggleFavoriteView}
            onSetActiveTab={setActiveTab}
            assistPoints={assistPoints}
          />
          
          <SearchHeader 
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </header>
        
        <NavigationTabs 
          activeTab={activeTab}
          showFavorites={showFavorites}
          onTabChange={setActiveTab}
          onToggleFavoriteView={toggleFavoriteView}
        />
        
        {renderContent()}
      </div>
      
      {selectedTask && (
        <TaskDetailView 
          isOpen={isTaskDetailOpen}
          onClose={() => setIsTaskDetailOpen(false)}
          onTaskBooked={handleBookTask}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default MainMenu;
