
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  pointsEarned?: number;
}

interface FavoritesSectionProps {
  favorites: Task[];
  favoriteTaskIds: string[];
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
  onHideSection: () => void;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ 
  favorites, 
  favoriteTaskIds, 
  onFavoriteToggle, 
  onBookNow, 
  onHideSection 
}) => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Log for debugging
    console.log("Favorites in FavoritesSection:", favorites);
    console.log("FavoriteTaskIds in FavoritesSection:", favoriteTaskIds);
  }, [favorites, favoriteTaskIds]);

  const getCategoryColor = (category: string) => {
    const categoryColorMap: {[key: string]: string} = {
      "Cleaning": "bg-sky-100 text-sky-800",
      "Transportation": "bg-indigo-100 text-indigo-800",
      "Transportation and Moving": "bg-indigo-100 text-indigo-800",
      "Delivery": "bg-teal-100 text-teal-800",
      "Assembly": "bg-purple-100 text-purple-800",
      "Academic & Professional Help": "bg-yellow-100 text-yellow-800",
      "Academic Help": "bg-yellow-100 text-yellow-800",
      "Digital Services": "bg-red-100 text-red-800",
      "Fitness and Wellness": "bg-emerald-100 text-emerald-800",
      "Fitness & Wellness": "bg-emerald-100 text-emerald-800",
      "Event and Hospitality": "bg-pink-100 text-pink-800",
      "Event & Hospitality": "bg-pink-100 text-pink-800",
      "Special Tasks": "bg-orange-100 text-orange-800",
      "For Brands": "bg-blue-100 text-blue-800",
      "Pets": "bg-amber-100 text-amber-800",
      "Home": "bg-lime-100 text-lime-800",
    };
    
    return categoryColorMap[category] || "bg-gray-100 text-gray-800";
  };

  const handleFavoriteToggle = (taskTitle: string) => {
    onFavoriteToggle(taskTitle);
    toast({
      title: favoriteTaskIds.includes(taskTitle) ? "Removed from favorites" : "Added to favorites",
      description: favoriteTaskIds.includes(taskTitle) ? 
        `${taskTitle} has been removed from your favorites.` : 
        `${taskTitle} has been added to your favorites.`,
      duration: 2000,
    });
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Favorited Listings</h2>
        <Button variant="outline" size="sm" onClick={onHideSection}>
          Back to Homepage
        </Button>
      </div>
      
      {favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((task, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
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
                    handleFavoriteToggle(task.title);
                  }}
                  aria-label="Remove from favorites"
                >
                  <Heart 
                    className="h-5 w-5 fill-red-500 text-red-500" 
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
                <div className="flex items-center justify-center">
                  <Button 
                    size="sm" 
                    className="bg-assist-blue hover:bg-assist-blue/90 w-full"
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't added any tasks to your favorites yet. Browse our tasks and click the heart icon to add them to your favorites.
            </p>
            <Button 
              className="bg-assist-blue hover:bg-assist-blue/90"
              onClick={onHideSection}
            >
              Browse Tasks
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FavoritesSection;
