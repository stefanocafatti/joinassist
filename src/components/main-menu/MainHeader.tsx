
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Coins, Mail, CheckCircle, User, History, LogOut, MessageSquare, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface MainHeaderProps {
  userName: string;
  profileImage: string | null;
  showFavorites: boolean;
  onToggleFavoriteView: () => void;
  onSetActiveTab: (tab: string) => void;
  assistPoints?: number;
  balance?: number;
}

const MainHeader: React.FC<MainHeaderProps> = ({ 
  userName, 
  profileImage,
  showFavorites, 
  onToggleFavoriteView, 
  onSetActiveTab,
  assistPoints = 0,
  balance = 0
}) => {
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Task Request Accepted",
      message: "Your dog walking request has been accepted by Jessica T.",
      time: "10 minutes ago",
      isRead: false,
    },
    {
      id: "2",
      title: "New Message",
      message: "You have a new message from Michael regarding your furniture assembly task.",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: "3",
      title: "Task Completed",
      message: "Your grocery delivery task has been marked as completed.",
      time: "Yesterday",
      isRead: true,
    },
    {
      id: "4",
      title: "Points Earned",
      message: "You earned 10 Assist Points for your recent booking.",
      time: "2 days ago",
      isRead: true,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Jessica T.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
      message: "Hello! I'll be arriving in about 15 minutes for the dog walking task.",
      time: "2 hours ago",
      isRead: false,
      taskTitle: "Dog Walking"
    },
    {
      id: "2",
      sender: "Michael R.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      message: "I've completed the furniture assembly. Could you verify everything is as expected?",
      time: "Yesterday",
      isRead: true,
      taskTitle: "Furniture Assembly"
    },
    {
      id: "3",
      sender: "Lisa W.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      message: "I have a question about the cleaning requirements for the apartment.",
      time: "3 days ago",
      isRead: true,
      taskTitle: "Apartment Cleaning"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const unreadMessagesCount = messages.filter(m => !m.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({
        ...notification,
        isRead: true
      }))
    );
  };

  const handleMarkAllMessagesAsRead = () => {
    setMessages(prev => 
      prev.map(message => ({
        ...message,
        isRead: true
      }))
    );
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMessageClick = (id: string) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === id
          ? { ...message, isRead: true }
          : message
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    localStorage.removeItem("userPreferences");
    localStorage.removeItem("assistToken");
    
    toast.success("Logged out successfully");
    
    setTimeout(() => {
      navigate("/welcome", { replace: true });
      window.location.reload();
    }, 300);
  };

  return (
    <div className="flex flex-col mb-8 mt-6">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="text-gray-700">
            Hello, {userName}!
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <Popover open={isMessagesOpen} onOpenChange={setIsMessagesOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                <MessageSquare className="h-5 w-5" />
                {unreadMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadMessagesCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Messages</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-assist-blue hover:text-assist-blue/80"
                    onClick={handleMarkAllMessagesAsRead}
                  >
                    Mark all as read
                  </Button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {messages.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={cn(
                          "p-4 hover:bg-gray-50 cursor-pointer", 
                          !message.isRead && "bg-blue-50/50"
                        )}
                        onClick={() => handleMessageClick(message.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={message.avatar} />
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-sm">{message.sender}</h4>
                              {!message.isRead && (
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">New</Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{message.taskTitle}</p>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{message.message}</p>
                            <p className="text-gray-400 text-xs mt-1">{message.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No messages yet</p>
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-gray-100">
                <div className="text-center text-xs text-gray-600 mb-3 px-4">
                  <p>Remember: Sharing contact information is prohibited and may result in immediate termination.</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-assist-blue w-full hover:text-assist-blue/80"
                  onClick={() => onSetActiveTab("messages")}
                >
                  View All Messages
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Notifications</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-assist-blue hover:text-assist-blue/80"
                    onClick={handleMarkAllAsRead}
                  >
                    Mark all as read
                  </Button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={cn(
                          "p-4 hover:bg-gray-50 cursor-pointer", 
                          !notification.isRead && "bg-blue-50/50"
                        )}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "mt-1 p-2 rounded-full",
                            notification.title.includes("Task Request") ? "bg-green-100" :
                            notification.title.includes("Message") ? "bg-blue-100" :
                            notification.title.includes("Completed") ? "bg-purple-100" : "bg-yellow-100"
                          )}>
                            {notification.title.includes("Task Request") ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : notification.title.includes("Message") ? (
                              <Mail className="h-4 w-4 text-blue-600" />
                            ) : notification.title.includes("Completed") ? (
                              <CheckCircle className="h-4 w-4 text-purple-600" />
                            ) : (
                              <Coins className="h-4 w-4 text-yellow-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              {!notification.isRead && (
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">New</Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                            <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No notifications yet</p>
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-gray-100 text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-assist-blue w-full hover:text-assist-blue/80"
                  onClick={() => onSetActiveTab("requests")}
                >
                  View All Notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={profileImage || ""} />
                  <AvatarFallback className="bg-soft-blue text-gray-700">
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
              <DropdownMenuItem onClick={() => onSetActiveTab("requests")}>
                <History className="mr-2 h-4 w-4" />
                <span>My Bookings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex items-center gap-3 mt-3">
        <Button 
          variant="ghost"
          size="sm"
          className="flex items-center bg-soft-green text-green-600 px-3 py-1 rounded-full hover:bg-green-500/10"
          onClick={() => onSetActiveTab("earnings")}
        >
          <DollarSign className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{balance.toFixed(2)}</span>
        </Button>
        
        <Button 
          variant="ghost"
          size="sm"
          className="flex items-center bg-soft-blue text-assist-blue px-3 py-1 rounded-full hover:bg-assist-blue/10"
          onClick={() => onSetActiveTab("rewards")}
        >
          <Coins className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{assistPoints} points</span>
        </Button>
      </div>
    </div>
  );
};

export default MainHeader;
