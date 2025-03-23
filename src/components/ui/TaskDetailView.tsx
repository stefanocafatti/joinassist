import React, { useState } from "react";
import { format } from "date-fns";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import ConfettiPopup from "./ConfettiPopup";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image?: string;
}

interface TaskDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskBooked: (
    taskTitle: string, 
    date: Date, 
    time: string, 
    priceType?: string, 
    price?: number,
    location?: string,
    additionalInfo?: string
  ) => void;
  task?: Task;
  isCustomTask?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: (taskTitle: string) => void;
}

const times = [
  "8:00 AM", "8:30 AM", 
  "9:00 AM", "9:30 AM", 
  "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", 
  "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", 
  "2:00 PM", "2:30 PM", 
  "3:00 PM", "3:30 PM", 
  "4:00 PM", "4:30 PM", 
  "5:00 PM", "5:30 PM",
  "6:00 PM"
];

const companyDefinedPrices: {[key: string]: number} = {
  "Cleaning": 30,
  "Transportation": 25,
  "Transportation and Moving": 35,
  "Delivery": 20,
  "Assembly": 40,
  "Academic & Professional Help": 45,
  "Academic Help": 45,
  "Digital Services": 50,
  "Fitness and Wellness": 40,
  "Fitness & Wellness": 40,
  "Event and Hospitality": 35,
  "Event & Hospitality": 35,
  "Special Tasks": 30,
  "For Brands": 60,
  "Pets": 25,
  "Home": 35,
  "default": 25
};

const availableCategories = [
  "Cleaning", 
  "Transportation", 
  "Delivery", 
  "Assembly", 
  "Academic Help", 
  "Digital Services", 
  "Fitness & Wellness", 
  "Event & Hospitality", 
  "Special Tasks", 
  "Pets", 
  "Home"
];

const customTaskPlaceholderImages = [
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
];

const TaskDetailView: React.FC<TaskDetailViewProps> = ({ 
  isOpen, 
  onClose, 
  onTaskBooked,
  task,
  isCustomTask = false,
  isFavorite = false,
  onFavoriteToggle
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>(times[0]);
  const [location, setLocation] = useState<string>(task?.location || "");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  
  const [customTitle, setCustomTitle] = useState<string>("");
  const [customDescription, setCustomDescription] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("Special Tasks");
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [bookedTaskTitle, setBookedTaskTitle] = useState("");
  
  const taskPrice = isCustomTask 
    ? companyDefinedPrices[customCategory] || companyDefinedPrices["default"] 
    : task ? companyDefinedPrices[task.category] || companyDefinedPrices["default"] : companyDefinedPrices["default"];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      return;
    }
    
    if (!time) {
      return;
    }
    
    const finalTitle = isCustomTask ? customTitle : (task ? task.title : "");
    const finalLocation = location || "Not specified";
    
    if (isCustomTask && !customTitle.trim()) {
      return;
    }
    
    setBookedTaskTitle(finalTitle);
    setShowConfetti(true);
    
    onTaskBooked(
      finalTitle,
      date,
      time,
      "hourly",
      taskPrice,
      finalLocation,
      additionalInfo
    );
  };
  
  const handleConfettiClose = () => {
    setShowConfetti(false);
    onClose();
  };

  const getTaskImage = (taskTitle: string) => {
    if (isCustomTask) {
      const randomIndex = Math.floor(Math.random() * customTaskPlaceholderImages.length);
      return customTaskPlaceholderImages[randomIndex];
    }
    
    const taskImageMap: {[key: string]: string} = {
      "TV Mounting": "/lovable-uploads/36f389d4-c8c6-40a8-9cc4-2ed5306d7dd5.png",
      "Install TV Mount": "/lovable-uploads/36f389d4-c8c6-40a8-9cc4-2ed5306d7dd5.png",
    };
    
    return taskImageMap[taskTitle] || (task && task.image) || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1000&auto=format&fit=crop";
  };

  const getCategoryColor = (category: string) => {
    const categoryColorMap: {[key: string]: string} = {
      "Cleaning": "bg-sky-100 text-sky-800",
      "Transportation": "bg-indigo-100 text-indigo-800",
      "Transportation and Moving": "bg-indigo-100 text-indigo-800",
      "Delivery": "bg-teal-100 text-teal-800",
      "Assembly": "bg-purple-100 text-purple-800",
      "Academic & Professional Help": "bg-yellow-100 text-yellow-800",
      "Digital Services": "bg-red-100 text-red-800",
      "Fitness and Wellness": "bg-emerald-100 text-emerald-800",
      "Event and Hospitality": "bg-pink-100 text-pink-800",
      "Special Tasks": "bg-orange-100 text-orange-800",
      "For Brands": "bg-blue-100 text-blue-800",
      "Pets": "bg-amber-100 text-amber-800",
      "Home": "bg-lime-100 text-lime-800",
    };
    
    return categoryColorMap[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {isCustomTask ? "Request Custom Task" : task?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            {!isCustomTask ? (
              <div 
                className="h-44 mb-6 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${getTaskImage(task?.title || "")})` }}
              />
            ) : (
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="custom-title">Task Title</Label>
                  <Input 
                    id="custom-title"
                    placeholder="Enter task title"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-category">Task Category</Label>
                  <Select value={customCategory} onValueChange={setCustomCategory}>
                    <SelectTrigger id="custom-category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {availableCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-description">Task Description</Label>
                  <Textarea 
                    id="custom-description"
                    placeholder="Describe what you need help with..."
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    rows={3}
                    required
                  />
                </div>
              </div>
            )}
            
            {!isCustomTask && task && (
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">About this task</h3>
                  <Badge className={cn(getCategoryColor(task.category))}>{task.category}</Badge>
                </div>
                <p className="text-gray-600">{task.description}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" /> Select Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="date"
                          type="button"
                        >
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white z-[100]" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Select Time
                    </Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent className="bg-white max-h-[200px]">
                        <ScrollArea className="h-[180px]">
                          {times.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    Price Information
                  </Label>
                  <div className="p-4 rounded-md bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-medium">Company Rate:</span>
                      <span className="text-lg font-semibold text-assist-blue">${taskPrice}/hr</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      This is our standard rate for {isCustomTask ? customCategory.toLowerCase() : (task ? task.category.toLowerCase() : "special")} tasks.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="flex items-center gap-2">
                    <Info className="h-4 w-4" /> Additional Notes
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any special requests or details about the task..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-assist-blue hover:bg-assist-blue/90">
                  {isCustomTask ? "Submit Request" : "Book Now"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      
      <ConfettiPopup 
        isOpen={showConfetti} 
        onClose={handleConfettiClose}
        taskTitle={bookedTaskTitle}
      />
    </>
  );
};

export default TaskDetailView;
