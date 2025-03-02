
import React from "react";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/CategoryCard";
import { PawPrint, Home, Car } from "lucide-react";

const CategoriesSection: React.FC = () => {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Browse Categories</h2>
        <Button variant="link" className="text-assist-blue">
          See all →
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cursor-pointer">
          <CategoryCard
            icon={PawPrint}
            title="Pet Care"
            description="Services for your furry friends"
            tasks={["🐕 Dog Walking", "🐱 Pet Sitting", "🧼 Pet Grooming"]}
            color="bg-blue-50"
          />
        </div>
        <div className="cursor-pointer">
          <CategoryCard
            icon={Home}
            title="Home Services"
            description="Keep your home in perfect shape"
            tasks={["🧹 House Cleaning", "🛠️ Furniture Assembly", "🧰 Handyman Services"]}
            color="bg-green-50"
          />
        </div>
        <div className="cursor-pointer">
          <CategoryCard
            icon={Car}
            title="Transportation"
            description="Get around with ease"
            tasks={["🚗 Rides", "🛍️ Grocery Delivery", "📦 Package Pickup"]}
            color="bg-purple-50"
          />
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
