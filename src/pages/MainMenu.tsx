import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CircleBlocks from "@/components/background/CircleBlocks";
import { Search, Heart, Clock, Star, Filter, PawPrint, Car, Home, Package, Briefcase, User, CreditCard, History, Settings, LogOut, Bell, MapPin, Calendar, DollarSign, Clock3, Eye, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CategoryCard from "@/components/ui/CategoryCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import TaskDetailView from "@/components/ui/TaskDetailView";

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
    image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1000&auto=format&fit=crop",
    price: 25,
    priceType: "hourly"
  },
  {
    title: "House Cleaning",
    description: "Get your space spotless",
    category: "Home", 
    location: "Campus Area",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
    price: 50,
    priceType: "hourly"
  },
  {
    title: "Grocery Delivery",
    description: "Get groceries delivered to your door",
    category: "Delivery", 
    location: "Santa Monica",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop",
    price: 30,
    priceType: "fixed"
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
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [searchResults, setSearchResults] = useState<typeof recommendedTasks | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedTask, setSelectedTask] = useState<(typeof recommendedTasks)[0] | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [favoriteTaskIds, setFavoriteTaskIds] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  const renderContent = () => {
    if (activeTab === "profile") {
      return (
        <div className="space-y-8">
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-assist-blue/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-assist-blue" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{mockUser.firstName} {mockUser.lastName}</h2>
                <p className="text-gray-500">Member since 2023</p>
              </div>
              <Button className="ml-auto" variant="outline" size="sm">Edit Profile</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{mockUser.pastTasks.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{mockUser.pastTasks.length}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Saved Tasks</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </section>
          
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <History className="h-5 w-5 mr-2 text-assist-blue" /> Past Bookings
              </h2>
              <Button variant="ghost" size="sm" className="text-assist-blue">View All</Button>
            </div>
            
            {mockUser.pastTasks.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {mockUser.pastTasks.map((task) => (
                  <div key={task.id} className="py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-500">{task.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">You don't have any past bookings yet.</p>
            )}
          </section>
          
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-assist-blue" /> Payment Methods
              </h2>
              <Button variant="outline" size="sm">Add New</Button>
            </div>
            
            {mockUser.paymentMethods.length > 0 ? (
              <div className="space-y-4">
                {mockUser.paymentMethods.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{payment.brand} •••• {payment.last4}</p>
                        <p className="text-sm text-gray-500">{payment.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {payment.isDefault && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Default</Badge>
                      )}
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">No payment methods added yet.</p>
            )}
          </section>
        </div>
      );
    } else if (activeTab === "requests") {
      return (
        <div className="space-y-8">
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <ClipboardList className="h-5 w-5 mr-2 text-assist-blue" /> Submitted Task Requests
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <Button variant="outline" size="sm">
                  Sort by Date
                </Button>
              </div>
            </div>
            
            {mockSubmittedRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Task</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Location</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Price</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockSubmittedRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-medium text-gray-900">{request.title}</span>
                        </td>
                        <td className="px-4 py-4 text-gray-700">{request.date}</td>
                        <td className="px-4 py-4 text-gray-700">{request.location}</td>
                        <td className="px-4 py-4 text-gray-700">{request.price}</td>
                        <td className="px-4 py-4">
                          <Badge
                            className={`
                              ${request.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                              ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                              ${request.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                            `}
                          >
                            {request.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <Button variant="ghost" size="sm" className="text-assist-blue">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests submitted</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't submitted any task requests yet. Browse our available tasks or search for specific services.
                  </p>
                  <Button 
                    className="bg-assist-blue hover:bg-assist-blue/90"
                    onClick={() => setActiveTab("home")}
                  >
                    Browse Tasks
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      );
    } else if (showFavorites) {
      const favorites = getFavoriteListings();
      
      return (
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Favorited Listings</h2>
            <Button variant="outline" size="sm" onClick={() => setShowFavorites(false)}>
              Back to Homepage
            </Button>
          </div>
          
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((task, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                  onClick={() => handleBookNow(task.title)}
                >
                  <div className="relative">
                    <div 
                      className="h-40 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${task.image})` }}
                    />
                    <button 
                      className="absolute top-3 right-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteToggle(task.title);
                      }}
                    >
                      <Heart 
                        className={`h-5 w-5 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{task.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center mb-3 text-sm font-medium text-assist-blue">
                      <DollarSign className="h-4 w-4 mr-1" /> 
                      ${task.price}{task.priceType === "hourly" ? "/hr" : " flat rate"}
                    </div>
                    <div className="flex justify-end items-center">
                      <Button 
                        size="sm" 
                        className="bg-assist-blue hover:bg-assist-blue/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow(task.title);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View Task
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                <p className="text-gray-600 mb-6">
                  You haven't added any tasks to your favorites yet. Browse our tasks and click the heart icon to add them to your favorites.
                </p>
                <Button 
                  className="bg-assist-blue hover:bg-assist-blue/90"
                  onClick={() => setShowFavorites(false)}
                >
                  Browse Tasks
                </Button>
              </div>
            </div>
          )}
        </section>
      );
    }
    
    return (
      <>
        <section className="mb-10 bg-blue-50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Personalize Your Experience</h2>
            <Button variant="ghost" size="sm" className="text-assist-blue">
              <Star className="h-4 w-4 mr-1" /> Save Preferences
            </Button>
          </div>
          
          <p className="text-gray-600 mb-4">
            Select your interests to get personalized task recommendations
          </p>
          
          <div className="flex flex-wrap gap-3">
            {interestTags.map(tag => (
              <Badge
                key={tag.id}
                className={`cursor-pointer flex items-center px-3 py-2 text-sm rounded-full ${
                  userInterests.includes(tag.id) 
                    ? 'bg-assist-blue text-white hover:bg-assist-blue/90' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => toggleInterest(tag.id)}
              >
                {tag.icon} {tag.label}
              </Badge>
            ))}
          </div>
          
          {userInterests.length > 0 && (
            <p className="text-sm text-assist-blue mt-3">
              {userInterests.length} interests selected - we'll customize your experience!
            </p>
          )}
        </section>
        
        {searchPerformed && (
          <section className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Search Results for "{searchQuery}"</h2>
              <Button variant="outline" size="sm" onClick={() => {
                setSearchResults(null);
                setSearchPerformed(false);
                setSearchQuery("");
              }}>
                Clear Results
              </Button>
            </div>
            
            {searchResults && searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((task, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <div className="relative">
                      <div 
                        className="h-40 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${task.image})` }}
                      />
                      <button 
                        className="absolute top-3 right-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteToggle(task.title);
                        }}
                      >
                        <Heart 
                          className={`h-5 w-5 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                        />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{task.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center mb-3 text-sm font-medium text-assist-blue">
                        <DollarSign className="h-4 w-4 mr-1" /> 
                        ${task.price}{task.priceType === "hourly" ? "/hr" : " flat rate"}
                      </div>
                      <div className="flex justify-end items-center">
                        <Button 
                          size="sm" 
                          className="bg-assist-blue hover:bg-assist-blue/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookNow(task.title);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View Task
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any tasks matching "{searchQuery}". Would you like to request this task?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={handleRequestTask}
                      className="bg-assist-blue hover:bg-assist-blue/90"
                    >
                      Request This Task
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchResults(null);
                        setSearchPerformed(false);
                        setSearchQuery("");
                      }}
                    >
                      Browse Other Tasks
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
        
        {!searchPerformed && (
          <>
            <section className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recommended For You</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedTasks.map((task, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                    onClick={() => handleBookNow(task.title)}
                  >
                    <div className="relative">
                      <div 
                        className="h-40 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${task.image})` }}
                      />
                      <button 
                        className="absolute top-3 right-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteToggle(task.title);
                        }}
                      >
                        <Heart 
                          className={`h-5 w-5 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                        />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{task.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center mb-3 text-sm font-medium text-assist-blue">
                        <DollarSign className="h-4 w-4 mr-1" /> 
                        ${task.price}{task.priceType === "hourly" ? "/hr" : " flat rate"}
                      </div>
                      <div className="flex justify-end items-center">
                        <Button 
                          size="sm" 
                          className="bg-assist-blue hover:bg-assist-blue/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookNow(task.title);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View Task
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="link" className="text-assist-blue">
                  View all recommendations →
                </Button>
              </div>
            </section>
            
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Recent Searches</h2>
              {mockUser.recentSearches.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {mockUser.recentSearches.map((search, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="rounded-full bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
                      onClick={() => {
                        setSearchQuery(search);
                        handleSearch(new Event('submit') as any);
                      }}
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recent searches yet</p>
              )}
            </section>
            
            <section className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Past Ordered Tasks</h2>
                <Button variant="link" className="text-assist-blue">
                  View all →
                </Button>
              </div>
              
              {mockUser.pastTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockUser.pastTasks.map((task) => (
                    <div key={task.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFavoriteToggle(task.title);
                            }}
                          >
                            <Heart 
                              className={`h-4 w-4 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                            />
                          </button>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" /> {task.date}
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg
