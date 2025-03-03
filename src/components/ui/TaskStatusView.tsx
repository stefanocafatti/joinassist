
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
import { MapPin, Calendar, Clock, DollarSign, Info, User, CheckCircle, AlertCircle } from "lucide-react";

interface TaskStatusViewProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    title: string;
    date: string;
    location: string;
    price: string;
    status: string;
    provider?: string;
    additionalInfo?: string;
  } | null;
}

const TaskStatusView: React.FC<TaskStatusViewProps> = ({ 
  isOpen, 
  onClose, 
  task 
}) => {
  if (!task) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'Rejected':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Task Details</h3>
            <Badge className={getStatusColor(task.status)}>
              <div className="flex items-center gap-1">
                {getStatusIcon(task.status)}
                <span>{task.status}</span>
              </div>
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{task.date}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <MapPin className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{task.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">{task.price.replace('$', '')}</p>
              </div>
            </div>
            
            {task.provider && (
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Provider</p>
                  <p className="font-medium">{task.provider}</p>
                </div>
              </div>
            )}
            
            {task.additionalInfo && (
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Info className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Additional Information</p>
                  <p className="font-medium">{task.additionalInfo}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button type="button" onClick={onClose} className="bg-assist-blue hover:bg-assist-blue/90">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskStatusView;
