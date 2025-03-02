import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  pointsEarned?: number;
}

interface SearchResultsSectionProps {
  searchQuery: string;
  searchResults: Task[] | null;
  favoriteTaskIds: string[];
  onClearResults: () => void;
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
  onRequestTask: () => void;
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({ 
  searchQuery, 
  searchResults, 
  favoriteTaskIds, 
  onClearResults, 
  onFavoriteToggle, 
  onBookNow,
  onRequestTask
}) => {
  const getCategoryColor = (category: string) => {
    const categoryColorMap: {[key: string]: string} = {
      "Cleaning": "bg-sky-100 text-sky-800",
      "Transportation": "bg-indigo-100 text-indigo-800",
      "Transportation and Moving": "bg-indigo-100 text-indigo-800",
      "Delivery": "bg-teal-100 text-teal-800",
      "Assembly": "bg-purple-100 text-purple-800",
      "Academic & Professional Help": "bg-yellow-100 text-yellow-800",
      "Digital Services": "bg-red-100 text-red-800",
      "Fitness and Wellness": "bg-emerald-100 text-emerald-800",
      "Event and Hospitality": "bg-pink-100 text-pink-800",
      "Special Tasks": "bg-orange-100 text-orange-800",
      "For Brands": "bg-blue-100 text-blue-800",
      "Pets": "bg-amber-100 text-amber-800",
      "Home": "bg-lime-100 text-lime-800",
    };
    
    return categoryColorMap[category] || "bg-gray-100 text-gray-800";
  };

  const getTaskImage = (task: Task) => {
    const taskImageMap: {[key: string]: string} = {
      "Wash my Car": "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?q=80&w=1000&auto=format&fit=crop",
      "Clean my Car": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop",
      "Clean my Garage": "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1000&auto=format&fit=crop",
      "Clean my Room": "https://images.unsplash.com/photo-1551909493-077a3334da90?q=80&w=1000&auto=format&fit=crop",
      "Clean my Kitchen": "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1000&auto=format&fit=crop",
      "Clean my Windows": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop",
      "Deep Clean Apartment": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
      "Clean my Pool": "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=1000&auto=format&fit=crop",
      "Post Event Clean Up": "https://images.unsplash.com/photo-1596461010414-7da839c5498d?q=80&w=1000&auto=format&fit=crop",
      
      "Moving Assistance": "https://images.unsplash.com/photo-1600518464441-9306b008de8d?q=80&w=1000&auto=format&fit=crop",
      "Help with Loading Items": "https://images.unsplash.com/photo-1530650314597-5209931bcdae?q=80&w=1000&auto=format&fit=crop",
      "Drive me to a Location": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
      "Pick me up from Location": "https://images.unsplash.com/photo-1613688270362-8b26189c0782?q=80&w=1000&auto=format&fit=crop",
      "Drop of a package": "https://images.unsplash.com/photo-1586487641637-851aa89be13e?q=80&w=1000&auto=format&fit=crop",
      "Pick up a package": "https://images.unsplash.com/photo-1586769852836-bc069f19e1be?q=80&w=1000&auto=format&fit=crop",
      
      "Assemble Bed Frame": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop",
      "Assemble my Furniture": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop",
      "Install TV Mount": "https://images.unsplash.com/photo-1512204724346-8c4de33f3c1c?q=80&w=1000&auto=format&fit=crop",
      "Assemble IKEA Furniture": "https://images.unsplash.com/photo-1595428774863-a38feabce63f?q=80&w=1000&auto=format&fit=crop",
      "Install a Shelf": "https://images.unsplash.com/photo-1617104551722-3b2d52338fe9?q=80&w=1000&auto=format&fit=crop",
      "Assemble Office Desk or Chairs": "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1000&auto=format&fit=crop",
      
      "Writing Essays": "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop",
      "Teach me Math": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
      "College Counseling": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
      "SAT/ACT Prep": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
      "Resume Review": "https://images.unsplash.com/photo-1507209550472-5908c9176456?q=80&w=1000&auto=format&fit=crop",
      
      "Code a Website": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      "Video Editing": "https://images.unsplash.com/photo-1574717024453-354056afd6fc?q=80&w=1000&auto=format&fit=crop",
      "Graphic Design Support": "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      "Fix my Bugs": "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop",
      "App Development": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
      
      "Personal Training": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop",
      "Meal Prep": "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1000&auto=format&fit=crop",
      "Yoga Instruction": "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1000&auto=format&fit=crop",
      
      "Event Setup/Decoration": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop",
      "DJ for Event": "https://images.unsplash.com/photo-1594387310561-7ce9fd3312a9?q=80&w=1000&auto=format&fit=crop",
      "Party Coordinator": "https://images.unsplash.com/photo-1528495612343-9ca9f41856c4?q=80&w=1000&auto=format&fit=crop",
      
      "Grocery Delivery": "https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=1000&auto=format&fit=crop",
      "Water my Plants": "https://images.unsplash.com/photo-1623411235843-9ee9f41856c4?q=80&w=1000&auto=format&fit=crop", 
      "Do my Laundry": "https://images.unsplash.com/photo-1545173168-9f1c6e67b31b?q=80&w=1000&auto=format&fit=crop",
      
      "Brand Ambassador": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop",
      "Content Creation": "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1000&auto=format&fit=crop",
      "Market Research": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
    };
    
    const categoryImageMap: {[key: string]: string} = {
      "Cleaning": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
      "Transportation and Moving": "https://images.unsplash.com/photo-1617861944037-28f1c378a23b?q=80&w=1000&auto=format&fit=crop",
      "Assembly": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
      "Academic & Professional Help": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
      "Digital Services": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      "Fitness and Wellness": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
      "Event and Hospitality": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
      "Special Tasks": "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop",
      "For Brands": "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop"
    };
    
    if (!task.image || task.image.trim() === '') {
      if (taskImageMap[task.title]) {
        return taskImageMap[task.title];
      }
      
      return categoryImageMap[task.category] || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1000&auto=format&fit=crop";
    }
    return task.image;
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Search Results for "{searchQuery}"</h2>
        <Button variant="outline" size="sm" onClick={onClearResults}>
          Clear Results
        </Button>
      </div>
      
      {searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((task, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
              onClick={() => onBookNow(task.title)}
            >
              <div className="relative">
                <div 
                  className="h-40 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${getTaskImage(task)})` }}
                />
                <button 
                  className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavoriteToggle(task.title);
                  }}
                >
                  <Heart 
                    className={`h-5 w-5 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </button>
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
                    <Coins className="h-3 w-3" />
                    <span>Earn points</span>
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <Badge className={cn(getCategoryColor(task.category), "hover:opacity-90")}>{task.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                <div className="flex items-center justify-end">
                  <Button 
                    size="sm" 
                    className="bg-assist-blue hover:bg-assist-blue/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookNow(task.title);
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
                onClick={onRequestTask}
                className="bg-assist-blue hover:bg-assist-blue/90"
              >
                Request This Task
              </Button>
              <Button 
                variant="outline" 
                onClick={onClearResults}
              >
                Browse Other Tasks
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchResultsSection;
