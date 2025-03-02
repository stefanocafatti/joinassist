
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
      image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1000&auto=format&fit=crop",
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
      title: "Deep Clean Apartment",
      description: "Thorough cleaning of your entire space",
      category: "Cleaning",
      location: "Santa Monica",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop",
      price: 75,
      priceType: "fixed",
      pointsEarned: 150
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
      title: "Install TV Mount",
      description: "Secure mounting of your television",
      category: "Assembly",
      location: "Brentwood",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1000&auto=format&fit=crop",
      price: 45,
      priceType: "fixed",
      pointsEarned: 90
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
      title: "Resume Review",
      description: "Professional feedback on your resume",
      category: "Academic & Professional Help",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1507209550472-5908c9176456?q=80&w=1000&auto=format&fit=crop",
      price: 35,
      priceType: "fixed",
      pointsEarned: 70
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
      title: "Social Media Content",
      description: "Engaging content for your social platforms",
      category: "Digital Services",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
      price: 50,
      priceType: "hourly",
      pointsEarned: 100
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
  ];

  const filteredListings = selectedCategory 
    ? listings.filter(listing => listing.category === selectedCategory)
    : listings;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">All Tasks</h2>
        <Button variant="outline" size="sm" className="text-assist-blue border-assist-blue">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      {/* Category filter buttons */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? "bg-assist-blue" : ""}
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
                className={`flex items-center whitespace-nowrap ${
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
