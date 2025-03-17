
import React from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, Clipboard, Plus, Clock, Bell } from "lucide-react";
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
    { id: "1", title: "Help with moving furniture", status: "In Progress", date: "Today, 3:00 PM" },
    { id: "2", title: "Weekly apartment cleaning", status: "Scheduled", date: "Tomorrow, 10:00 AM" },
  ];

  return (
    <>
      <MobileLayout 
        showBackButton={false}
        showHeader={true}
        showLogo={false}
        headerClassName="pb-0"
      >
        <div className="space-y-6 pb-20">
          {/* Welcome Section */}
          <section className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome back!</h2>
            
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Type in what you need help with today"
                className="w-full h-12 pl-4 pr-12 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-assist-blue/30 focus:border-assist-blue"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => navigate('/mobile/search')}
              >
                <Search size={20} />
              </Button>
            </div>
          </section>
          
          {/* Quick Action */}
          <section className="bg-gradient-to-r from-assist-blue to-blue-500 rounded-xl p-5 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Need help with a task?</h3>
                <p className="text-white/90 text-sm">Connect with verified students ready to assist.</p>
              </div>
              <Button 
                className="bg-white text-assist-blue hover:bg-white/90 rounded-full shadow-sm"
                onClick={() => navigate('/mobile/new-task')}
              >
                <Plus size={18} />
                <span>New Task</span>
              </Button>
            </div>
          </section>
          
          {/* Categories */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
              <Button variant="ghost" size="sm" className="text-assist-blue text-sm" onClick={() => navigate('/mobile/categories')}>
                View All
                <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className={`${category.color} p-4 rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}
                  onClick={() => navigate(`/mobile/category/${category.name.toLowerCase()}`)}
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{category.name}</span>
                </div>
              ))}
            </div>
          </section>
          
          {/* Current Tasks */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Tasks</h3>
              <Button variant="ghost" size="sm" className="text-assist-blue text-sm" onClick={() => navigate('/mobile/tasks')}>
                View All
                <ChevronRight size={16} />
              </Button>
            </div>
            
            {recentTasks.length > 0 ? (
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                    onClick={() => navigate(`/mobile/task/${task.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <Clock size={14} className="mr-1" />
                          <span>{task.date}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === "In Progress" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {task.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-200">
                <Clipboard className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <h4 className="text-gray-700 font-medium mb-1">No active tasks</h4>
                <p className="text-gray-500 text-sm mb-4">Create a new task to get started.</p>
                <Button 
                  size="sm"
                  onClick={() => navigate('/mobile/new-task')}
                >
                  <Plus size={16} className="mr-1" />
                  New Task
                </Button>
              </div>
            )}
          </section>
        </div>
      </MobileLayout>
      <BottomNavigation />
    </>
  );
};

export default MobileHome;
