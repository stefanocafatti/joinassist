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
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [allTasksLoaded, setAllTasksLoaded] = useState(false);

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
      setVisibleTaskCount(prev => {
        const newCount = prev + 6;
        if (newCount >= allTaskListings.length) {
          setAllTasksLoaded(true);
        }
        return newCount;
      });
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

  // Reset task count when category changes
  useEffect(() => {
    setVisibleTaskCount(9);
    setAllTasksLoaded(false);
  }, [selectedCategory]);

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
      title: "Transportation and Moving",
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
      title: "Academic & Professional Help",
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
      title: "Fitness and Wellness",
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
      title: "Event and Hospitality",
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
      title: "Wash my Car",
      category: "Cleaning",
      description: "Professional car wash at your location",
      location: "Your Driveway",
      image: "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Clean my Garage",
      category: "Cleaning",
      description: "Deep clean and organize your garage space",
      location: "Your Home",
      image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Clean my Room",
      category: "Cleaning",
      description: "Thorough bedroom cleaning and organization",
      location: "Your Home",
      image: "https://images.unsplash.com/photo-1551909493-077a3334da90?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Clean my Kitchen",
      category: "Cleaning",
      description: "Deep clean kitchen appliances and surfaces",
      location: "Your Home",
      image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Clean my Windows",
      category: "Cleaning",
      description: "Interior and exterior window cleaning",
      location: "Westwood",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Moving Assistance",
      category: "Transportation and Moving",
      description: "Help moving furniture to new apartment",
      location: "UCLA Campus",
      image: "/lovable-uploads/72545c93-f781-402e-ad25-5cd509be453c.png"
    },
    {
      title: "Help with Loading Items",
      category: "Transportation and Moving",
      description: "Loading furniture and boxes into truck or storage",
      location: "Your Location",
      image: "https://images.unsplash.com/photo-1530650314597-5209931bcdae?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Drive me to a Location",
      category: "Transportation and Moving",
      description: "Personalized ride to your destination",
      location: "Starting from UCLA",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Assemble my Bed Frame",
      category: "Assembly",
      description: "Expert assembly of any bed frame type",
      location: "Your Home",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Assemble IKEA Furniture",
      category: "Assembly",
      description: "Professional assembly of any IKEA furniture",
      location: "Brentwood",
      image: "/lovable-uploads/83abea36-642f-4147-865a-c43794680e3b.png"
    },
    {
      title: "Install my TV Mount",
      category: "Assembly",
      description: "Secure TV wall mounting on any surface",
      location: "Your Home",
      image: "/lovable-uploads/36f389d4-c8c6-40a8-9cc4-2ed5306d7dd5.png"
    },
    
    {
      title: "Writing Essays",
      category: "Academic & Professional Help",
      description: "Professional essay writing assistance",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Teach me Math",
      category: "Academic & Professional Help",
      description: "Personalized math tutoring for any level",
      location: "UCLA Library",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "College Counseling",
      category: "Academic & Professional Help",
      description: "Expert guidance on college applications",
      location: "Remote or In-person",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Code a Website",
      category: "Digital Services",
      description: "Custom website development",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Video Editing",
      category: "Digital Services",
      description: "Professional video editing services",
      location: "Remote",
      image: "/lovable-uploads/59f9c5bb-dd82-404c-8be9-9aaf7188bded.png"
    },
    {
      title: "Graphic Design Support",
      category: "Digital Services",
      description: "Custom graphic design for any project",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Meal Prep",
      category: "Fitness and Wellness",
      description: "Healthy meal preparation for the week",
      location: "Your Kitchen",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Personal Training",
      category: "Fitness and Wellness",
      description: "Customized workout session with a trainer",
      location: "Your Home or Gym",
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Yoga Instruction",
      category: "Fitness and Wellness",
      description: "Private yoga sessions for all levels",
      location: "Your Home or Park",
      image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Event Setup/Decoration",
      category: "Event and Hospitality",
      description: "Complete event setup and decoration",
      location: "Venice Beach",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "DJ for Event",
      category: "Event and Hospitality",
      description: "Professional DJ services for any event",
      location: "Your Venue",
      image: "https://images.unsplash.com/photo-1594387310561-7ce9fd3312a9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Party Coordinator",
      category: "Event and Hospitality",
      description: "Full party planning and coordination",
      location: "Your Venue",
      image: "https://images.unsplash.com/photo-1528495612343-9ca9f41856c4?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Do my Laundry",
      category: "Special Tasks",
      description: "Wash, dry, and fold laundry service",
      location: "Your Home or Laundromat",
      image: "https://images.unsplash.com/photo-1545173168-9f1c6e67b31b?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Water my Plants",
      category: "Special Tasks",
      description: "Plant care while you're away",
      location: "Marina Del Rey",
      image: "/lovable-uploads/55ae04cd-8676-4a1c-b2b3-36c7005144af.png"
    },
    {
      title: "Grocery Store Delivery",
      category: "Special Tasks",
      description: "Grocery shopping and delivery",
      location: "Your Preferred Store",
      image: "https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Content Creation for Ads",
      category: "For Brands",
      description: "Professional ad content creation",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Brand Ambassador",
      category: "For Brands",
      description: "Represent your brand at events",
      location: "Various Locations",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Market Research",
      category: "For Brands",
      description: "Conduct targeted market research",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const additionalTaskListings = [
    {
      title: "Deep Clean Apartment",
      category: "Cleaning",
      description: "Comprehensive deep cleaning service",
      location: "Your Apartment",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Clean my Pool",
      category: "Cleaning",
      description: "Complete pool cleaning and maintenance",
      location: "Your Home",
      image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Post Event Clean Up",
      category: "Cleaning",
      description: "Thorough clean up after parties or events",
      location: "Your Venue",
      image: "https://images.unsplash.com/photo-1596461010414-7da839c5498d?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Pick me up from Location",
      category: "Transportation and Moving",
      description: "Reliable pickup service from any location",
      location: "LAX Airport",
      image: "https://images.unsplash.com/photo-1613688270362-8b26189c0782?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Drop of a package",
      category: "Transportation and Moving",
      description: "Quick package delivery service",
      location: "Los Angeles Area",
      image: "https://images.unsplash.com/photo-1586487641637-851aa89be13e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Pick up a package",
      category: "Transportation and Moving",
      description: "Package pickup and delivery to you",
      location: "Any Location",
      image: "https://images.unsplash.com/photo-1586769852836-bc069f19e1be?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Install a Shelf",
      category: "Assembly",
      description: "Professional shelf installation",
      location: "Your Home",
      image: "https://images.unsplash.com/photo-1617104551722-3b2d52338fe9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Assemble Office Desk",
      category: "Assembly",
      description: "Expert assembly of office furniture",
      location: "Your Home or Office",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "SAT/ACT Prep",
      category: "Academic & Professional Help",
      description: "Test preparation with experienced tutors",
      location: "UCLA Campus or Remote",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Proofread my Paper",
      category: "Academic & Professional Help",
      description: "Professional paper proofreading",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Resume Review",
      category: "Academic & Professional Help",
      description: "Expert resume critique and improvement",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1507209550472-5908c9176456?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Fix my Bugs",
      category: "Digital Services",
      description: "Debug and fix software issues",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "App Development",
      category: "Digital Services",
      description: "Custom mobile app development",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Social Media Content",
      category: "Digital Services",
      description: "Create engaging social media content",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Home Workout Plans",
      category: "Fitness and Wellness",
      description: "Customized workout plans for home fitness",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Nutrition Counseling",
      category: "Fitness and Wellness",
      description: "Personalized nutrition advice and plans",
      location: "Remote or In-person",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Photographers for Events",
      category: "Event and Hospitality",
      description: "Professional event photography",
      location: "Your Venue",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Catering Assistance",
      category: "Event and Hospitality",
      description: "Professional catering for any event",
      location: "Your Venue",
      image: "https://images.unsplash.com/photo-1570782118771-d0681a67e73a?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Help me Pack for a Trip",
      category: "Special Tasks",
      description: "Efficient packing assistance for travel",
      location: "Your Home",
      image: "https://images.unsplash.com/photo-1523736133365-8448c5306aaa?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Organize my Closet",
      category: "Special Tasks",
      description: "Professional closet organization",
      location: "Your Home",
      image: "https://images.unsplash.com/photo-1551909353-bff0908deeab?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Wash my Dog",
      category: "Special Tasks",
      description: "Professional dog grooming service",
      location: "Your Home",
      image: "https://images.unsplash.com/photo-1484186139897-d5fc6b908812?q=80&w=1000&auto=format&fit=crop"
    },
    
    {
      title: "Social Media Management",
      category: "For Brands",
      description: "Complete social media management",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Product Testing",
      category: "For Brands",
      description: "Thorough product testing and feedback",
      location: "Remote or In-person",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const allTaskListings = [...taskListings, ...additionalTaskListings];

  // Function to get the proper category background and text colors - Updated to match the tag colors
  const getCategoryButtonColors = (category: string) => {
    const categoryColorMap: {[key: string]: string} = {
      "Cleaning": selectedCategory === category 
        ? "bg-sky-100 text-sky-800 border-sky-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-sky-50",
      "Transportation and Moving": selectedCategory === category 
        ? "bg-indigo-100 text-indigo-800 border-indigo-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-indigo-50",
      "Assembly": selectedCategory === category 
        ? "bg-purple-100 text-purple-800 border-purple-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-purple-50",
      "Academic & Professional Help": selectedCategory === category 
        ? "bg-yellow-100 text-yellow-800 border-yellow-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-yellow-50",
      "Digital Services": selectedCategory === category 
        ? "bg-red-100 text-red-800 border-red-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-red-50",
      "Fitness and Wellness": selectedCategory === category 
        ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
        : "bg-white border-gray-200 text-gray-700 hover:bg-emerald-50",
      "Event and Hospitality": selectedCategory === category 
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
      "Transportation": "bg
