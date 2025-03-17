
import React from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, Calendar, Clock, MapPin, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileHome = () => {
  const navigate = useNavigate();
  
  const categories = [
    { name: "Cleaning", icon: "🧹", color: "bg-soft-blue" },
    { name: "Delivery", icon: "🚚", color: "bg-soft-green" },
    { name: "Errands", icon: "🏃", color: "bg-soft-yellow" },
    { name: "Moving", icon: "📦", color: "bg-soft-purple" },
    { name: "Research", icon: "🔍", color: "bg-soft-pink" },
    { name: "Tutoring", icon: "📚", color: "bg-soft-orange" },
  ];

  return (
    <>
      <MobileLayout showHeader={false} contentClassName="pb-20">
        <div className="space-y-6">
          {/* Header Section */}
          <header className="mb-3">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-500 text-sm">What do you need help with today?</p>
          </header>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Type in what you need help with today"
              className="w-full h-12 pl-10 pr-4 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-assist-blue/30 focus:border-assist-blue shadow-sm"
              onClick={() => navigate('/mobile/search')}
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-2">
            <Button 
              className="w-full bg-assist-blue hover:bg-blue-600 text-white font-medium h-12 rounded-xl shadow-sm flex items-center justify-center gap-2"
              onClick={() => navigate('/mobile/new-task')}
            >
              <Plus size={18} />
              <span>Request New Task</span>
            </Button>
          </div>
          
          {/* Categories */}
          <section className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-assist-blue text-sm p-0 hover:bg-transparent" 
                onClick={() => navigate('/mobile/categories')}
              >
                View All
                <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className={`${category.color} rounded-xl flex flex-col items-center justify-center py-4 shadow-sm hover:shadow transition-all duration-200 cursor-pointer`}
                  onClick={() => navigate(`/mobile/category/${category.name.toLowerCase()}`)}
                >
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-800">{category.name}</span>
                </div>
              ))}
            </div>
          </section>
          
          {/* Upcoming Calendar Section - Enhanced to fill the gap */}
          <section className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-assist-blue text-sm p-0 hover:bg-transparent" 
                onClick={() => navigate('/mobile/calendar')}
              >
                Calendar
                <ChevronRight size={16} />
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-assist-blue bg-opacity-10 text-assist-blue p-2 rounded-lg mr-3">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-900">Weekly Cleaning</h3>
                    <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-500 p-1"
                  onClick={() => navigate('/mobile/calendar/1')}
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
              
              {/* Added another upcoming event for better visual balance */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-green-500 bg-opacity-10 text-green-600 p-2 rounded-lg mr-3">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-900">Grocery Delivery</h3>
                    <p className="text-xs text-gray-500">Friday, 2:30 PM</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-500 p-1"
                  onClick={() => navigate('/mobile/calendar/2')}
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </section>
          
          {/* Popular Tasks Section - Added to provide more value */}
          <section className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Popular Tasks</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-assist-blue text-sm p-0 hover:bg-transparent" 
                onClick={() => navigate('/mobile/popular')}
              >
                View All
                <ChevronRight size={16} />
              </Button>
            </div>
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => navigate('/mobile/new-task?template=cleaning')}
              >
                <div className="flex items-center">
                  <div className="bg-soft-blue text-blue-600 p-2 rounded-lg mr-3 flex items-center justify-center">
                    <span className="text-xl">🧹</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-900">Weekly Apartment Cleaning</h3>
                    <p className="text-xs text-gray-500">From $25/hr</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-500 p-1"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
              
              <div 
                className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => navigate('/mobile/new-task?template=groceries')}
              >
                <div className="flex items-center">
                  <div className="bg-soft-green text-green-600 p-2 rounded-lg mr-3 flex items-center justify-center">
                    <span className="text-xl">🛒</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-900">Grocery Shopping & Delivery</h3>
                    <p className="text-xs text-gray-500">From $15/hr</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-500 p-1"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </MobileLayout>
      <BottomNavigation />
    </>
  );
};

export default MobileHome;
