
import React from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import HomeHeader from "./home/HomeHeader";
import CategoriesSection from "./home/CategoriesSection";
import PopularTasksSection from "./home/PopularTasksSection";

const MobileHome = () => {
  // Additional tasks data to display in the "Looking for something else?" section
  const additionalTasks = [
    { title: "Research Assistant", color: "bg-soft-blue" },
    { title: "Presentation Help", color: "bg-soft-green" },
    { title: "Essay Editing", color: "bg-soft-orange" },
    { title: "Study Partner", color: "bg-soft-yellow" },
    { title: "Language Tutor", color: "bg-soft-purple" },
    { title: "Grocery Shopping", color: "bg-soft-pink" }
  ];

  // Expanded popular tasks tailored for college student helpers
  const popularTasks = [
    {
      title: "Apartment Cleaning", // Updated from "Weekly Apartment Cleaning"
      description: "Professional cleaning services by verified students",
      price: "From $25/hr",
      category: "Cleaning",
      location: "Columbia University",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Resume Review",
      description: "Get your resume reviewed by students in business or HR",
      price: "From $20/hr",
      category: "Academic",
      location: "NYU Area",
      image: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Apartment Move", // Updated from "Help Moving"
      description: "Assistance with moving and packing your belongings",
      price: "From $30/hr",
      category: "Moving",
      location: "Midtown",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Math Tutoring",
      description: "One-on-one math tutoring from STEM students",
      price: "From $25/hr",
      category: "Academic",
      location: "Brooklyn",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Car Cleaning", // Updated from "Deep House Cleaning"
      description: "Thorough cleaning service for your entire home",
      price: "From $40/hr",
      category: "Cleaning",
      location: "Upper East Side",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Proofreading",
      description: "Get your essays and papers proofread by English majors",
      price: "From $15/hr",
      category: "Academic",
      location: "Harlem",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Food Delivery",
      description: "Get food delivered from your favorite restaurants",
      price: "From $15/hr",
      category: "Errands",
      location: "Lower East Side",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Tech Support",
      description: "Troubleshooting and tech setup by IT students",
      price: "From $20/hr",
      category: "Tech",
      location: "Chelsea",
      image: "https://images.unsplash.com/photo-1594540634759-8e42a1991cf7?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Grocery Delivery",
      description: "Student runners for your grocery shopping needs",
      price: "From $15/hr",
      category: "Errands",
      location: "Financial District",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Website Building",
      description: "Basic website creation by CS students",
      price: "From $30/hr",
      category: "Tech",
      location: "Upper West Side",
      image: "https://images.unsplash.com/photo-1577724513455-8315962c6f14?q=80&w=1000&auto=format&fit=crop"
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
      title: "Language Tutoring",
      description: "Learn a new language from native-speaking students",
      price: "From $25/hr",
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
