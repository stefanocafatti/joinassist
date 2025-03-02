
import React from "react";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/CategoryCard";
import { PawPrint, Home, Car, ShoppingBag, Briefcase, Utensils, Laptop, Dumbbell, Brush } from "lucide-react";

const CategoriesSection: React.FC = () => {
  const tasks = [
    {
      icon: PawPrint,
      title: "Pet Care",
      description: "Services for your furry friends",
      tasks: ["🐕 Dog Walking", "🐱 Pet Sitting", "🧼 Pet Grooming"],
      color: "bg-blue-50"
    },
    {
      icon: Home,
      title: "Home Services",
      description: "Keep your home in perfect shape",
      tasks: ["🧹 House Cleaning", "🛠️ Furniture Assembly", "🧰 Handyman Services"],
      color: "bg-green-50"
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Get around with ease",
      tasks: ["🚗 Rides", "🛍️ Grocery Delivery", "📦 Package Pickup"],
      color: "bg-purple-50"
    },
    {
      icon: ShoppingBag,
      title: "Shopping",
      description: "Get what you need",
      tasks: ["🛒 Grocery Shopping", "👕 Clothing Pickup", "🎁 Gift Shopping"],
      color: "bg-yellow-50"
    },
    {
      icon: Briefcase,
      title: "Professional",
      description: "Expert assistance",
      tasks: ["📄 Resume Review", "👔 Interview Prep", "📊 Presentation Help"],
      color: "bg-red-50"
    },
    {
      icon: Utensils,
      title: "Food & Dining",
      description: "Culinary assistance",
      tasks: ["🍕 Food Delivery", "🍳 Meal Prep", "🍽️ Dinner Planning"],
      color: "bg-orange-50"
    },
    {
      icon: Laptop,
      title: "Tech Support",
      description: "Digital solutions",
      tasks: ["💻 Computer Setup", "📱 Phone Troubleshooting", "🖨️ Printer Setup"],
      color: "bg-indigo-50"
    },
    {
      icon: Dumbbell,
      title: "Fitness",
      description: "Stay active and healthy",
      tasks: ["🏋️ Personal Training", "🧘 Yoga Instruction", "🏃 Running Partner"],
      color: "bg-teal-50"
    },
    {
      icon: Brush,
      title: "Creative",
      description: "Artistic assistance",
      tasks: ["🎨 Art Lessons", "📸 Photography Help", "🎬 Video Editing"],
      color: "bg-pink-50"
    }
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">All Tasks</h2>
        <Button variant="link" className="text-assist-blue">
          See all →
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tasks.slice(0, 6).map((task, index) => (
          <div key={index} className="cursor-pointer">
            <CategoryCard
              icon={task.icon}
              title={task.title}
              description={task.description}
              tasks={task.tasks}
              color={task.color}
            />
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
