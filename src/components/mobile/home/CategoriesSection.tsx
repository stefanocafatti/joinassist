
import React from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  icon: string;
  color: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  const navigate = useNavigate();

  // Extended list of services to match the design in the image
  const extendedCategories = [
    { name: "Help Moving", icon: "📦" },
    { name: "Truck Assisted Help Moving", icon: "🚚" },
    { name: "Furniture Assembly", icon: "🪑" },
    { name: "General Mounting", icon: "🔨" },
    { name: "Cleaning", icon: "🧹" },
    { name: "TV Mounting", icon: "📺" },
    { name: "Electrical help", icon: "⚡" },
    { name: "Plumbing help", icon: "🚿" },
    { name: "Yard Work", icon: "🌱" },
    { name: "Trash & Furniture Removal", icon: "🗑️" },
    { name: "Indoor Painting", icon: "🎨" },
    { name: "Door, Cabinet, & Furniture Repair", icon: "🚪" },
    { name: "Errands", icon: "🏃" },
    { name: "Landscaping Help", icon: "🌿" },
    { name: "Flooring & Tiling Help", icon: "🧱" },
    { name: "Wall Repair", icon: "🧰" }
  ];

  return (
    <section className="mb-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Looking for something else?</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {extendedCategories.map((category, index) => (
          <button
            key={index}
            className="border border-assist-blue rounded-full px-4 py-2.5 text-assist-blue font-medium hover:bg-assist-blue hover:text-white transition-colors duration-200"
            onClick={() => navigate(`/mobile/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
