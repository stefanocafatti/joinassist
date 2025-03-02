
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Calendar, Clock, DollarSign, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface TaskDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    title: string;
    description: string;
    category: string;
    image?: string;
  };
}

const TaskDetailView = ({ isOpen, onClose, task }: TaskDetailViewProps) => {
  const [offerAmount, setOfferAmount] = useState("");
  const [location, setLocation] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!offerAmount || !location || !preferredDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Here you would typically send the request to your backend
    console.log({
      task: task.title,
      offerAmount,
      location,
      preferredDate,
      additionalInfo
    });
    
    toast.success("Your request has been submitted!", {
      description: "We'll notify you when the provider responds to your request."
    });
    
    // Reset form and close dialog
    setOfferAmount("");
    setLocation("");
    setPreferredDate("");
    setAdditionalInfo("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{task.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 mt-1">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              {task.category}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {task.image && (
            <div className="w-full h-56 bg-cover bg-center rounded-lg" 
                style={{ backgroundImage: `url(${task.image})` }} 
            />
          )}
          
          <div>
            <h3 className="font-medium text-lg mb-2">Task Description</h3>
            <p className="text-gray-700">{task.description}</p>
          </div>
          
          <form onSubmit={handleSubmitRequest}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="offerAmount" className="text-base font-medium">
                  Your Offer Amount *
                </Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="offerAmount"
                    placeholder="Enter your offer (e.g. 25.00)"
                    className="pl-10"
                    type="number"
                    min="0"
                    step="0.01"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location" className="text-base font-medium">
                  Location *
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="location"
                    placeholder="Enter the location for this task"
                    className="pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="preferredDate" className="text-base font-medium">
                  Preferred Date *
                </Label>
                <div className="relative mt-1">
                  <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="preferredDate"
                    type="date"
                    className="pl-10"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="additionalInfo" className="text-base font-medium">
                  Additional Information
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any special requirements or details for this task?"
                  className="mt-1 resize-none"
                  rows={4}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="button" 
            className="bg-assist-blue hover:bg-assist-blue/90"
            onClick={handleSubmitRequest}
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailView;
