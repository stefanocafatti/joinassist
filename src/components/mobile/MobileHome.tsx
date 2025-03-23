import React from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import HomeHeader from "./home/HomeHeader";
import CategoriesSection from "./home/CategoriesSection";
import PopularTasksSection from "./home/PopularTasksSection";

const MobileHome = () => {
  // Additional tasks data to display in the "Looking for something else?" section
  // No color property needed anymore since we're using standard white background
  const additionalTasks = [
    { title: "Research Assistant" },
    { title: "Presentation Help" },
    { title: "Essay Editing" },
    { title: "Study Partner" },
    { title: "Language Tutor" },
    { title: "Grocery Shopping" }
  ];

  // Expanded popular tasks tailored for college student helpers
  const popularTasks = [
    {
      title: "Clean my apartment",
      description: "Professional cleaning services by verified students",
      price: "From $25/hr",
      category: "Cleaning",
      location: "Columbia University",
      image: "/lovable-uploads/84373410-0ca0-44aa-bce4-fecda1465ffb.png"
    },
    {
      title: "Apartment deep cleaning",
      description: "Get your resume reviewed by students in business or HR",
      price: "From $20/hr",
      category: "Cleaning",
      location: "NYU Area",
      image: "/lovable-uploads/1dcc2d11-c9a3-4da3-91b5-187b6f61f0f5.png"
    },
    {
      title: "Do my laundry", 
      description: "Assistance with moving and packing your belongings",
      price: "From $30/hr",
      category: "Home Services",
      location: "Midtown",
      image: "/lovable-uploads/bd95bdf7-c140-465b-8e12-3a21d5d46a94.png"
    },
    {
      title: "Organize my closet",
      description: "One-on-one math tutoring from STEM students",
      price: "From $25/hr",
      category: "Home Services",
      location: "Brooklyn",
      image: "/lovable-uploads/1dcc2d11-c9a3-4da3-91b5-187b6f61f0f5.png"
    },
    {
      title: "Build my IKEA desk", 
      description: "Thorough cleaning service for your entire home",
      price: "From $40/hr",
      category: "Furniture Assembly",
      location: "Upper East Side",
      image: "/lovable-uploads/1dcc2d11-c9a3-4da3-91b5-187b6f61f0f5.png"
    },
    {
      title: "Proofreading",
      description: "Get your essays and papers proofread by English majors",
      price: "From $15/hr",
      category: "Academic",
      location: "Harlem",
      image: "/lovable-uploads/e44adaaa-4a6d-435e-a3de-9355591817a8.png"
    },
    {
      title: "Food Delivery",
      description: "Get food delivered from your favorite restaurants",
      price: "From $15/hr",
      category: "Errands",
      location: "Lower East Side",
      image: "/lovable-uploads/c63ac0bf-b196-42d2-8004-012ba59ad57e.png"
    },
    {
      title: "Tech Support",
      description: "Troubleshooting and tech setup by IT students",
      price: "From $20/hr",
      category: "Tech",
      location: "Chelsea",
      image: "/lovable-uploads/e44adaaa-4a6d-435e-a3de-9355591817a8.png"
    },
    {
      title: "Grocery Delivery",
      description: "Student runners for your grocery shopping needs",
      price: "From $15/hr",
      category: "Errands",
      location: "Financial District",
      image: "/lovable-uploads/e44adaaa-4a6d-435e-a3de-9355591817a8.png"
    },
    {
      title: "Website Building",
      description: "Basic website creation by CS students",
      price: "From $30/hr",
      category: "Tech",
      location: "Upper West Side",
      image: "/lovable-uploads/e44adaaa-4a6d-435e-a3de-9355591817a8.png"
    },
    {
      title: "Dorm Room Setup",
      description: "Help setting up your dorm room efficiently",
      price: "From $20/hr",
      category: "Moving",
      location: "Columbia University",
      image: "/lovable-uploads/e44adaaa-4a6d-435e-a3de-9355591817a8.png"
    },
    {
      title: "Language Tutoring",
      description: "Learn a new language from native-speaking students",
      price: "From $25/hr",
      category: "Academic",
      location: "Greenwich Village",
      image: "/lovable-uploads/e44adaaa-4a6d-435e-a3de-9355591817a8.png"
    }
  ];

  return (
    <>
      <MobileLayout showHeader={false} contentClassName="pb-20 pt-0">
        <div className="space-y-3">
          <HomeHeader userName="Sarah" />
          
          {/* Reordered: PopularTasksSection first, then CategoriesSection */}
          <PopularTasksSection popularTasks={popularTasks} />
          <CategoriesSection additionalTasks={additionalTasks} />
        </div>
      </MobileLayout>
      <BottomNavigation />
    </>
  );
};

export default MobileHome;
