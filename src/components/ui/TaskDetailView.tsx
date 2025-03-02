
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
import { Calendar as CalendarIcon, Clock, MapPin, DollarSign, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  task: Task;
}

const times = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM"
];

const TaskDetailView: React.FC<TaskDetailViewProps> = ({ 
  isOpen, 
  onClose, 
  onTaskBooked,
  task 
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>(times[0]);
  const [priceType, setPriceType] = useState<string>("one-time");
  const [price, setPrice] = useState<string>("25");
  const [location, setLocation] = useState<string>(task.location || "");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      return;
    }
    
    onTaskBooked(
      task.title,
      date,
      time,
      priceType,
      parseFloat(price),
      location,
      additionalInfo
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div 
            className="h-44 mb-6 rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${task.image || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1000&auto=format&fit=crop"})` }}
          />
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About this task</h3>
            <p className="text-gray-600">{task.description}</p>
            <div className="mt-2 inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              {task.category}
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Date and Time Selection */}
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
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
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
                    <SelectContent>
                      {times.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Price Section */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> Price Information
                </Label>
                <RadioGroup value={priceType} onValueChange={setPriceType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time">One-time payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hourly" id="hourly" />
                    <Label htmlFor="hourly">Hourly rate</Label>
                  </div>
                </RadioGroup>
                
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">$</span>
                  <Input
                    type="number"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-gray-500 ml-2">
                    {priceType === "hourly" ? "per hour" : "total"}
                  </span>
                </div>
              </div>
              
              {/* Location */}
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
              
              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="flex items-center gap-2">
                  <Info className="h-4 w-4" /> Additional Information
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
                Book Now
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailView;
