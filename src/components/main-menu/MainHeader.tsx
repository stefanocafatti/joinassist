
import React from "react";
import { User, Heart, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MainHeaderProps {
  userName: string;
  showFavorites: boolean;
  onToggleFavoriteView: () => void;
  onSetActiveTab: (tab: string) => void;
  assistPoints: number;
  profileImage: string | null;
  isStudentView?: boolean;
}

const MainHeader: React.FC<MainHeaderProps> = ({ 
  userName, 
  showFavorites, 
  onToggleFavoriteView, 
  onSetActiveTab,
  assistPoints,
  profileImage,
  isStudentView = false
}) => {
  const getInitials = () => {
    return userName.charAt(0).toUpperCase();
  };
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Avatar className="h-10 w-10 border border-gray-200">
          {profileImage ? (
            <AvatarImage src={profileImage} alt={userName} />
          ) : (
            <AvatarFallback>
              {getInitials()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">Hi, {userName}</h2>
          <p className="text-sm text-gray-500">
            {isStudentView ? "Student Dashboard" : "What do you need help with today?"}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {isStudentView ? (
          // Student view - show balance badge
          <Badge variant="student" className="px-3 py-1.5">
            <Coins className="h-4 w-4 mr-1.5" />
            <span className="font-medium">$175.50</span>
          </Badge>
        ) : (
          // Regular user view - show points
          <div 
            className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full cursor-pointer hover:bg-purple-200"
            onClick={() => onSetActiveTab("rewards")}
          >
            <Coins className="h-4 w-4 mr-1.5" />
            <span className="font-medium">{assistPoints} pts</span>
          </div>
        )}
        
        {!isStudentView && (
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              showFavorites ? "bg-assist-blue/10 text-assist-blue" : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={onToggleFavoriteView}
            aria-label="Favorites"
          >
            <Heart className={`h-5 w-5 ${showFavorites ? "fill-assist-blue" : ""}`} />
          </button>
        )}
        
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-gray-100"
          onClick={() => onSetActiveTab("profile")}
          aria-label="Profile"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
