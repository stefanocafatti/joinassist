import React, { useState, useRef } from "react";
import BottomNavigation from "./BottomNavigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Gift, ShieldCheck, KeyRound, CreditCard, Star, Bell, HelpCircle, Info, LogOut, UserPlus, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const ProfileItem = ({ icon: Icon, title, value, onClick }: { 
  icon: React.ElementType; 
  title: string; 
  value?: string;
  onClick?: () => void;
}) => {
  return (
    <div 
      className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-gray-600 flex-shrink-0" />
        <span className="font-medium text-gray-800">{title}</span>
      </div>
      <div className="flex items-center">
        {value && <span className="text-gray-500 mr-2">{value}</span>}
        <ArrowRight className="h-4 w-4 text-blue-400" />
      </div>
    </div>
  );
};

const MobileProfile = () => {
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userName = "John Doe"; // Would come from user data in a real app
  const userEmail = "john.doe@example.com";
  
  const form = useForm();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarSrc(result);
        toast.success("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLogout = () => {
    toast.success("You have been logged out successfully");
    navigate("/mobile/sign-in");
  };
  
  const handleShare = () => {
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-blue-50">
        <main className="flex-1 overflow-auto pb-16 pt-4">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <Avatar 
                className="h-24 w-24 mb-4 cursor-pointer border-4 border-white shadow-md" 
                onClick={handleAvatarClick}
              >
                <AvatarImage src={avatarSrc || ""} alt="Profile picture" />
                <AvatarFallback className="text-2xl bg-assist-blue text-white">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              
              <div className="absolute bottom-4 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer" onClick={handleAvatarClick}>
                <Camera className="h-5 w-5 text-assist-blue" />
              </div>
              
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-6">{userName}</h2>
            
            <Button 
              variant="outline" 
              className="rounded-full border-2 border-assist-blue text-assist-blue hover:bg-assist-blue/5 w-auto px-4 py-1 text-sm"
              onClick={handleShare}
            >
              <Gift className="mr-1 h-4 w-4" />
              Help Friends, Get $10
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm mb-6 mx-4 px-4">
            <ProfileItem 
              icon={Info} 
              title="Account" 
              value={userEmail} 
            />
            <ProfileItem 
              icon={ShieldCheck} 
              title="Account Security" 
            />
            <ProfileItem 
              icon={KeyRound} 
              title="Change Password" 
            />
            <ProfileItem 
              icon={CreditCard} 
              title="Payment Methods" 
            />
            <ProfileItem 
              icon={Star} 
              title="Promos & Credits" 
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm mb-6 mx-4 px-4">
            <ProfileItem 
              icon={Bell} 
              title="Notifications" 
            />
            <ProfileItem 
              icon={HelpCircle} 
              title="Support" 
            />
            <ProfileItem 
              icon={Info} 
              title="About" 
            />
          </div>
          
          <div className="space-y-4 px-5">
            <Button 
              variant="default" 
              className="w-full py-6 text-white bg-gradient-to-r from-blue-500 to-assist-blue hover:opacity-90 rounded-xl shadow-sm"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              <span>Become an Assist Helper</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full py-5 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Log Out
            </Button>
          </div>
        </main>
      </div>
      
      <BottomNavigation />
    </>
  );
};

export default MobileProfile;
