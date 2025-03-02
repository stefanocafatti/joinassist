import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import TaskCategories from "@/components/main-menu/TaskCategories";

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
  const [showWelcome, setShowWelcome] = useState(false); // Set to false by default
  const [activeTab, setActiveTab] = useState("allTasks"); // Changed to allTasks as default
  const [searchResults, setSearchResults] = useState<typeof recommendedTasks | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedTask, setSelectedTask] = useState<(typeof recommendedTasks)[0] | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [favoriteTaskIds, setFavoriteTaskIds] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [assistPoints, setAssistPoints] = useState(mockUser.assistPoints);
  const [recentlyViewedTasks, setRecentlyViewedTasks] = useState<typeof recommendedTasks>([]);
  const [submittedRequests, setSubmittedRequests] = useState(mockSubmittedRequests);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Function to add a task to recently viewed
  const addToRecentlyViewed = (task: (typeof recommendedTasks)[0]) => {
    setRecentlyViewedTasks(prev => {
      // Remove the task if it already exists (to avoid duplicates)
      const filteredTasks = prev.filter(t => t.title !== task.title);
      // Add the task to the beginning of the array (most recent first)
      return [task, ...filteredTasks].slice(0, 5); // Keep only the 5 most recent tasks
    });
  };

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
        return prev.filter(id => id !== taskTitle);
      } else {
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
    }
  };

  const handleRequestTask = () => {
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
  };

  const handleBookNow = (taskTitle: string) => {
    // Find the task in all possible sources
    const allTasks = [
      ...recommendedTasks,
      ...(searchResults || [])
    ];

    // Look through TaskCategories component's task listings if not found in main tasks
    let task = allTasks.find(t => t.title === taskTitle);
    
    // If not found in the main arrays, check in the task listings from TaskCategories
    if (!task) {
      // Import task listings from the TaskCategories component
      const taskListings = [
        {
          title: "Clean my Windows",
          category: "Cleaning",
          description: "Help with cleaning exterior windows",
          location: "Westwood",
          image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop"
        },
        {
          title: "Grocery Delivery",
          category: "Delivery",
          description: "Deliver groceries from Trader Joe's",
          location: "Santa Monica",
          image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop"
        },
        {
          title: "Moving Assistance",
          category: "Transportation",
          description: "Help moving furniture to new apartment",
          location: "UCLA Campus",
          image: "/lovable-uploads/72545c93-f781-402e-ad25-5cd509be453c.png"
        },
        {
          title: "Assemble IKEA Furniture",
          category: "Assembly",
          description: "Need help putting together a desk and chair",
          location: "Brentwood",
          image: "/lovable-uploads/83abea36-642f-4147-865a-c43794680e3b.png"
        },
        {
          title: "Teach me Math",
          category: "Academic Help",
          description: "Need tutoring for Calculus",
          location: "UCLA Library",
          image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
        },
        {
          title: "Video Editing",
          category: "Digital Services",
          description: "Edit a 5-minute YouTube video",
          location: "Remote",
          image: "/lovable-uploads/59f9c5bb-dd82-404c-8be9-9aaf7188bded.png"
        },
        {
          title: "Meal Prep",
          category: "Fitness & Wellness",
          description: "Prepare healthy meals for the week",
          location: "Your Kitchen",
          image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1000&auto=format&fit=crop"
        },
        {
          title: "Event Setup",
          category: "Event & Hospitality",
          description: "Help setting up for a birthday party",
          location: "Venice Beach",
          image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop"
        },
        {
          title: "Water my Plants",
          category: "Special Tasks",
          description: "Take care of houseplants while I'm away",
          location: "Marina Del Rey",
          image: "/lovable-uploads/55ae04cd-8676-4a1c-b2b3-36c7005144af.png"
        },
        // Include additional task listings
        {
          title: "Dog Walking Service",
          category: "Pets",
          description: "Regular walks for friendly dogs",
          location: "Culver City",
          image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1000&auto=format&fit=crop"
        },
        {
          title: "Kitchen Deep Clean",
          category: "Cleaning",
          description: "Professional kitchen cleaning",
          location: "Brentwood",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
        },
        {
          title: "Food Delivery",
          category: "Delivery",
          description: "Restaurant food delivery service",
          location: "Century City",
          image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop"
        },
        {
          title: "TV Mounting",
          category: "Assembly",
          description: "Mount your TV on any wall type",
          location: "West Hollywood",
          image: "https://images.unsplash.com/photo-1593784991095-a205069533cd?q=80&w=1000&auto=format&fit=crop"
        },
        {
          title: "Essay Proofreading",
          category: "Academic Help",
          description: "Professional proofreading service",
          location: "UCLA Campus",
          image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1000&auto=format&fit=crop"
        },
        {
          title: "Website Development",
          category: "Digital Services",
          description: "Custom website creation",
          location: "Remote",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
        },
      ];
      
      task = taskListings.find(t => t.title === taskTitle);
      
      // Also check the tasks from category view
      if (!task) {
        // Extract task titles from categories
        const categoryTasks = [
          "Wash my Car", "Clean my Garage", "Clean my Room", "Deep Clean Apartment", "Post Event Clean Up",
          "Moving Assistance", "Help with Loading Items", "Drive me to a Location", "Drop or Pick up a Package", "Bike/Scooter Delivery",
          "Assemble my Bed Frame", "Assemble IKEA Furniture", "Install my TV Mount", "Install a Shelf", "Assemble Office Desk",
          "Writing Essays", "Teach me Math", "SAT/ACT Prep", "Proofread my Paper", "Study Buddy/Tutor",
          "Code a Website", "Video Editing", "Graphic Design Support", "Fix my Bugs", "Social Media Content",
          "Meal Prep", "Personal Training", "Yoga Instruction", "Home Workout Plans", "Nutrition Counseling",
          "Catering Assistance", "Event Setup/Decoration", "DJ for Event", "Photographers for Events", "Party Coordinator",
          "Do my Laundry", "Water my plants", "Grocery Store Delivery", "Help me Pack for a Trip", "Organize my Closet",
          "Content Creation for Ads", "Brand Ambassador", "Social Media Management", "Market Research", "Product Testing",
          "Fix a Leaky Faucet", "Install Light Fixtures", "Hang Pictures/Shelves", "Gutter Cleaning", "Gardening and Lawn Care",
          "Drive Car to Service", "Interior Car Detailing", "Car Wash & Waxing", "Help with Tire Change", "Jump Start Battery",
          "Package Drop-off", "Shopping Assistant", "Prescription Pickup", "Mail Collection", "Bank Deposit Run"
        ];
        
        // If this is a task title without description, create a default task
        if (categoryTasks.includes(taskTitle) || categoryTasks.includes(taskTitle.replace(/^[\p{Emoji}\s]+/u, '').trim())) {
          // Clean up the task title (remove emojis)
          const cleanTitle = taskTitle.replace(/^[\p{Emoji}\s]+/u, '').trim();
          
          // Create a default task object
          task = {
            title: cleanTitle,
            description: `Help needed with ${cleanTitle}`,
            category: "Special Tasks", // Default category
            location: "Los Angeles", // Default location
            image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1000&auto=format&fit=crop" // Default image
          };
        }
      }
    }
    
    if (task) {
      setSelectedTask(task);
      setIsTaskDetailOpen(true);
      // Add to recently viewed when viewing task details
      addToRecentlyViewed(task);
    } else {
      console.error(`Task not found: ${taskTitle}`);
    }
  };

  const handleBookTask = (
    taskTitle: string, 
    date: Date, 
    time: string,
    priceType?: string,
    price?: number,
    location?: string,
    additionalInfo?: string
  ) => {
    // Add fixed points instead of calculating from task price
    const pointsToAdd = 50;
    
    setAssistPoints(prevPoints => prevPoints + pointsToAdd);
    
    setUser(prevUser => ({
      ...prevUser,
      assistPoints: prevUser.assistPoints + pointsToAdd
    }));

    // Add the task to submitted requests
    const newRequest = {
      id: Math.random().toString(36).substr(2, 9),
      title: taskTitle,
      date: format(date, "PPP"),
      location: location || "Not specified",
      price: priceType === "hourly" ? `$${price}/hr` : `$${price}`,
      status: "Pending",
      provider: "",
      additionalInfo: additionalInfo
    };
    
    // Update the submitted requests list
    setSubmittedRequests(prevRequests => [newRequest, ...prevRequests]);
    
    // Close the task detail modal
    setIsTaskDetailOpen(false);
    
    // Switch to the requests tab to show the new submission
    setActiveTab("requests");
  };

  const getFavoriteListings = () => {
    // Include all possible sources for tasks
    const allTasks = [...recommendedTasks, ...(searchResults || [])];
    
    // Get all tasks that match the favorited IDs
    return allTasks.filter(task => favoriteTaskIds.includes(task.title));
  };

  const toggleFavoriteView = () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      setActiveTab("favorites"); // Set the active tab to favorites when showing favorites
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
      return <RequestsTab requests={submittedRequests} onNavigateToHome={() => setActiveTab("home")} />;
    } else if (activeTab === "store") {
      return <StoreTab 
        assistPoints={assistPoints} 
        onPointsUpdated={handlePointsUpdated} 
      />;
    } else if (activeTab === "favorites" || showFavorites) {
      const favorites = getFavoriteListings();
      return (
        <FavoritesSection 
          favorites={favorites} 
          favoriteTaskIds={favoriteTaskIds}
          onFavoriteToggle={handleFavoriteToggle}
          onBookNow={handleBookNow}
          onHideSection={() => {
            setShowFavorites(false);
            setActiveTab("home");
          }}
        />
      );
    } else if (activeTab === "allTasks") {
      return (
        <TaskCategories 
          showAllTasks={true}
          favoriteTaskIds={favoriteTaskIds}
          onFavoriteToggle={handleFavoriteToggle}
          onViewTask={handleBookNow}
        />
      );
    }
    
    return (
      <HomeTabContent
        searchQuery={searchQuery}
        searchPerformed={searchPerformed}
        searchResults={searchResults}
        recommendedTasks={recommendedTasks}
        recentlyViewedTasks={recentlyViewedTasks}
        interestTags={interestTags}
        userInterests={userInterests}
        favoriteTaskIds={favoriteTaskIds}
        pastTasks={user.pastTasks}
        onToggleInterest={toggleInterest}
        onClearResults={handleClearSearchResults}
        onFavoriteToggle={handleFavoriteToggle}
        onBookNow={handleBookNow}
        onRequestTask={handleRequestTask}
        onSetActiveTab={setActiveTab}
        recentSearches={user.recentSearches}
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
            recentSearches={user.recentSearches}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
            onSearchClick={handleRecentSearchClick}
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
