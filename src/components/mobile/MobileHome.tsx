
import React from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import HomeHeader from "./home/HomeHeader";
import CategoriesSection from "./home/CategoriesSection";
import PopularTasksSection from "./home/PopularTasksSection";

const MobileHome = () => {
  // Categories data to match the original data
  const categories = [
    { name: "Help Moving", icon: "📦", color: "bg-soft-blue" },
    { name: "Furniture Assembly", icon: "🪑", color: "bg-soft-green" },
    { name: "General Mounting", icon: "🔨", color: "bg-soft-yellow" },
    { name: "Cleaning", icon: "🧹", color: "bg-soft-purple" },
    { name: "TV Mounting", icon: "📺", color: "bg-soft-pink" },
    { name: "Heavy Lifting", icon: "💪", color: "bg-soft-orange" }
  ];

  // Expanded popular tasks with at least 12 items to support pagination
  const popularTasks = [
    {
      title: "Weekly Apartment Cleaning",
      description: "Professional cleaning services by verified students",
      price: "From $25/hr",
      category: "Cleaning",
      location: "Columbia University",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Furniture Assembly",
      description: "Students help with assembling your furniture",
      price: "From $30/hr",
      category: "Furniture",
      location: "NYU Area",
      image: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Help Moving",
      description: "Assistance with moving and packing your belongings",
      price: "From $35/hr",
      category: "Moving",
      location: "Midtown",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "TV Mounting Service",
      description: "Get your TV mounted securely by student experts",
      price: "From $40/job",
      category: "Mounting",
      location: "Brooklyn",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Deep House Cleaning",
      description: "Thorough cleaning service for your entire home",
      price: "From $40/hr",
      category: "Cleaning",
      location: "Upper East Side",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Ikea Desk Assembly",
      description: "Get your new desk assembled by experienced students",
      price: "From $25/job",
      category: "Furniture",
      location: "Harlem",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Small Apartment Move",
      description: "Help moving your studio or 1-bedroom apartment",
      price: "From $40/hr",
      category: "Moving",
      location: "Lower East Side",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Shelving Installation",
      description: "Get floating shelves or bookcases mounted securely",
      price: "From $35/job",
      category: "Mounting",
      location: "Chelsea",
      image: "https://images.unsplash.com/photo-1594540634759-8e42a1991cf7?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Window Cleaning",
      description: "Professional window cleaning for sparkling results",
      price: "From $30/hr",
      category: "Cleaning",
      location: "Financial District",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Bookshelf Assembly",
      description: "Get your new bookshelf assembled quickly",
      price: "From $28/job",
      category: "Furniture",
      location: "Upper West Side",
      image: "https://images.unsplash.com/photo-1577304573337-f70d9863936a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Dorm Room Setup",
      description: "Help setting up your dorm room efficiently",
      price: "From $20/hr",
      category: "Moving",
      location: "Columbia University",
      image: "https://images.unsplash.com/photo-1634823668943-96e1d18845e5?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Picture Frame Hanging",
      description: "Get your artwork and photos hung perfectly",
      price: "From $25/job",
      category: "Mounting",
      location: "Greenwich Village",
      image: "https://images.unsplash.com/photo-1577724513455-8315962c6f14?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <>
      <MobileLayout showHeader={false} contentClassName="pb-20 pt-0">
        <div className="space-y-3">
          <HomeHeader userName="Sarah" />
          
          {/* Only kept PopularTasksSection and CategoriesSection */}
          <PopularTasksSection popularTasks={popularTasks} />
          <CategoriesSection categories={categories} />
        </div>
      </MobileLayout>
      <BottomNavigation />
    </>
  );
};

export default MobileHome;
