
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
        <div className="bg-gray-100 p-2 rounded-full">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>
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
        headerClassName="bg-assist-blue text-center text-white"
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
            variant="outline" 
            className="w-full justify-between py-6 px-4 h-auto border-assist-blue text-assist-blue hover:bg-assist-blue/5"
          >
            <div className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5" />
              <span>Become a Service Provider</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
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
