
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Bell, Coins } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, History, CreditCard, Heart as HeartIcon, Settings, LogOut } from "lucide-react";

interface MainHeaderProps {
  userName: string;
  profileImage: string | null;
  showFavorites: boolean;
  onToggleFavoriteView: () => void;
  onSetActiveTab: (tab: string) => void;
  assistPoints?: number;
}

const MainHeader: React.FC<MainHeaderProps> = ({ 
  userName, 
  profileImage,
  showFavorites, 
  onToggleFavoriteView, 
  onSetActiveTab,
  assistPoints = 0
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        Hello, {userName}!
      </h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-assist-blue/10 text-assist-blue px-3 py-1 rounded-full">
          <Coins className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{assistPoints} points</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleFavoriteView}
          className={showFavorites ? 'text-red-500' : ''}
        >
          <Heart className={`h-5 w-5 ${showFavorites ? 'fill-red-500' : ''}`} />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src={profileImage || ""} />
                <AvatarFallback className="bg-assist-blue text-white">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSetActiveTab("profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <History className="mr-2 h-4 w-4" />
              <span>My Bookings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Payment Methods</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onToggleFavoriteView}>
              <HeartIcon className="mr-2 h-4 w-4" />
              <span>Saved Tasks</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MainHeader;
