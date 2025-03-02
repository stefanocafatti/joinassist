
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Eye, Star, HelpCircle, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from 'sonner';

interface PastTask {
  id: string;
  title: string;
  date: string;
  status: string;
  studentName?: string;
  studentImage?: string;
  rating?: number;
  payment?: string;
  tip?: string;
}

interface PastTasksSectionProps {
  pastTasks: PastTask[];
  favoriteTaskIds: string[];
  onFavoriteToggle: (taskTitle: string) => void;
  onViewTask: (taskTitle: string) => void;
  onViewAll?: () => void;
}

const PastTasksSection: React.FC<PastTasksSectionProps> = ({ 
  pastTasks, 
  favoriteTaskIds, 
  onFavoriteToggle, 
  onViewTask,
  onViewAll 
}) => {
  const [selectedTask, setSelectedTask] = useState<PastTask | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleOpenDetails = (task: PastTask) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleContactSupport = () => {
    toast.success("Support request sent. Our team will contact you shortly.");
  };

  const renderStarRating = (rating: number = 0) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Past Ordered Tasks</h2>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Need Help with Your Tasks?</h4>
                <p className="text-sm text-gray-500">
                  If you have any questions about your past tasks or need assistance, our support team is here to help.
                </p>
                <div className="pt-2">
                  <Button 
                    className="w-full bg-assist-blue hover:bg-assist-blue/90"
                    onClick={handleContactSupport}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button 
            variant="link" 
            className="text-assist-blue"
            onClick={onViewAll}
          >
            View all →
          </Button>
        </div>
      </div>
      
      {pastTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastTasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => onViewTask(task.title)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavoriteToggle(task.title);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 ${favoriteTaskIds.includes(task.title) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
                    />
                  </button>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {task.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="h-4 w-4 mr-1" /> {task.date}
              </div>
              
              {task.studentName && (
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.studentImage} alt={task.studentName} />
                    <AvatarFallback>{task.studentName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-700">Completed by {task.studentName}</span>
                </div>
              )}
              
              <div className="flex justify-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDetails(task);
                  }}
                >
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  className="bg-assist-blue hover:bg-assist-blue/90 w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewTask(task.title);
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" /> View Task
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No past tasks yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't ordered any tasks yet. Browse our recommendations to find tasks that match your needs.
            </p>
            <Button className="bg-assist-blue hover:bg-assist-blue/90">
              Browse Tasks
            </Button>
          </div>
        </div>
      )}

      {/* Task Details Dialog */}
      {selectedTask && (
        <Dialog open={isDetailsOpen} onOpenChange={handleCloseDetails}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedTask.title} Details</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedTask.studentImage} alt={selectedTask.studentName} />
                  <AvatarFallback className="text-lg">{selectedTask?.studentName?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedTask.studentName || "Not assigned"}</h3>
                  {selectedTask.rating && (
                    <div className="flex items-center mt-1">
                      {renderStarRating(selectedTask.rating)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Date Completed</span>
                  <span className="font-medium">{selectedTask.date}</span>
                </div>
                
                {selectedTask.payment && (
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Payment</span>
                    <span className="font-medium">{selectedTask.payment}</span>
                  </div>
                )}
                
                {selectedTask.tip && (
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Tip</span>
                    <span className="font-medium">{selectedTask.tip}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Status</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {selectedTask.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDetails}>Close</Button>
              <Button className="bg-assist-blue hover:bg-assist-blue/90">
                Book Again
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default PastTasksSection;
