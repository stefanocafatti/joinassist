
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CircleBlocks from "@/components/background/CircleBlocks";
import { Search, Heart, Clock, Star, Filter, PawPrint, Car, Home, Package, Briefcase, User, CreditCard, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CategoryCard from "@/components/ui/CategoryCard";

// Mock user data - in a real app this would come from your authentication system
const mockUser = {
  firstName: "Alex",
  lastName: "Smith",
  recentSearches: ["Dog walker", "House cleaning", "Grocery delivery"],
  preferences: [],
  // Added mock data for past tasks and payment methods
  pastTasks: [
    { id: "1", title: "Dog Walking", date: "May 15, 2023", status: "Completed", price: "$25" },
    { id: "2", title: "House Cleaning", date: "Apr 28, 2023", status: "Completed", price: "$75" },
    { id: "3", title: "Grocery Delivery", date: "Mar 10, 2023", status: "Completed", price: "$18" }
  ],
  paymentMethods: [
    { id: "1", type: "Credit Card", last4: "4242", brand: "Visa", isDefault: true },
    { id: "2", type: "Credit Card", last4: "1234", brand: "Mastercard", isDefault: false }
  ]
};

// Interest tags that users can select
const interestTags = [
  { id: "pets", label: "Pets", icon: <PawPrint className="h-4 w-4 mr-1" /> },
  { id: "transport", label: "Transportation", icon: <Car className="h-4 w-4 mr-1" /> },
  { id: "housekeeping", label: "Home Services", icon: <Home className="h-4 w-4 mr-1" /> },
  { id: "delivery", label: "Delivery", icon: <Package className="h-4 w-4 mr-1" /> },
  { id: "work", label: "Professional Help", icon: <Briefcase className="h-4 w-4 mr-1" /> },
];

// Recommended tasks based on user preferences
const recommendedTasks = [
  {
    title: "Dog Walking",
    description: "Regular walks for your furry friend",
    category: "Pets", 
    price: "$15-25/hr",
    image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "House Cleaning",
    description: "Get your space spotless",
    category: "Home", 
    price: "$20-35/hr",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Grocery Delivery",
    description: "Get groceries delivered to your door",
    category: "Delivery", 
    price: "$15/delivery",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop"
  }
];

const MainMenu = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [userName, setUserName] = useState(mockUser.firstName);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState("home"); // New state for tracking active tab

  useEffect(() => {
    // This would fetch the user's actual data from your backend
    // For now, we'll just use the mock data
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"`);
      // Navigate or filter results
    }
  };

  const toggleInterest = (id: string) => {
    setUserInterests(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
    
    // In a real app, you'd save this to the user's profile
    toast.success(`Preferences updated!`);
  };

  // Render the appropriate content based on the active tab
  const renderContent = () => {
    if (activeTab === "profile") {
      return (
        <div className="space-y-8">
          {/* User Profile Section */}
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
                <p className="text-gray-600 text-sm">Total Tasks</p>
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
          
          {/* Past Tasks Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <History className="h-5 w-5 mr-2 text-assist-blue" /> Past Tasks
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
                      <span className="font-medium">{task.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">You don't have any past tasks yet.</p>
            )}
          </section>
          
          {/* Payment Methods Section */}
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
    }
    
    // Home tab (default view)
    return (
      <>
        {/* Personalization Section */}
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
        
        {/* Recommended Tasks Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recommended For You</h2>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTasks.map((task, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div 
                  className="h-40 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${task.image})` }}
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{task.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{task.price}</span>
                    <Button size="sm">View Details</Button>
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
        
        {/* Recent Searches Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Recent Searches</h2>
          {mockUser.recentSearches.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {mockUser.recentSearches.map((search, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="rounded-full bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
                >
                  {search}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent searches yet</p>
          )}
        </section>
        
        {/* Categories Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Browse Categories</h2>
            <Button variant="link" className="text-assist-blue">
              See all →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Using the CategoryCard component we already have */}
            <div className="cursor-pointer">
              <CategoryCard
                icon={PawPrint}
                title="Pet Care"
                description="Services for your furry friends"
                tasks={["🐕 Dog Walking", "🐱 Pet Sitting", "🧼 Pet Grooming"]}
                color="bg-blue-50"
              />
            </div>
            <div className="cursor-pointer">
              <CategoryCard
                icon={Home}
                title="Home Services"
                description="Keep your home in perfect shape"
                tasks={["🧹 House Cleaning", "🛠️ Furniture Assembly", "🧰 Handyman Services"]}
                color="bg-green-50"
              />
            </div>
            <div className="cursor-pointer">
              <CategoryCard
                icon={Car}
                title="Transportation"
                description="Get around with ease"
                tasks={["🚗 Rides", "🛍️ Grocery Delivery", "📦 Package Pickup"]}
                color="bg-purple-50"
              />
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <CircleBlocks />
      
      {/* Welcome overlay */}
      {showWelcome && (
        <div className="fixed inset-0 bg-assist-blue/90 flex items-center justify-center z-50 animate-fade-in">
          <div className="text-white text-center p-8 max-w-md animate-scale-in">
            <h1 className="text-4xl font-bold mb-4">Welcome, {userName}!</h1>
            <p className="text-xl">We're setting up your personalized dashboard...</p>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 relative z-10">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Hello, {userName}!
            </h1>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Clock className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative flex items-center">
              <Input 
                type="text" 
                placeholder="What do you need help with today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 h-14 rounded-full border-2 border-assist-blue/30 shadow-sm bg-white focus:border-assist-blue focus:ring-2 focus:ring-assist-blue/20 text-base placeholder:text-assist-blue/60"
              />
              <button 
                type="submit" 
                className="absolute right-4 text-assist-blue hover:text-assist-blue/80 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </header>
        
        {/* Main Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === "home" 
                ? "border-assist-blue text-assist-blue" 
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === "profile" 
                ? "border-assist-blue text-assist-blue" 
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </button>
        </div>
        
        {/* Render Content Based on Active Tab */}
        {renderContent()}
      </div>
    </div>
  );
};

export default MainMenu;
