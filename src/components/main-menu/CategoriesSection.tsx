
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Coins, Filter } from "lucide-react";
import { 
  Brush, Home, Car, ShoppingBag, Briefcase, 
  Utensils, Laptop, Dumbbell, PartyPopper, 
  GraduationCap, Package, Star
} from "lucide-react";

const CategoriesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { icon: Brush, name: "Cleaning", color: "bg-blue-50" },
    { icon: Car, name: "Transportation and Moving", color: "bg-green-50" },
    { icon: Package, name: "Assembly", color: "bg-purple-50" },
    { icon: GraduationCap, name: "Academic & Professional Help", color: "bg-yellow-50" },
    { icon: Laptop, name: "Digital Services", color: "bg-red-50" },
    { icon: Dumbbell, name: "Fitness and Wellness", color: "bg-teal-50" },
    { icon: PartyPopper, name: "Event and Hospitality", color: "bg-pink-50" },
    { icon: Star, name: "Special Tasks", color: "bg-orange-50" },
    { icon: Briefcase, name: "For Brands", color: "bg-indigo-50" }
  ];
  
  const listings = [
    // Cleaning Tasks
    {
      title: "Wash my Car",
      description: "Get your car clean and shiny",
      category: "Cleaning",
      location: "Near Westwood",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1000&auto=format&fit=crop",
      price: 25,
      priceType: "fixed",
      pointsEarned: 50
    },
    {
      title: "Clean my Car",
      description: "Interior and exterior cleaning",
      category: "Cleaning",
      location: "UCLA Area",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
      price: 30,
      priceType: "fixed",
      pointsEarned: 60
    },
    {
      title: "Clean my Garage",
      description: "Organize and clean your garage space",
      category: "Cleaning",
      location: "Brentwood",
      image: "https://images.unsplash.com/photo-1445183093023-46f6c0fcc3d3?q=80&w=1000&auto=format&fit=crop",
      price: 45,
      priceType: "hourly",
      pointsEarned: 90
    },
    {
      title: "Clean my Room",
      description: "Tidying and organizing service",
      category: "Cleaning",
      location: "Campus Housing",
      image: "https://images.unsplash.com/photo-1584071694229-7d162c787930?q=80&w=1000&auto=format&fit=crop",
      price: 35,
      priceType: "hourly",
      pointsEarned: 70
    },
    {
      title: "Clean my Kitchen",
      description: "Complete kitchen cleaning service",
      category: "Cleaning",
      location: "Westwood",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1000&auto=format&fit=crop",
      price: 40,
      priceType: "hourly",
      pointsEarned: 80
    },
    {
      title: "Clean my Windows",
      description: "Crystal clear window cleaning",
      category: "Cleaning",
      location: "Santa Monica",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop",
      price: 35,
      priceType: "hourly",
      pointsEarned: 70
    },
    {
      title: "Deep Clean Apartment",
      description: "Thorough cleaning of your entire space",
      category: "Cleaning",
      location: "Santa Monica",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
      price: 75,
      priceType: "fixed",
      pointsEarned: 150
    },
    {
      title: "Clean my Pool",
      description: "Pool maintenance and cleaning",
      category: "Cleaning",
      location: "Bel Air",
      image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=1000&auto=format&fit=crop",
      price: 55,
      priceType: "hourly",
      pointsEarned: 110
    },
    {
      title: "Post Event Clean Up",
      description: "Clean up after your party or event",
      category: "Cleaning",
      location: "Los Angeles",
      image: "https://images.unsplash.com/photo-1596461010414-7da839c5498d?q=80&w=1000&auto=format&fit=crop",
      price: 60,
      priceType: "fixed",
      pointsEarned: 120
    },
    
    // Transportation and Moving Tasks
    {
      title: "Moving Assistance",
      description: "Help with your move across town",
      category: "Transportation and Moving",
      location: "Westwood",
      image: "https://images.unsplash.com/photo-1600518464441-9306b008de8d?q=80&w=1000&auto=format&fit=crop",
      price: 40,
      priceType: "hourly",
      pointsEarned: 80
    },
    {
      title: "Help with Loading Items",
      description: "Extra hands for loading your belongings",
      category: "Transportation and Moving",
      location: "UCLA",
      image: "https://images.unsplash.com/photo-1530650314597-5209931bcdae?q=80&w=1000&auto=format&fit=crop",
      price: 30,
      priceType: "hourly",
      pointsEarned: 60
    },
    {
      title: "Drive me to a Location",
      description: "Reliable ride to your destination",
      category: "Transportation and Moving",
      location: "Los Angeles Area",
      image: "https://images.unsplash.com/photo-1529369623266-f5264b696110?q=80&w=1000&auto=format&fit=crop",
      price: 25,
      priceType: "fixed",
      pointsEarned: 50
    },
    {
      title: "Pick me up from Location",
      description: "Scheduled pickup from your location",
      category: "Transportation and Moving",
      location: "Los Angeles",
      image: "https://images.unsplash.com/photo-1617861944037-28f1c378a23b?q=80&w=1000&auto=format&fit=crop",
      price: 25,
      priceType: "fixed",
      pointsEarned: 50
    },
    {
      title: "Drop of a package",
      description: "Courier service for your items",
      category: "Transportation and Moving",
      location: "Westwood",
      image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=1000&auto=format&fit=crop",
      price: 20,
      priceType: "fixed",
      pointsEarned: 40
    },
    {
      title: "Pick up a package",
      description: "Pickup and delivery service",
      category: "Transportation and Moving",
      location: "UCLA Area",
      image: "https://images.unsplash.com/photo-1586769852836-bc069f19e1be?q=80&w=1000&auto=format&fit=crop",
      price: 20,
      priceType: "fixed",
      pointsEarned: 40
    },
    
    // Assembly Tasks
    {
      title: "Assemble Bed Frame",
      description: "Expert assembly of your new bed",
      category: "Assembly",
      location: "Westwood",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
      price: 50,
      priceType: "fixed",
      pointsEarned: 100
    },
    {
      title: "Assemble my Furniture",
      description: "Professional furniture assembly",
      category: "Assembly",
      location: "Santa Monica",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop",
      price: 60,
      priceType: "hourly",
      pointsEarned: 120
    },
    {
      title: "Install TV Mount",
      description: "Secure mounting of your television",
      category: "Assembly",
      location: "Brentwood",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1000&auto=format&fit=crop",
      price: 45,
      priceType: "fixed",
      pointsEarned: 90
    },
    {
      title: "Assemble IKEA Furniture",
      description: "Professional IKEA furniture assembly",
      category: "Assembly",
      location: "UCLA Campus",
      image: "https://images.unsplash.com/photo-1595428774863-a38feabce63f?q=80&w=1000&auto=format&fit=crop",
      price: 55,
      priceType: "hourly",
      pointsEarned: 110
    },
    {
      title: "Install a Shelf",
      description: "Mounting and installation of shelves",
      category: "Assembly",
      location: "Westwood",
      image: "https://images.unsplash.com/photo-1588852656646-0c140c3a8050?q=80&w=1000&auto=format&fit=crop",
      price: 40,
      priceType: "fixed",
      pointsEarned: 80
    },
    {
      title: "Assemble Office Desk or Chairs",
      description: "Assembly for your workspace furniture",
      category: "Assembly",
      location: "West LA",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1000&auto=format&fit=crop",
      price: 50,
      priceType: "fixed",
      pointsEarned: 100
    },
    
    // Academic & Professional Help
    {
      title: "Writing Essays",
      description: "Professional writing assistance",
      category: "Academic & Professional Help",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
      price: 40,
      priceType: "hourly",
      pointsEarned: 80
    },
    {
      title: "Teach me Math",
      description: "One-on-one math tutoring",
      category: "Academic & Professional Help",
      location: "Library Area",
      image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1000&auto=format&fit=crop",
      price: 45,
      priceType: "hourly",
      pointsEarned: 90
    },
    {
      title: "College Counseling",
      description: "Expert guidance for college applications",
      category: "Academic & Professional Help",
      location: "UCLA",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
      price: 50,
      priceType: "hourly",
      pointsEarned: 100
    },
    {
      title: "SAT/ACT Prep",
      description: "Test preparation coaching",
      category: "Academic & Professional Help",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=1000&auto=format&fit=crop",
      price: 45,
      priceType: "hourly",
      pointsEarned: 90
    },
    {
      title: "Resume Review",
      description: "Professional feedback on your resume",
      category: "Academic & Professional Help",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1507209550472-5908c9176456?q=80&w=1000&auto=format&fit=crop",
      price: 35,
      priceType: "fixed",
      pointsEarned: 70
    },
    {
      title: "Create a LinkedIn Profile",
      description: "Professional profile creation",
      category: "Academic & Professional Help",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1000&auto=format&fit=crop",
      price: 40,
      priceType: "fixed",
      pointsEarned: 80
    },
    
    // Digital Services
    {
      title: "Code a Website",
      description: "Custom website development",
      category: "Digital Services",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      price: 80,
      priceType: "hourly",
      pointsEarned: 160
    },
    {
      title: "Video Editing",
      description: "Professional video editing services",
      category: "Digital Services",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1574717024453-354056afd6fc?q=80&w=1000&auto=format&fit=crop",
      price: 60,
      priceType: "hourly",
      pointsEarned: 120
    },
    {
      title: "Graphic Design Support",
      description: "Creative design for your projects",
      category: "Digital Services",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      price: 55,
      priceType: "hourly",
      pointsEarned: 110
    },
    {
      title: "Fix my Bugs",
      description: "Debug and fix your code issues",
      category: "Digital Services",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop",
      price: 65,
      priceType: "hourly",
      pointsEarned: 130
    },
    {
      title: "Social Media Content",
      description: "Engaging content for your social platforms",
      category: "Digital Services",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
      price: 50,
      priceType: "hourly",
      pointsEarned: 100
    },
    {
      title: "App Development",
      description: "Custom mobile application development",
      category: "Digital Services",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
      price: 85,
      priceType: "hourly",
      pointsEarned: 170
    },
    
    // Fitness and Wellness
    {
      title: "Personal Training",
      description: "Customized workout sessions",
      category: "Fitness and Wellness",
      location: "Recreation Center",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
      price: 60,
      priceType: "hourly",
      pointsEarned: 120
    },
    {
      title: "Meal Prep",
      description: "Healthy meal preparation",
      category: "Fitness and Wellness",
      location: "Your Kitchen",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1000&auto=format&fit=crop",
      price: 45,
      priceType: "hourly",
      pointsEarned: 90
    },
    {
      title: "Yoga Instruction",
      description: "Private yoga sessions",
      category: "Fitness and Wellness",
      location: "Your Location",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1000&auto=format&fit=crop",
      price: 50,
      priceType: "hourly",
      pointsEarned: 100
    },
    {
      title: "Pilates Instructor",
      description: "Personal pilates training",
      category: "Fitness and Wellness",
      location: "Recreation Center",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
      price: 55,
      priceType: "hourly",
      pointsEarned: 110
    },
    {
      title: "Meditation/Wellness Coaching",
      description: "Guided meditation and wellness sessions",
      category: "Fitness and Wellness",
      location: "Your Choice",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
      price: 45,
      priceType: "hourly",
      pointsEarned: 90
    },
    {
      title: "Come with me to Workout",
      description: "Workout buddy for motivation",
      category: "Fitness and Wellness",
      location: "Gym",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
      price: 35,
      priceType: "hourly",
      pointsEarned: 70
    },
    
    // Event and Hospitality
    {
      title: "Event Setup/Decoration",
      description: "Professional event decorating",
      category: "Event and Hospitality",
      location: "Your Venue",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
      price: 65,
      priceType: "hourly",
      pointsEarned: 130
    },
    {
      title: "DJ for Event",
      description: "Music services for your gathering",
      category: "Event and Hospitality",
      location: "Your Event",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
      price: 100,
      priceType: "hourly",
      pointsEarned: 200
    },
    {
      title: "Party Coordinator",
      description: "Expert party planning assistance",
      category: "Event and Hospitality",
      location: "Your Location",
      image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=1000&auto=format&fit=crop",
      price: 70,
      priceType: "hourly",
      pointsEarned: 140
    },
    {
      title: "Catering Assistance",
      description: "Help with food service at your event",
      category: "Event and Hospitality",
      location: "Event Venue",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop",
      price: 55,
      priceType: "hourly",
      pointsEarned: 110
    },
    {
      title: "Barman for Event",
      description: "Professional bartending services",
      category: "Event and Hospitality",
      location: "Your Event",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop",
      price: 65,
      priceType: "hourly",
      pointsEarned: 130
    },
    {
      title: "Photographers for Events",
      description: "Professional event photography",
      category: "Event and Hospitality",
      location: "Your Event",
      image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop",
      price: 80,
      priceType: "hourly",
      pointsEarned: 160
    },
    
    // Special Tasks
    {
      title: "Grocery Delivery",
      description: "Get groceries delivered to your door",
      category: "Special Tasks",
      location: "Westwood Area",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop",
      price: 30,
      priceType: "fixed",
      pointsEarned: 60
    },
    {
      title: "Water my Plants",
      description: "Plant care while you're away",
      category: "Special Tasks",
      location: "Your Residence",
      image: "https://images.unsplash.com/photo-1446071103084-c257b5f70672?q=80&w=1000&auto=format&fit=crop",
      price: 20,
      priceType: "fixed",
      pointsEarned: 40
    },
    {
      title: "Do my Laundry",
      description: "Full-service laundry assistance",
      category: "Special Tasks",
      location: "UCLA Area",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1000&auto=format&fit=crop",
      price: 35,
      priceType: "fixed",
      pointsEarned: 70
    },
    {
      title: "Clean my Bong",
      description: "Professional cleaning service",
      category: "Special Tasks",
      location: "Your Location",
      image: "https://images.unsplash.com/photo-1530856021941-02c71be5926f?q=80&w=1000&auto=format&fit=crop",
      price: 25,
      priceType: "fixed",
      pointsEarned: 50
    },
    {
      title: "Help me Pack for a Trip",
      description: "Organized packing assistance",
      category: "Special Tasks",
      location: "Your Home",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1000&auto=format&fit=crop",
      price: 30,
      priceType: "hourly",
      pointsEarned: 60
    },
    {
      title: "Wash my Dog",
      description: "Pet grooming service",
      category: "Special Tasks",
      location: "Your Location",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1000&auto=format&fit=crop",
      price: 40,
      priceType: "fixed",
      pointsEarned: 80
    },
    
    // For Brands
    {
      title: "Brand Ambassador",
      description: "Represent your brand on campus",
      category: "For Brands",
      location: "UCLA Campus",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
      price: 55,
      priceType: "hourly",
      pointsEarned: 110
    },
    {
      title: "Content Creation",
      description: "Custom content for your marketing",
      category: "For Brands",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1000&auto=format&fit=crop",
      price: 65,
      priceType: "hourly",
      pointsEarned: 130
    },
    {
      title: "Market Research",
      description: "In-depth research and insights",
      category: "For Brands",
      location: "Campus Area",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      price: 50,
      priceType: "hourly",
      pointsEarned: 100
    },
    {
      title: "Surveys + Feedback",
      description: "Collect and analyze user feedback",
      category: "For Brands",
      location: "UCLA",
      image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=1000&auto=format&fit=crop",
      price: 45,
      priceType: "hourly",
      pointsEarned: 90
    },
    {
      title: "Social Media Management",
      description: "Professional social media handling",
      category: "For Brands",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
      price: 60,
      priceType: "hourly",
      pointsEarned: 120
    },
    {
      title: "Product Testing",
      description: "Thorough testing and feedback",
      category: "For Brands",
      location: "Various",
      image: "https://images.unsplash.com/photo-1588600878108-578031aa6e0f?q=80&w=1000&auto=format&fit=crop",
      price: 40,
      priceType: "hourly",
      pointsEarned: 80
    },
  ];

  const filteredListings = selectedCategory 
    ? listings.filter(listing => listing.category === selectedCategory)
    : listings;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
        <Button variant="outline" size="sm" className="text-assist-blue border-assist-blue">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      {/* Category filter buttons - improved layout */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 pb-4">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={`mb-1 ${selectedCategory === null ? "bg-assist-blue" : ""}`}
          >
            All
          </Button>
          
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center whitespace-nowrap mb-1 ${
                  selectedCategory === category.name ? "bg-assist-blue" : ""
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
          >
            <div className="relative">
              <div 
                className="h-40 bg-cover bg-center" 
                style={{ backgroundImage: `url(${listing.image})` }}
              />
              <button 
                className="absolute top-3 right-3"
                onClick={(e) => {
                  e.stopPropagation();
                  // Favorite toggle would go here
                }}
              >
                <Heart className="h-5 w-5 text-gray-500" />
              </button>
              {listing.pointsEarned && (
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-assist-blue/80 text-white flex items-center">
                    <Coins className="h-3 w-3 mr-1" />
                    Earn {listing.pointsEarned} points
                  </Badge>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{listing.category}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{listing.description}</p>
              <p className="text-xs text-gray-500 mb-4">{listing.location} • ${listing.price}/{listing.priceType}</p>
              <div className="flex justify-end items-center">
                <Button 
                  size="sm" 
                  className="bg-assist-blue hover:bg-assist-blue/90"
                >
                  <Eye className="h-4 w-4 mr-1" /> View Task
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline" className="text-assist-blue border-assist-blue hover:bg-assist-blue/10">
          Load More Tasks
        </Button>
      </div>
    </section>
  );
};

export default CategoriesSection;
