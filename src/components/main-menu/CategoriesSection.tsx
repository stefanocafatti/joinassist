
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Coins, Filter } from "lucide-react";
import { PawPrint, Home, Car, ShoppingBag, Briefcase, Utensils, Laptop, Dumbbell, Brush } from "lucide-react";

const CategoriesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { icon: PawPrint, name: "Pet Care", color: "bg-blue-50" },
    { icon: Home, name: "Home Services", color: "bg-green-50" },
    { icon: Car, name: "Transportation", color: "bg-purple-50" },
    { icon: ShoppingBag, name: "Shopping", color: "bg-yellow-50" },
    { icon: Briefcase, name: "Professional", color: "bg-red-50" },
    { icon: Utensils, name: "Food & Dining", color: "bg-orange-50" },
    { icon: Laptop, name: "Tech Support", color: "bg-indigo-50" },
    { icon: Dumbbell, name: "Fitness", color: "bg-teal-50" },
    { icon: Brush, name: "Creative", color: "bg-pink-50" }
  ];
  
  const listings = [
    {
      title: "Dog Walking",
      description: "Regular walks for your furry friend",
      category: "Pet Care",
      location: "Near Westwood",
      image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1000&auto=format&fit=crop",
      price: 25,
      priceType: "hourly",
      pointsEarned: 50
    },
    {
      title: "House Cleaning",
      description: "Get your space spotless",
      category: "Home Services",
      location: "Campus Area",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
      price: 50,
      priceType: "hourly",
      pointsEarned: 100
    },
    {
      title: "Grocery Delivery",
      description: "Get groceries delivered to your door",
      category: "Shopping",
      location: "Santa Monica",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop",
      price: 30,
      priceType: "fixed",
      pointsEarned: 60
    },
    {
      title: "Furniture Assembly",
      description: "Get help putting together your furniture",
      category: "Home Services",
      location: "Westwood",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
      price: 45,
      priceType: "hourly",
      pointsEarned: 90
    },
    {
      title: "Computer Setup",
      description: "Get your new computer ready to use",
      category: "Tech Support",
      location: "UCLA Campus",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      price: 40,
      priceType: "fixed",
      pointsEarned: 80
    },
    {
      title: "Personal Training",
      description: "Achieve your fitness goals",
      category: "Fitness",
      location: "Brentwood",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
      price: 60,
      priceType: "hourly",
      pointsEarned: 120
    },
    {
      title: "Photography Help",
      description: "Learn to take better photos",
      category: "Creative",
      location: "Venice Beach",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
      price: 55,
      priceType: "hourly",
      pointsEarned: 110
    },
    {
      title: "Resume Review",
      description: "Get feedback on your resume",
      category: "Professional",
      location: "Remote",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
      price: 35,
      priceType: "fixed",
      pointsEarned: 70
    },
    {
      title: "Food Delivery",
      description: "Get your favorite food delivered",
      category: "Food & Dining",
      location: "Beverly Hills",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
      price: 20,
      priceType: "fixed",
      pointsEarned: 40
    }
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
