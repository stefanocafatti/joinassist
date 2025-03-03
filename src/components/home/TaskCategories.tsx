
import { 
  Trash2, 
  Car, 
  Package, 
  BookOpen, 
  Code, 
  Dumbbell, 
  PartyPopper, 
  Star, 
  Briefcase,
  Heart,
  Eye,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryCard from "../ui/CategoryCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface TaskCategoriesProps {
  showAllTasks?: boolean;
  favoriteTaskIds?: string[];
  onFavoriteToggle?: (taskTitle: string) => void;
  onViewTask?: (taskTitle: string) => void;
}

const TaskCategories = ({ 
  showAllTasks = false, 
  favoriteTaskIds = [], 
  onFavoriteToggle,
  onViewTask
}: TaskCategoriesProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleTaskCount, setVisibleTaskCount] = useState<number>(9);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryClick = (category: string) => {
    if (showAllTasks) {
      setSelectedCategory(category === selectedCategory ? null : category);
    }
    console.log(`Category selected: ${category}`);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate loading delay for smooth transition
    setTimeout(() => {
      setVisibleTaskCount(prev => prev + 6);
      setIsLoading(false);
    }, 600);
  };

  const handleLocalFavoriteToggle = (taskTitle: string) => {
    if (onFavoriteToggle) {
      onFavoriteToggle(taskTitle);
    }
  };

  const handleViewTask = (taskTitle: string) => {
    if (onViewTask) {
      onViewTask(taskTitle);
    }
  };

  // Updated category colors to match tag colors from SearchResultsSection
  const categories = [
    {
      icon: Trash2,
      title: "Cleaning",
      description: "Keep your spaces tidy",
      tasks: [
        "🧹 Wash my Car",
        "🧽 Clean my Garage",
        "🧼 Clean my Room",
        "✨ Deep Clean Apartment",
        "🗑️ Post Event Clean Up"
      ],
      color: "bg-sky-50"  // Matches tag color
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Moving & delivery solutions",
      tasks: [
        "🚚 Moving Assistance",
        "📦 Help with Loading Items",
        "🚗 Drive me to a Location",
        "📬 Drop or Pick up a Package",
        "🚲 Bike/Scooter Delivery"
      ],
      color: "bg-indigo-50"  // Matches tag color
    },
    {
      icon: Package,
      title: "Assembly",
      description: "Put things together",
      tasks: [
        "🛏️ Assemble my Bed Frame",
        "🪑 Assemble IKEA Furniture",
        "📺 Install my TV Mount",
        "🔧 Install a Shelf",
        "🖥️ Assemble Office Desk"
      ],
      color: "bg-purple-50"  // Matches tag color
    },
    {
      icon: BookOpen,
      title: "Academic Help",
      description: "Educational support",
      tasks: [
        "📝 Writing Essays",
        "🔢 Teach me Math",
        "📚 SAT/ACT Prep",
        "📖 Proofread my Paper",
        "👨‍🏫 Study Buddy/Tutor"
      ],
      color: "bg-yellow-50"  // Matches tag color
    },
    {
      icon: Code,
      title: "Digital Services",
      description: "Technical expertise",
      tasks: [
        "💻 Code a Website",
        "🎬 Video Editing",
        "🎨 Graphic Design Support",
        "🐞 Fix my Bugs",
        "📱 Social Media Content"
      ],
      color: "bg-red-50"  // Matches tag color
    },
    {
      icon: Dumbbell,
      title: "Fitness & Wellness",
      description: "Health & wellness support",
      tasks: [
        "🥗 Meal Prep",
        "💪 Personal Training",
        "🧘 Yoga Instruction",
        "🏋️ Home Workout Plans",
        "🍎 Nutrition Counseling"
      ],
      color: "bg-emerald-50"  // Matches tag color
    },
    {
      icon: PartyPopper,
      title: "Event & Hospitality",
      description: "Event assistance",
      tasks: [
        "🍽️ Catering Assistance",
        "🎈 Event Setup/Decoration",
        "🎵 DJ for Event",
        "📸 Photographers for Events",
        "🎉 Party Coordinator"
      ],
      color: "bg-pink-50"  // Matches tag color
    },
    {
      icon: Star,
      title: "Special Tasks",
      description: "Unique task solutions",
      tasks: [
        "👕 Do my Laundry",
        "🌱 Water my plants",
        "🛒 Grocery Store Delivery",
        "🧳 Help me Pack for a Trip",
        "👔 Organize my Closet"
      ],
      color: "bg-orange-50"  // Matches tag color
    },
    {
      icon: Briefcase,
      title: "For Brands",
      description: "Business & brand support",
      tasks: [
        "📊 Content Creation for Ads",
        "👨‍💼 Brand Ambassador",
        "📢 Social Media Management",
        "📈 Market Research",
        "🧪 Product Testing"
      ],
      color: "bg-blue-50"  // Matches tag color
    }
  ];

  const additionalCategories = [
    {
      icon: Trash2,
      title: "Home Maintenance",
      description: "Keep your home in shape",
      tasks: [
        "🔧 Fix a Leaky Faucet",
        "🔌 Install Light Fixtures",
        "🧰 Hang Pictures/Shelves",
        "🧹 Gutter Cleaning",
        "🪴 Gardening and Lawn Care"
      ],
      color: "bg-cyan-50"
    },
    {
      icon: Car,
      title: "Vehicle Care",
      description: "Keep your car running smoothly",
      tasks: [
        "🚗 Drive Car to Service",
        "🧽 Interior Car Detailing",
        "💦 Car Wash & Waxing",
        "🔧 Help with Tire Change",
        "🔋 Jump Start Battery"
      ],
      color: "bg-lime-50"
    },
    {
      icon: Package,
      title: "Delivery & Errands",
      description: "Save time on daily tasks",
      tasks: [
        "📦 Package Drop-off",
        "🛒 Shopping Assistant",
        "💊 Prescription Pickup",
        "📨 Mail Collection",
        "🏦 Bank Deposit Run"
      ],
      color: "bg-amber-50"
    }
  ];

  const displayCategories = showAllTasks 
    ? [...categories, ...additionalCategories]
    : categories;

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
    }
  ];

  const additionalTaskListings = [
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
    {
      title: "Personal Training Session",
      category: "Fitness & Wellness",
      description: "One-on-one fitness training",
      location: "Santa Monica Beach",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Birthday Party Planning",
      category: "Event & Hospitality",
      description: "Complete party planning service",
      location: "Malibu",
      image: "https://images.unsplash.com/photo-1496843916299-590492c751f4?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Home Organization",
      category: "Special Tasks",
      description: "Decluttering and organization",
      location: "Pacific Palisades",
      image: "https://images.unsplash.com/photo-1484329081568-bed9ba42a5f5?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Social Media Management",
      category: "For Brands",
      description: "Comprehensive social media services",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const allTaskListings = [...taskListings, ...additionalTaskListings];

  // Function to get the proper category background and text colors
  const getCategoryButtonColors = (category: string) => {
    const categoryColorMap: {[key: string]: string} = {
      "Cleaning": selectedCategory === category 
        ? "bg-sky-100 text-sky-800 border-sky-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-sky-50",
      "Transportation": selectedCategory === category 
        ? "bg-indigo-100 text-indigo-800 border-indigo-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-indigo-50",
      "Assembly": selectedCategory === category 
        ? "bg-purple-100 text-purple-800 border-purple-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-purple-50",
      "Academic Help": selectedCategory === category 
        ? "bg-yellow-100 text-yellow-800 border-yellow-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-yellow-50",
      "Digital Services": selectedCategory === category 
        ? "bg-red-100 text-red-800 border-red-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-red-50",
      "Fitness & Wellness": selectedCategory === category 
        ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-emerald-50",
      "Event & Hospitality": selectedCategory === category 
        ? "bg-pink-100 text-pink-800 border-pink-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-pink-50",
      "Special Tasks": selectedCategory === category 
        ? "bg-orange-100 text-orange-800 border-orange-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-orange-50",
      "For Brands": selectedCategory === category 
        ? "bg-blue-100 text-blue-800 border-blue-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-blue-50",
      "Home Maintenance": selectedCategory === category 
        ? "bg-cyan-100 text-cyan-800 border-cyan-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-cyan-50",
      "Vehicle Care": selectedCategory === category 
        ? "bg-lime-100 text-lime-800 border-lime-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-lime-50",
      "Delivery & Errands": selectedCategory === category 
        ? "bg-amber-100 text-amber-800 border-amber-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-amber-50",
    };
    
    return categoryColorMap[category] || (selectedCategory === category 
      ? "bg-gray-100 text-gray-800 border-gray-200" 
      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50");
  };

  const getCategoryColor = (category: string) => {
    const categoryColorMap: {[key: string]: string} = {
      "Cleaning": "bg-sky-100 text-sky-800",
      "Transportation": "bg-indigo-100 text-indigo-800",
      "Transportation and Moving": "bg-indigo-100 text-indigo-800",
      "Delivery": "bg-teal-100 text-teal-800",
      "Assembly": "bg-purple-100 text-purple-800",
      "Academic Help": "bg-yellow-100 text-yellow-800",
      "Digital Services": "bg-red-100 text-red-800",
      "Fitness & Wellness": "bg-emerald-100 text-emerald-800",
      "Event & Hospitality": "bg-pink-100 text-pink-800",
      "Special Tasks": "bg-orange-100 text-orange-800",
      "For Brands": "bg-blue-100 text-blue-800",
    };
    
    return categoryColorMap[category] || "bg-gray-100 text-gray-800";
  };

  const renderTaskCard = (task: any, index: number) => (
    <div 
      key={index} 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer relative"
      onClick={() => handleViewTask(task.title)}
    >
      <div className="relative">
        <div 
          className="h-40 bg-cover bg-center" 
          style={{ backgroundImage: `url(${task.image})` }}
        />
        <button 
          className="absolute top-3 right-3 z-10"
          onClick={(e) => {
            e.stopPropagation();
            handleLocalFavoriteToggle(task.title);
          }}
          aria-label={favoriteTaskIds.includes(task.title) ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={`h-5 w-5 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-white'}`} 
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
            {task.category}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        <div className="flex items-center justify-end">
          <Button 
            size="sm" 
            className="bg-assist-blue hover:bg-assist-blue/90 w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleViewTask(task.title);
            }}
          >
            <Eye className="h-4 w-4 mr-1" /> View Task
          </Button>
        </div>
      </div>
    </div>
  );

  const filteredTaskListings = selectedCategory 
    ? allTaskListings.filter(task => task.category === selectedCategory || 
        (selectedCategory === "Transportation" && task.category === "Transportation"))
    : allTaskListings;

  const visibleTaskListings = filteredTaskListings.slice(0, visibleTaskCount);

  const hasMoreTasks = visibleTaskCount < filteredTaskListings.length;

  return (
    <section id="all-tasks" className="py-6 bg-assist-gray/50 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-assist-blue/5 rounded-full opacity-70" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-100/30 rounded-full opacity-60" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!showAllTasks ? (
          <>
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Task Categories
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCategories.map((category, index) => (
                <div key={index} onClick={() => handleCategoryClick(category.title)} className="h-full cursor-pointer">
                  <CategoryCard
                    icon={category.icon}
                    title={category.title}
                    description={category.description}
                    tasks={category.tasks}
                    color={category.color}
                    onFavoriteToggle={onFavoriteToggle}
                    onViewTask={onViewTask}
                    isFavorite={favoriteTaskIds.includes(category.title)}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {selectedCategory ? `${selectedCategory} Tasks` : "All Tasks"}
            </h2>
            
            <div className="mb-8">
              <div className="flex space-x-2 overflow-x-auto pb-3">
                {categories.map((category, index) => (
                  <div 
                    key={index}
                    onClick={() => handleCategoryClick(category.title)}
                    className={`cursor-pointer flex-shrink-0 px-4 py-2 rounded-full border transition-all flex items-center space-x-2 shadow-sm ${
                      getCategoryButtonColors(category.title)
                    }`}
                  >
                    <category.icon className={`h-5 w-5 ${
                      selectedCategory === category.title 
                        ? `text-${category.color.split('-')[1]}-800` 
                        : "text-gray-700"
                    }`} />
                    <span className="font-medium text-sm whitespace-nowrap">{category.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {visibleTaskListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {visibleTaskListings.map(renderTaskCard)}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found in this category</h3>
                <p className="text-gray-600 mb-4">Try selecting a different category</p>
                <Button 
                  onClick={() => setSelectedCategory(null)} 
                  variant="outline"
                  className="border-assist-blue text-assist-blue hover:bg-assist-blue/10"
                >
                  View All Tasks
                </Button>
              </div>
            )}
          </>
        )}
        
        {showAllTasks && hasMoreTasks && (
          <div className="mt-14 text-center">
            {isLoading ? (
              <div className="flex justify-center items-center h-14">
                <Loader className="h-6 w-6 text-assist-blue animate-spin" />
              </div>
            ) : (
              <Button 
                size="lg" 
                className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white h-14 px-8 text-base"
                onClick={handleLoadMore}
              >
                Load More Tasks
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskCategories;
