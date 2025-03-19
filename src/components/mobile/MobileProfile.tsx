
import React from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Gift, ShieldCheck, KeyRound, CreditCard, Star, Bell, HelpCircle, Info, LogOut, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
        <Icon className="h-5 w-5 text-gray-600" />
        <span className="font-medium text-gray-800">{title}</span>
      </div>
      <div className="flex items-center">
        {value && <span className="text-gray-500 mr-2">{value}</span>}
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

const MobileProfile = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast.success("You have been logged out successfully");
    navigate("/mobile/sign-in");
  };
  
  const handleShare = () => {
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <>
      <MobileLayout 
        title="Profile" 
        showHeader={true}
        showLogo={false}
        headerClassName="bg-gradient-to-r from-blue-400 via-assist-blue/90 to-blue-500 text-center text-white"
        contentClassName="pb-20"
      >
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/placeholder.svg" alt="Profile picture" />
            <AvatarFallback className="text-2xl bg-assist-blue text-white">JD</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-gray-900 mb-6">John Doe</h2>
          
          <Button 
            variant="outline" 
            className="rounded-full border-2 border-assist-blue text-assist-blue hover:bg-assist-blue/5 w-full max-w-md"
            onClick={handleShare}
          >
            <Gift className="mr-2 h-5 w-5" />
            Help Your Friends, Get $10
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <ProfileItem 
            icon={Info} 
            title="Account" 
            value="john.doe@example.com" 
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
        
        <div className="bg-white rounded-xl shadow-sm mb-6">
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
        
        <div className="space-y-4">
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
      </MobileLayout>
      
      <BottomNavigation />
    </>
  );
};

export default MobileProfile;
