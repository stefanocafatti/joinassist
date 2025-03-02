import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Gift, Tag, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface StoreTabProps {
  assistPoints: number;
  onPointsUpdated: (newPoints: number) => void;
}

interface RewardItem {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: "tasks" | "beauty" | "services";
  image?: string;
  discount?: string;
}

const StoreTab: React.FC<StoreTabProps> = ({ assistPoints, onPointsUpdated }) => {
  const rewardItems: RewardItem[] = [
    {
      id: "1",
      title: "Free Dog Walking Session",
      description: "Redeem for one free dog walking session (up to 30 minutes)",
      pointsCost: 250,
      category: "tasks",
      image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "2",
      title: "50% Off House Cleaning",
      description: "Get 50% off your next house cleaning booking",
      pointsCost: 350,
      category: "tasks",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
      discount: "50%",
    },
    {
      id: "3",
      title: "Beauty Box Subscription - 1 Month",
      description: "One month subscription to our curated beauty box featuring premium samples",
      pointsCost: 400,
      category: "beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "4",
      title: "30% Off Any Beauty Product",
      description: "Receive a coupon for 30% off any beauty product from our partner stores",
      pointsCost: 200,
      category: "beauty",
      image: "https://images.unsplash.com/photo-1573575155376-60d554085811?q=80&w=1000&auto=format&fit=crop",
      discount: "30%",
    },
    {
      id: "5",
      title: "Priority Matching",
      description: "Get priority matching with providers for your next 3 tasks",
      pointsCost: 150,
      category: "services",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "6",
      title: "Premium Support",
      description: "Access to premium support for 1 month",
      pointsCost: 100,
      category: "services",
      image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000&auto=format&fit=crop",
    }
  ];
  
  const [activeCategory, setActiveCategory] = useState<"all" | "tasks" | "beauty" | "services">("all");
  
  const filteredRewards = activeCategory === "all" 
    ? rewardItems 
    : rewardItems.filter(item => item.category === activeCategory);
    
  const handleRedeemPoints = (item: RewardItem) => {
    if (assistPoints >= item.pointsCost) {
      const newPoints = assistPoints - item.pointsCost;
      onPointsUpdated(newPoints);
      toast.success(`Redeemed: ${item.title}`, {
        description: `You've successfully redeemed this reward for ${item.pointsCost} points!`
      });
    } else {
      toast.error("Not enough points", {
        description: `You need ${item.pointsCost - assistPoints} more points to redeem this reward.`
      });
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-assist-blue/10 p-3 rounded-full">
            <ShoppingBag className="h-8 w-8 text-assist-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rewards Store</h2>
            <p className="text-gray-600">Use your Assist Points to redeem rewards</p>
          </div>
        </div>
        
        <div className="bg-assist-blue/5 p-4 rounded-lg flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600 text-sm">Your Balance</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{assistPoints}</span>
              <span className="text-assist-blue">Assist Points</span>
            </div>
          </div>
          <Gift className="h-10 w-10 text-assist-blue" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Available Rewards</h3>
          <div className="flex gap-2">
            <Button 
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-assist-blue" : ""}
            >
              All
            </Button>
            <Button 
              variant={activeCategory === "tasks" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("tasks")}
              className={activeCategory === "tasks" ? "bg-assist-blue" : ""}
            >
              Tasks
            </Button>
            <Button 
              variant={activeCategory === "beauty" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("beauty")}
              className={activeCategory === "beauty" ? "bg-assist-blue" : ""}
            >
              Beauty
            </Button>
            <Button 
              variant={activeCategory === "services" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("services")}
              className={activeCategory === "services" ? "bg-assist-blue" : ""}
            >
              Services
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="h-40 bg-cover bg-center relative" 
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {item.discount && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500">{item.discount} Off</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-assist-blue mr-1" />
                    <span className="text-sm font-semibold">{item.pointsCost} points</span>
                  </div>
                  <Button 
                    size="sm" 
                    className={assistPoints >= item.pointsCost 
                      ? "bg-assist-blue hover:bg-assist-blue/90" 
                      : "bg-gray-300 cursor-not-allowed"}
                    onClick={() => handleRedeemPoints(item)}
                    disabled={assistPoints < item.pointsCost}
                  >
                    Redeem
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreTab;
