
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Heart, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  price: number;
  priceType: string;
}

interface RecommendedTasksSectionProps {
  tasks: Task[];
  favoriteTaskIds: string[];
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
}

const categories = [
  "All Categories",
  "Pets",
  "Home",
  "Delivery",
  "Transportation",
  "Education",
  "Professional",
  "Events",
  "Digital",
  "Health"
];

const locations = [
  "All Locations",
  "Westwood",
  "Santa Monica",
  "UCLA Campus",
  "Downtown LA",
  "Culver City"
];

const urgencyOptions = [
  "Any Time",
  "Today",
  "This Week",
  "This Month"
];

const taskTypes = [
  "All Types",
  "Recurring",
  "One-time"
];

const RecommendedTasksSection: React.FC<RecommendedTasksSectionProps> = ({ 
  tasks, 
  favoriteTaskIds, 
  onFavoriteToggle, 
  onBookNow 
}) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [filterCategory, setFilterCategory] = useState<string>("All Categories");
  const [filterLocation, setFilterLocation] = useState<string>("All Locations");
  const [filterUrgency, setFilterUrgency] = useState<string>("Any Time");
  const [filterType, setFilterType] = useState<string>("All Types");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const applyFilters = () => {
    let newFilteredTasks = [...tasks];
    const newActiveFilters: string[] = [];
    
    if (filterCategory !== "All Categories") {
      newFilteredTasks = newFilteredTasks.filter(task => 
        task.category.toLowerCase() === filterCategory.toLowerCase()
      );
      newActiveFilters.push(`Category: ${filterCategory}`);
    }
    
    if (filterLocation !== "All Locations") {
      newFilteredTasks = newFilteredTasks.filter(task => 
        task.location.includes(filterLocation)
      );
      newActiveFilters.push(`Location: ${filterLocation}`);
    }
    
    if (filterUrgency !== "Any Time") {
      // In a real app, this would filter based on task dates
      newActiveFilters.push(`Urgency: ${filterUrgency}`);
    }
    
    if (filterType !== "All Types") {
      // In a real app, this would filter based on task type (recurring vs one-time)
      newActiveFilters.push(`Type: ${filterType}`);
    }
    
    setFilteredTasks(newFilteredTasks);
    setActiveFilters(newActiveFilters);
    setIsFilterDialogOpen(false);
  };
  
  const clearFilters = () => {
    setFilterCategory("All Categories");
    setFilterLocation("All Locations");
    setFilterUrgency("Any Time");
    setFilterType("All Types");
    setFilteredTasks(tasks);
    setActiveFilters([]);
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recommended For You</h2>
        
        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Tasks</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                  <SelectTrigger id="urgency">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="task-type">Task Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger id="task-type">
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    {taskTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800">
              {filter}
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 hover:text-blue-800 h-6 p-0 ml-2"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
            onClick={() => onBookNow(task.title)}
          >
            <div className="relative">
              <div 
                className="h-40 bg-cover bg-center" 
                style={{ backgroundImage: `url(${task.image})` }}
              />
              <button 
                className="absolute top-3 right-3"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteToggle(task.title);
                }}
              >
                <Heart 
                  className={`h-5 w-5 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{task.category}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>
              <div className="flex justify-end items-center">
                <Button 
                  size="sm" 
                  className="bg-assist-blue hover:bg-assist-blue/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookNow(task.title);
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" /> View Task
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="link" className="text-assist-blue">
          View all recommendations →
        </Button>
      </div>
    </section>
  );
};

export default RecommendedTasksSection;
