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
    { name: "Help Moving", icon: "📦", color: "bg-soft-blue" },
    { name: "Furniture Assembly", icon: "🪑", color: "bg-soft-green" },
    { name: "General Mounting", icon: "🔨", color: "bg-soft-yellow" },
    { name: "Cleaning", icon: "🧹", color: "bg-soft-purple" },
    { name: "TV Mounting", icon: "📺", color: "bg-soft-pink" },
    { name: "Heavy Lifting", icon: "💪", color: "bg-soft-orange" }
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
      title: "Furniture Assembly",
      description: "Students help with assembling your furniture",
      price: "From $30/hr",
      category: "Furniture",
      image: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Help Moving",
      description: "Assistance with moving and packing your belongings",
      price: "From $35/hr",
      category: "Moving",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  // Use the route to check if we're on search page
  const isSearchPage = window.location.pathname.includes('/mobile/search');

  return (
    <>
      <MobileLayout showHeader={false}>
        <div className="space-y-6">
          <HomeHeader userName="Sarah" />
          
          {/* Only show other sections if not on search page */}
          {!isSearchPage && (
            <>
              <PastTasksSection pastTasks={pastTasks} />
              <FavoritesSection favoritedTasks={favoritedTasks} />
              <CategoriesSection categories={categories} />
              <PopularTasksSection popularTasks={popularTasks} />
              <UpcomingSection />
            </>
          )}
        </div>
      </MobileLayout>
      <BottomNavigation />
    </>
  );
};

export default MobileHome;
