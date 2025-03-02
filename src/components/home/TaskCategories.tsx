
import { 
  Trash2, 
  Car, 
  Package, 
  BookOpen, 
  Code, 
  Dumbbell, 
  PartyPopper, 
  FileCheck, 
  Briefcase,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryCard from "../ui/CategoryCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TaskCategories = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (category: string) => {
    // For now, just show a toast notification
    toast.success(`${category} category clicked!`, {
      description: "This would navigate to the category page in a full implementation."
    });
    
    // In a real implementation, this would navigate to a category page
    // navigate(`/categories/${category.toLowerCase()}`);
    console.log(`Category selected: ${category}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('searchQuery') as string;
    
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"`, {
        description: "Search functionality would be implemented in a full version."
      });
      console.log(`Search query: ${searchQuery}`);
    }
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
      icon: FileCheck,
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
  
  return (
    <section id="all-tasks" className="py-20 bg-assist-gray/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-assist-blue/5 rounded-full opacity-70" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-100/30 rounded-full opacity-60" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1 py-1 px-4 rounded-full bg-assist-blue/10 text-assist-blue text-sm font-medium mb-4">
            Many Skills, One Platform
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Task Categories
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            From cleaning to coding, our vetted students can assist you with any task you need completed.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
            <div className="relative flex items-center">
              <Input 
                type="text" 
                name="searchQuery"
                placeholder="What do you need help with?"
                className="pr-12 h-14 rounded-full border-gray-300 shadow-sm focus:border-assist-blue focus:ring focus:ring-assist-blue/20 text-base"
              />
              <button 
                type="submit" 
                className="absolute right-4 text-gray-500 hover:text-assist-blue transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
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
        
        <div className="mt-14 text-center">
          <Button 
            size="lg" 
            className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white h-14 px-8 text-base"
            onClick={() => handleCategoryClick("All")}
          >
            Browse All Tasks
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TaskCategories;
