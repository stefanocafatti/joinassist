import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FavoriteTask {
  title: string;
  price: string;
  image: string;
}

interface FavoritesSectionProps {
  favoritedTasks: FavoriteTask[];
}

const FavoritesSection = ({ favoritedTasks }: FavoritesSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
          <Heart size={18} className="text-red-500" />
          Favorites
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-assist-blue text-sm p-0 hover:bg-transparent" 
          onClick={() => navigate('/mobile/favorites')}
        >
          View All
          <ChevronRight size={16} />
        </Button>
      </div>
      
      {favoritedTasks.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {favoritedTasks.map((task, index) => (
            <Card key={index} className="overflow-hidden border-gray-100 shadow-sm hover:shadow transition-all">
              <CardContent className="p-0">
                <div 
                  className="h-28 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${task.image})` }}
                />
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-1">{task.title}</h3>
                  <p className="text-xs text-assist-blue font-medium">{task.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-50 rounded-lg p-6 border border-gray-100">
          <p className="text-gray-600 text-sm">No favorite tasks yet</p>
        </div>
      )}
    </section>
  );
};

export default FavoritesSection;
