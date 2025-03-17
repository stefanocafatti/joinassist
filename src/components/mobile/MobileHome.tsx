
import React from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import HomeHeader from "./home/HomeHeader";
import PastTasksSection from "./home/PastTasksSection";
import FavoritesSection from "./home/FavoritesSection";
import CategoriesSection from "./home/CategoriesSection";
import PopularTasksSection from "./home/PopularTasksSection";
import UpcomingSection from "./home/UpcomingSection";

const MobileHome = () => {
  // Categories data
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
          <HomeHeader userName="Sarah" />
          <PastTasksSection pastTasks={pastTasks} />
          <FavoritesSection favoritedTasks={favoritedTasks} />
          <CategoriesSection categories={categories} />
          <PopularTasksSection popularTasks={popularTasks} />
          <UpcomingSection />
        </div>
      </MobileLayout>
      <BottomNavigation />
    </>
  );
};

export default MobileHome;
