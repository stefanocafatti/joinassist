
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CircleBlocks from "@/components/background/CircleBlocks";
import { PawPrint, Car, Home, Package, Briefcase } from "lucide-react";
import TaskDetailView from "@/components/ui/TaskDetailView";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import ConfettiPopup from "@/components/ui/ConfettiPopup";
import TaskRequestConfetti from "@/components/ui/TaskRequestConfetti";

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
  const location = useLocation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [userName, setUserName] = useState(mockUser.firstName);
  const [user, setUser] = useState(mockUser);
  const [showWelcome, setShowWelcome] = useState(false);
  const [activeTab, setActiveTab] = useState("allTasks");
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
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isCustomTaskModalOpen, setIsCustomTaskModalOpen] = useState(false);
  const [isConfettiOpen, setIsConfettiOpen] = useState(false);
  const [bookedTaskTitle, setBookedTaskTitle] = useState("");
  const [isRequestConfettiOpen, setIsRequestConfettiOpen] = useState(false);
  const [requestedTaskTitle, setRequestedTaskTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (location.state) {
      if (location.state.activeTab) {
        setActiveTab(location.state.activeTab);
      }
      if (location.state.selectedCategory) {
        setSelectedCategory(location.state.selectedCategory);
      }
    }
    
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.state]);

  const addToRecentlyViewed = (task: (typeof recommendedTasks)[0]) => {
    setRecentlyViewedTasks(prev => {
      const filteredTasks = prev.filter(t => t.title !== task.title);
      return [task, ...filteredTasks].slice(0, 5);
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

  const handleToggleNotifications = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
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
    console.log("Search triggered with query:", searchQuery);
    
    if (searchQuery.trim()) {
      setSearchPerformed(true);
      
      const results = recommendedTasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
        task.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const additionalResults = taskListings.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
        task.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const allResults = [...results];
      additionalResults.forEach(task => {
        if (!allResults.some(t => t.title === task.title)) {
          allResults.push(task);
        }
      });
      
      setSearchResults(allResults);
      
      setActiveTab("home");
      
      if (!user.recentSearches.includes(searchQuery)) {
        setUser(prevUser => ({
          ...prevUser,
          recentSearches: [searchQuery, ...prevUser.recentSearches].slice(0, 5)
        }));
      }
    }
  };

  const handleRequestTask = () => {
    setIsCustomTaskModalOpen(true);
  };

  const toggleInterest = (id: string) => {
    setUserInterests(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleBookNow = (taskTitle: string) => {
    const allTasks = [
      ...recommendedTasks,
      ...(searchResults || [])
    ];

    let task = allTasks.find(t => t.title === taskTitle);
    
    if (!task) {
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
      
      if (!task) {
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
        
        if (categoryTasks.includes(taskTitle) || categoryTasks.includes(taskTitle.replace(/^[\p{Emoji}\s]+/u, '').trim())) {
          const cleanTitle = taskTitle.replace(/^[\p{Emoji}\s]+/u, '').trim();
          
          task = {
            title: cleanTitle,
            description: `Help needed with ${cleanTitle}`,
            category: "Special Tasks",
            location: "Los Angeles",
            image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1000&auto=format&fit=crop"
          };
        }
      }
    }
    
    if (task) {
      setSelectedTask(task);
      setIsTaskDetailOpen(true);
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
    const pointsToAdd = 50;
    
    setAssistPoints(prevPoints => prevPoints + pointsToAdd);
    
    setUser(prevUser => ({
      ...prevUser,
      assistPoints: prevUser.assistPoints + pointsToAdd
    }));

    const newRequest = {
      id: Math.random().toString(36).substr(2, 9),
      title: taskTitle,
      date: format(date, "PPP"),
      location: location || "Not specified",
      price: priceType === "hourly" ? `$${price}/hr` : `$${price}`,
      status: "Pending",
      provider: "",
      additionalInfo
    };
    
    setSubmittedRequests(prevRequests => [newRequest, ...prevRequests]);
    
    setIsTaskDetailOpen(false);
    setIsCustomTaskModalOpen(false);
    
    if (taskTitle === "Custom Task" || !selectedTask) {
      setRequestedTaskTitle(taskTitle);
      setIsRequestConfettiOpen(true);
      setIsConfettiOpen(false);
    } else {
      setBookedTaskTitle(taskTitle);
      setIsConfettiOpen(true);
      setIsRequestConfettiOpen(false);
    }
    
    setActiveTab("requests");
    
    toast({
      title: "Task Request Submitted",
      description: `Your request for ${taskTitle} has been submitted successfully.`,
      duration: 3000,
    });
    
    if (notificationsEnabled) {
      setTimeout(() => {
        toast({
          title: "Task Status Update",
          description: "Your request is being reviewed by providers in your area.",
          duration: 5000,
        });
      }, 3000);
    }
  };

  const getFavoriteListings = () => {
    console.log("Fetching favorite listings, favoriteTaskIds:", favoriteTaskIds);
    
    const allTasksLists = [
      recommendedTasks,
      ...(searchResults ? [searchResults] : []),
    ];
    
    if (taskListings && taskListings.length > 0) {
      allTasksLists.push(taskListings);
    }
    
    if (additionalTaskListings && additionalTaskListings.length > 0) {
      allTasksLists.push(additionalTaskListings);
    }
    
    const allTasks = allTasksLists.flat();
    
    const uniqueTasks = allTasks.reduce((acc, current) => {
      if (!acc.find(item => item.title === current.title)) {
        acc.push(current);
      }
      return acc;
    }, [] as typeof recommendedTasks);
    
    const favoriteTasks = uniqueTasks.filter(task => {
      const isFavorite = favoriteTaskIds.includes(task.title);
      return isFavorite;
    });
    
    console.log("Final favorite tasks:", favoriteTasks);
    return favoriteTasks;
  };

  const toggleFavoriteView = () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      setActiveTab("favorites");
    } else {
      setActiveTab("home");
    }
  };

  const handleHideFavoritesSection = () => {
    setShowFavorites(false);
    setActiveTab("home");
  };

  const handleClearSearchResults = () => {
    setSearchResults(null);
    setSearchPerformed(false);
    setSearchQuery("");
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSearch(fakeEvent);
  };

  const navigateToTasksSection = () => {
    setActiveTab("allTasks");
    setShowFavorites(false);
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
      return <RequestsTab />;
    } else if (activeTab === "rewards") {
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
          onHideSection={handleHideFavoritesSection}
          onNavigateToTasks={navigateToTasksSection}
        />
      );
    } else if (activeTab === "allTasks") {
      return (
        <TaskCategories 
          showAllTasks={true}
          favoriteTaskIds={favoriteTaskIds}
          onFavoriteToggle={handleFavoriteToggle}
          onViewTask={handleBookNow}
          initialSelectedCategory={selectedCategory}
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
        onBrowseTasks={navigateToTasksSection}
      />
    );
  };

  const shouldShowSearchHeader = () => {
    return activeTab === "home" || activeTab === "allTasks";
  };

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

  const additionalTaskListings = [];

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
            isVisible={shouldShowSearchHeader()}
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
          task={selectedTask}
          onTaskBooked={handleBookTask}
          onFavoriteToggle={handleFavoriteToggle}
          isFavorite={favoriteTaskIds.includes(selectedTask.title)}
        />
      )}
      
      <ConfettiPopup 
        isOpen={isConfettiOpen} 
        onClose={() => setIsConfettiOpen(false)}
        title={`You've Booked ${bookedTaskTitle}!`}
        description="Your request has been submitted. You'll be notified when a provider accepts your task."
        buttonText="View My Requests"
        onButtonClick={() => {
          setIsConfettiOpen(false);
          setActiveTab("requests");
        }}
      />
      
      <TaskRequestConfetti 
        isOpen={isRequestConfettiOpen} 
        onClose={() => setIsRequestConfettiOpen(false)}
        title={`Your ${requestedTaskTitle} Request is Submitted!`}
        description="We'll notify you when providers respond to your request."
        buttonText="View My Requests"
        onButtonClick={() => {
          setIsRequestConfettiOpen(false);
          setActiveTab("requests");
        }}
      />
    </div>
  );
};

export default MainMenu;
