
import React from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, Calendar, Clock, MapPin, Clipboard, Plus } from "lucide-react";
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
  
  const recentTasks = [
    { id: "1", title: "Help with moving furniture", location: "University Campus", status: "In Progress", date: "Today, 3:00 PM" },
    { id: "2", title: "Weekly apartment cleaning", location: "Student Housing", status: "Scheduled", date: "Tomorrow, 10:00 AM" },
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
          
          {/* Your Tasks */}
          <section className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Tasks</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-assist-blue text-sm p-0 hover:bg-transparent" 
                onClick={() => navigate('/mobile/tasks')}
              >
                View All
                <ChevronRight size={16} />
              </Button>
            </div>
            
            {recentTasks.length > 0 ? (
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
                    onClick={() => navigate(`/mobile/task/${task.id}`)}
                  >
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.status === "In Progress" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {task.status}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs mb-1">
                        <MapPin size={12} className="mr-1" />
                        <span>{task.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock size={12} className="mr-1" />
                        <span>{task.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-5 text-center border border-dashed border-gray-200">
                <Clipboard className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="text-gray-700 font-medium mb-1">No active tasks</h3>
                <p className="text-gray-500 text-xs mb-3">Create a new task to get started.</p>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/mobile/new-task')}
                  className="text-xs"
                >
                  <Plus size={14} className="mr-1" />
                  New Task
                </Button>
              </div>
            )}
          </section>
          
          {/* Upcoming Calendar */}
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
                size="smallIcon"
                className="text-gray-500"
                onClick={() => navigate('/mobile/task/2')}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </section>
        </div>
      </MobileLayout>
      <BottomNavigation />
    </>
  );
};

export default MobileHome;
