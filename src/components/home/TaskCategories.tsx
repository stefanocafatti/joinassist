
import { 
  Trash2, 
  Car, 
  Package, 
  BookOpen, 
  Code, 
  Dumbbell, 
  PartyPopper, 
  Star, 
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryCard from "../ui/CategoryCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TaskCategoriesProps {
  showAllTasks?: boolean;
}

const TaskCategories = ({ showAllTasks = false }: TaskCategoriesProps) => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (category: string) => {
    toast.success(`${category} category clicked!`, {
      description: "This would navigate to the category page in a full implementation."
    });
    console.log(`Category selected: ${category}`);
  };
  
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
      color: "bg-blue-50"
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
      color: "bg-green-50"
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
      color: "bg-yellow-50"
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
      color: "bg-purple-50"
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
      color: "bg-red-50"
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
      color: "bg-teal-50"
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
      color: "bg-pink-50"
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
      color: "bg-orange-50"
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
      color: "bg-indigo-50"
    }
  ];

  // Additional categories to show when "Load More" is clicked
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
  
  // Combine all categories when showAllTasks is true
  const displayCategories = showAllTasks 
    ? [...categories, ...additionalCategories]
    : categories;
    
  // Additional task listings to show in "All Tasks" view
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
      image: "https://images.unsplash.com/photo-1600518464441-9306b008de8d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Assemble IKEA Furniture",
      category: "Assembly",
      description: "Need help putting together a desk and chair",
      location: "Brentwood",
      image: "https://images.unsplash.com/photo-1595428774863-a38feabce63f?q=80&w=1000&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1574717024453-354056afd6fc?q=80&w=1000&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1623411235843-9ee9f41856c4?q=80&w=1000&auto=format&fit=crop"
    }
  ];
  
  const renderTaskCard = (task: any, index: number) => (
    <div 
      key={index} 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="relative">
        <div 
          className="h-40 bg-cover bg-center" 
          style={{ backgroundImage: `url(${task.image})` }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {task.category}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{task.location}</span>
          <Button 
            size="sm" 
            className="bg-assist-blue hover:bg-assist-blue/90"
            onClick={() => toast.success(`Viewing details for ${task.title}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
  
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
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Tasks</h2>
            
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-4">
                {categories.map((category, index) => (
                  <div 
                    key={index}
                    onClick={() => handleCategoryClick(category.title)}
                    className="cursor-pointer flex-shrink-0 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center space-x-2"
                  >
                    <category.icon className="h-5 w-5 text-gray-700" />
                    <span className="font-medium text-sm">{category.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {taskListings.map(renderTaskCard)}
            </div>
          </>
        )}
        
        {showAllTasks && (
          <div className="mt-14 text-center">
            <Button 
              size="lg" 
              className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white h-14 px-8 text-base"
              onClick={() => handleCategoryClick("All")}
            >
              Browse All Tasks
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskCategories;
