
import React from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import HomeHeader from "./home/HomeHeader";
import CategoriesSection from "./home/CategoriesSection";
import PopularTasksSection from "./home/PopularTasksSection";

const MobileHome = () => {
  // Additional tasks data to display in the "Looking for something else?" section
  const additionalTasks = [
    { title: "Research Help", color: "bg-soft-green" },
    { title: "Computer Help", color: "bg-soft-blue" },
    { title: "Campus Delivery", color: "bg-soft-orange" },
    { title: "Note Taking", color: "bg-soft-yellow" },
    { title: "Tutoring", color: "bg-soft-purple" },
    { title: "Grocery Shopping", color: "bg-soft-pink" }
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
      title: "Dorm Room Organization",
      description: "Get help organizing your dorm from fellow students",
      price: "From $20/hr",
      category: "Cleaning",
      location: "NYU Area",
      image: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Help Moving In/Out",
      description: "Assistance with moving and packing your belongings",
      price: "From $35/hr",
      category: "Moving",
      location: "Midtown",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Tech Setup Assistance",
      description: "Get help setting up your devices and software",
      price: "From $30/job",
      category: "Tech",
      location: "Brooklyn",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Research Assistance",
      description: "Get help finding sources for your papers and projects",
      price: "From $25/hr",
      category: "Academic",
      location: "Upper East Side",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Study Group Organization",
      description: "Help setting up and coordinating study groups for your classes",
      price: "From $15/hr",
      category: "Academic",
      location: "Harlem",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Grocery Delivery",
      description: "Get groceries delivered to your dorm or apartment",
      price: "From $15/hr",
      category: "Errands",
      location: "Lower East Side",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Meal Prep Assistance",
      description: "Help with preparing meals for the week ahead",
      price: "From $25/hr",
      category: "Food",
      location: "Chelsea",
      image: "https://images.unsplash.com/photo-1594540634759-8e42a1991cf7?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Resume Review",
      description: "Get feedback on your resume from experienced students",
      price: "From $20/hr",
      category: "Academic",
      location: "Financial District",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "LinkedIn Profile Optimization",
      description: "Improve your LinkedIn profile with help from marketing students",
      price: "From $25/job",
      category: "Academic",
      location: "Upper West Side",
      image: "https://images.unsplash.com/photo-1577724513455-8315962c6f14?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Campus Tour Guide",
      description: "Private campus tours for prospective students or visitors",
      price: "From $20/hr",
      category: "Errands",
      location: "Columbia University",
      image: "https://images.unsplash.com/photo-1634823668943-96e1d18845e5?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Presentation Design Help",
      description: "Get help creating professional presentations for class",
      price: "From $30/job",
      category: "Academic",
      location: "Greenwich Village",
      image: "https://images.unsplash.com/photo-1577724513455-8315962c6f14?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <>
      <MobileLayout showHeader={false} contentClassName="pb-20 pt-0">
        <div className="space-y-3"> {/* Reduced vertical spacing between sections */}
          <HomeHeader userName="Sarah" />
          
          {/* Only show PopularTasks and Additional Tasks sections */}
          <PopularTasksSection popularTasks={popularTasks} />
          <CategoriesSection additionalTasks={additionalTasks} />
        </div>
      </MobileLayout>
      <BottomNavigation />
    </>
  );
};

export default MobileHome;
