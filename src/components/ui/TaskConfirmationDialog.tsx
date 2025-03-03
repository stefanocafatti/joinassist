
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Info } from "lucide-react";

interface TaskConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: {
    title: string;
    description: string;
    category: string;
    location: string;
    rate: string;
    rateNumeric: number;
    skills: string[];
    image?: string;
  };
}

const TaskConfirmationDialog: React.FC<TaskConfirmationDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  task 
}) => {
  const getCategoryColor = (category: string) => {
    const categoryColorMap: {[key: string]: string} = {
      "Academic Help": "bg-yellow-100 text-yellow-800",
      "Digital Services": "bg-red-100 text-red-800",
      "Fitness & Wellness": "bg-emerald-100 text-emerald-800",
      "Campus Services": "bg-blue-100 text-blue-800"
    };
    
    return categoryColorMap[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Confirm Task</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>
            </div>
            <p className="text-gray-600 text-sm mb-2">{task.description}</p>
          </div>
          
          <div className="grid gap-4 bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <MapPin className="h-4 w-4 text-gray-400" /> Location
              </span>
              <span className="text-sm font-medium text-gray-900">{task.location}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <DollarSign className="h-4 w-4 text-gray-400" /> Rate
              </span>
              <span className="text-sm font-medium text-green-600">{task.rate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Info className="h-4 w-4 text-gray-400" /> Skills
              </span>
              <div className="flex flex-wrap gap-1 justify-end">
                {task.skills.map((skill, i) => (
                  <span key={i} className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to accept this task? Once accepted, you'll be responsible for completing it as described.
          </p>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-assist-blue hover:bg-assist-blue/90" onClick={onConfirm}>
            Accept Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskConfirmationDialog;
