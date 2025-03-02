
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Coins } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface TaskDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskBooked?: (taskTitle: string, date: Date, time: string) => void;
  task: {
    title: string;
    description: string;
    category: string;
    location: string;
    image: string;
  };
}

const TaskDetailView = ({ isOpen, onClose, onTaskBooked, task }: TaskDetailViewProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState(task.location);
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [priceType, setPriceType] = useState("hourly");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      toast.error("Please select both date and time for your task.");
      return;
    }
    
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast.error("Please enter a valid price offer.");
      return;
    }
    
    // Notify both the user directly and through the callback
    toast.success("Task booked successfully!", {
      description: `Your ${task.title} has been scheduled for ${format(date, "MMMM d, yyyy")} at ${time}`
    });
    
    setFormSubmitted(true);
    
    // Call the callback if provided
    if (onTaskBooked) {
      onTaskBooked(task.title, date, time);
    }
    
    // In a real app, we would handle the API call here
    console.log({
      task: task.title,
      date: date ? format(date, "yyyy-MM-dd") : null,
      time,
      location,
      notes,
      price,
      priceType
    });
  };
  
  const timeOptions = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-xl">
        <div className="relative">
          <div
            className="h-56 bg-cover bg-center"
            style={{ backgroundImage: `url(${task.image})` }}
          />
          <DialogHeader className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <DialogTitle className="text-2xl font-bold text-white">
              {task.title}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-600">{task.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5 text-assist-blue" />
              <span>{task.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                {task.category}
              </div>
            </div>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Preferred Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-gray-400"
                          )}
                        >
                          {date ? format(date, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Preferred Time
                    </label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                      Your Price Offer ($)
                    </label>
                    <Input
                      type="number"
                      value={price}
                      min="1"
                      step="0.01"
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter your price offer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                      Payment Type
                    </label>
                    <Select value={priceType} onValueChange={setPriceType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                        <SelectItem value="fixed">One-time Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Location
                  </label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location details"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Additional Notes
                  </label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific requirements?"
                  />
                </div>
              </div>

              <DialogFooter className="mt-6 gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-assist-blue hover:bg-assist-blue/90">
                  Book Now
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Task Booked Successfully!
              </h3>
              <p className="text-green-700 mb-2">
                Your request has been submitted. We'll notify you once a student accepts.
              </p>
              <div className="flex items-center justify-center gap-2 bg-green-100 p-3 rounded-lg mb-6">
                <Coins className="h-5 w-5 text-green-700" />
                <p className="font-medium text-green-800">You earned 50 Assist Points!</p>
              </div>
              <Button
                onClick={onClose}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailView;
