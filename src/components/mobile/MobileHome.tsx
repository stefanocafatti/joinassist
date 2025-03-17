import React from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, Calendar, Clock, MapPin, Plus, History, Heart, Star, Repeat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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

  // Past orders data
  const pastTasks = [
    { 
      title: "Apartment Cleaning", 
      date: "May 15, 2023", 
      provider: "Jessica T.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
    },
    { 
      title: "Dog Walking", 
      date: "Apr 28, 2023", 
      provider: "Michael R.",
      image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  // Favorited tasks
  const favoritedTasks = [
    {
      title: "Weekly House Cleaning",
      price: "From $25/hr",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Dog Walking Service",
      price: "From $20/hr",
      image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  // Popular tasks
  const popularTasks = [
    {
      title: "Weekly Apartment Cleaning",
      description: "Professional cleaning services by verified students",
      price: "From $25/hr",
      category: "Cleaning",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Grocery Shopping & Delivery",
      description: "Students shop and deliver groceries to your door",
      price: "From $15/hr",
      category: "Delivery",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Academic Tutoring",
      description: "One-on-one tutoring in various subjects",
      price: "From $20/hr",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <>
      <MobileLayout showHeader={false} contentClassName="pb-20">
        <div className="space-y-6">
          {/* Header Section with gradient background */}
          <header className="mb-3 bg-gradient-to-r from-assist-blue/10 to-soft-purple/30 p-4 -mx-5 rounded-b-3xl shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">Hello, Sarah!</h1>
            <p className="text-gray-600 text-sm font-medium">Find skilled students for your tasks</p>
          </header>
          
          {/* Search Bar with more prominence */}
          <div className="relative mb-2">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Type in what you need help with today"
              className="w-full h-12 pl-10 pr-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-assist-blue/30 focus:border-assist-blue shadow-sm"
              onClick={() => navigate('/mobile/search')}
            />
          </div>

          {/* New Task Button - Made more prominent with gradient */}
          <div className="mb-3">
            <Button 
              className="w-full bg-gradient-to-r from-assist-blue to-blue-500 hover:from-blue-600 hover:to-blue-700 text-white font-medium h-12 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
              onClick={() => navigate('/mobile/new-task')}
            >
              <Plus size={18} />
              <span>Request New Task</span>
            </Button>
          </div>
          
          {/* Past Orders Section */}
          <section className="mb-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                <History size={18} className="text-assist-blue" />
                Past Tasks
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-assist-blue text-sm p-0 hover:bg-transparent" 
                onClick={() => navigate('/mobile/past-tasks')}
              >
                View All
                <ChevronRight size={16} />
              </Button>
            </div>
            
            {pastTasks.length > 0 ? (
              <div className="space-y-3">
                {pastTasks.map((task, index) => (
                  <Card key={index} className="overflow-hidden border-gray-100 shadow-sm hover:shadow transition-all">
                    <CardContent className="p-0">
                      <div className="flex items-center">
                        <div className="h-16 w-16 bg-cover bg-center" style={{ backgroundImage: `url(${task.image})` }} />
                        <div className="flex-1 p-3">
                          <h3 className="font-medium text-sm text-gray-900">{task.title}</h3>
                          <p className="text-xs text-gray-500">{task.date} • {task.provider}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mr-2 p-1.5 h-auto bg-soft-blue/20 rounded-full"
                          onClick={() => navigate(`/mobile/new-task?template=${task.title.toLowerCase().replace(/\s+/g, '-')}`)}
                        >
                          <Repeat size={16} className="text-assist-blue" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center bg-gray-50 rounded-lg p-6 border border-gray-100">
                <p className="text-gray-600 text-sm">You haven't completed any tasks yet</p>
              </div>
            )}
          </section>
          
          {/* Favorited Tasks Section */}
          <section className="mb-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                <Heart size={18} className="text-red-500" />
                Favorites
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-assist-blue text-sm p-0 hover:bg-transparent" 
                onClick={() => navigate('/mobile/favorites')}
              >
                View All
                <ChevronRight size={16} />
              </Button>
            </div>
            
            {favoritedTasks.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {favoritedTasks.map((task, index) => (
                  <Card key={index} className="overflow-hidden border-gray-100 shadow-sm hover:shadow transition-all">
                    <CardContent className="p-0">
                      <div 
                        className="h-28 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${task.image})` }}
                      />
                      <div className="p-3">
                        <h3 className="font-medium text-sm text-gray-900 mb-1">{task.title}</h3>
                        <p className="text-xs text-assist-blue font-medium">{task.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center bg-gray-50 rounded-lg p-6 border border-gray-100">
                <p className="text-gray-600 text-sm">No favorite tasks yet</p>
              </div>
            )}
          </section>
          
          {/* Categories - Modern and clean design */}
          <section className="rounded-xl mb-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Popular Categories</h2>
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
          
          {/* Popular Tasks Section - Modern cards with clear CTAs */}
          <section className="mb-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                <Star size={18} className="text-amber-500" />
                Popular Tasks
              </h2>
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
              {popularTasks.map((task, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all overflow-hidden"
                  onClick={() => navigate(`/mobile/new-task?template=${task.title.toLowerCase().replace(/\s+/g, '-')}`)}
                >
                  <div className="flex items-start">
                    <div className={`bg-soft-${task.category.toLowerCase() === 'cleaning' ? 'blue' : task.category.toLowerCase() === 'delivery' ? 'green' : 'yellow'} p-4 flex items-center justify-center`}>
                      <span className="text-2xl">{task.category === 'Cleaning' ? '🧹' : task.category === 'Delivery' ? '🚚' : '📚'}</span>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                      <div className="flex items-center text-sm">
                        <span className={`bg-${task.category.toLowerCase() === 'cleaning' ? 'assist-blue' : task.category.toLowerCase() === 'delivery' ? 'green-500' : 'amber-500}/10 text-${task.category.toLowerCase() === 'cleaning' ? 'assist-blue' : task.category.toLowerCase() === 'delivery' ? 'green-600' : 'amber-600'} px-2 py-0.5 rounded text-xs font-medium`}>{task.price}</span>
                        <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-assist-blue transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Upcoming Calendar Section */}
          <section className="mb-2">
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
              <div className="flex items-center justify-between bg-gradient-to-r from-white to-soft-blue/30 rounded-lg p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center">
                  <div className="bg-white text-assist-blue p-2 rounded-lg mr-3 shadow-sm">
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
                  className="text-gray-500 bg-white rounded-full shadow-sm"
                  onClick={() => navigate('/mobile/calendar/1')}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
              
              <div className="flex items-center justify-between bg-gradient-to-r from-white to-soft-green/30 rounded-lg p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center">
                  <div className="bg-white text-green-600 p-2 rounded-lg mr-3 shadow-sm">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-900">Grocery Delivery</h3>
                    <p className="text-xs text-gray-500">Friday, 2:30 PM</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="smallIcon"
                  className="text-gray-500 bg-white rounded-full shadow-sm"
                  onClick={() => navigate('/mobile/calendar/2')}
                >
                  <ChevronRight size={16} />
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
