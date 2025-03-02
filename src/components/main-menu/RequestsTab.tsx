
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Bell, BellOff, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import TaskStatusView from "@/components/ui/TaskStatusView";

interface Request {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  status: string;
  provider: string;
  additionalInfo?: string;
  studentImage?: string;
  rating?: number;
  completed?: boolean;
}

interface RequestsTabProps {
  requests: Request[];
  onNavigateToHome: () => void;
  onToggleNotifications: (enabled: boolean) => void;
  notificationsEnabled: boolean;
}

const RequestsTab: React.FC<RequestsTabProps> = ({ 
  requests, 
  onNavigateToHome,
  onToggleNotifications,
  notificationsEnabled
}) => {
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<Request | null>(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [taskToRate, setTaskToRate] = useState<Request | null>(null);
  const [ratingValue, setRatingValue] = useState(0);

  const handleToggleNotifications = () => {
    const newState = !notificationsEnabled;
    onToggleNotifications(newState);
    
    toast({
      title: newState ? "Notifications enabled" : "Notifications disabled",
      description: newState 
        ? "You'll receive updates about your tasks." 
        : "You won't receive notification updates.",
      duration: 3000,
    });
  };

  const handleViewTaskDetails = (task: Request) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  // Updated completed tasks with one task that doesn't have a rating
  const completedTasks: Request[] = [
    {
      id: "c1",
      title: "Dog Walking",
      date: "April 15, 2023",
      location: "Westwood",
      price: "$25",
      status: "Completed",
      provider: "Jessica T.",
      studentImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
      rating: 5,
      completed: true
    },
    {
      id: "c2",
      title: "Grocery Delivery",
      date: "March 22, 2023",
      location: "UCLA Campus",
      price: "$30",
      status: "Completed",
      provider: "Michael R.",
      studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      completed: true
    },
    {
      id: "c3",
      title: "Math Tutoring",
      date: "February 10, 2023",
      location: "Library",
      price: "$45",
      status: "Completed",
      provider: "Sam K.",
      studentImage: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1000&auto=format&fit=crop",
      rating: 5,
      completed: true
    }
  ];

  // Determine which tasks to display based on toggle state
  const displayedTasks = showCompleted ? completedTasks : requests;

  // Handle setting a rating for a task
  const handleRate = (task: Request) => {
    setTaskToRate(task);
    setRatingValue(0);
  };

  // Handle submitting a rating
  const handleSubmitRating = (task: Request, rating: number) => {
    // Update the task's rating in the completedTasks array
    const updatedTasks = completedTasks.map(t => 
      t.id === task.id ? { ...t, rating } : t
    );
    
    // Replace the completedTasks array with the updated one
    // Note: In a real app, this would be a state update or an API call
    
    // Show a success toast
    toast({
      title: "Rating Submitted",
      description: `You rated "${task.title}" ${rating} stars. Thank you for your feedback!`,
      duration: 3000,
    });
    
    // Close the rating dialog
    setTaskToRate(null);
  };

  // Helper function to render star ratings
  const renderStarRating = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  // Function to render interactive star rating input
  const renderRatingInput = () => {
    return (
      <div className="flex items-center space-x-1">
        {Array(5).fill(0).map((_, i) => (
          <Star 
            key={i} 
            className={`h-6 w-6 cursor-pointer ${i < ratingValue ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            onClick={() => setRatingValue(i + 1)}
            onMouseEnter={() => setRatingValue(i + 1)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <ClipboardList className="h-5 w-5 mr-2 text-assist-blue" /> Open Task Requests
          </h2>
        </div>
        
        <div className="mb-6 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            {notificationsEnabled ? (
              <Bell className="h-5 w-5 text-assist-blue" />
            ) : (
              <BellOff className="h-5 w-5 text-gray-400" />
            )}
            <span className="text-sm font-medium">
              {notificationsEnabled ? "Task notifications are enabled" : "Enable task notifications"}
            </span>
          </div>
          <Switch 
            checked={notificationsEnabled} 
            onCheckedChange={handleToggleNotifications} 
            className="data-[state=checked]:bg-assist-blue"
          />
        </div>

        <div className="mb-6 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {showCompleted ? "Showing completed tasks" : "Showing open tasks"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Open</span>
            <Switch 
              checked={showCompleted} 
              onCheckedChange={setShowCompleted} 
              className="data-[state=checked]:bg-assist-blue"
            />
            <span className="text-sm text-gray-500">Completed</span>
          </div>
        </div>
        
        {displayedTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Task</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Location</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Price</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                  {showCompleted && (
                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Provider</th>
                  )}
                  {showCompleted && (
                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Rating</th>
                  )}
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedTasks.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <span className="font-medium text-gray-900">{request.title}</span>
                    </td>
                    <td className="px-4 py-4 text-gray-700">{request.date}</td>
                    <td className="px-4 py-4 text-gray-700">{request.location}</td>
                    <td className="px-4 py-4 text-gray-700">{request.price}</td>
                    <td className="px-4 py-4">
                      <Badge
                        className={`
                          ${request.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                          ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                          ${request.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                          ${request.status === 'Completed' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                        `}
                      >
                        {request.status}
                      </Badge>
                    </td>
                    {showCompleted && (
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            {request.studentImage ? (
                              <AvatarImage src={request.studentImage} alt={request.provider} />
                            ) : (
                              <AvatarFallback>{request.provider.substring(0, 2)}</AvatarFallback>
                            )}
                          </Avatar>
                          <span>{request.provider}</span>
                        </div>
                      </td>
                    )}
                    {showCompleted && (
                      <td className="px-4 py-4">
                        {request.rating ? (
                          <div className="flex">
                            {renderStarRating(request.rating)}
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-assist-blue border-assist-blue hover:bg-assist-blue/10"
                            onClick={() => handleRate(request)}
                          >
                            Rate Now
                          </Button>
                        )}
                      </td>
                    )}
                    <td className="px-4 py-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-assist-blue"
                        onClick={() => handleViewTaskDetails(request)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests submitted</h3>
              <p className="text-gray-600 mb-6">
                You haven't submitted any task requests yet. Browse our available tasks or search for specific services.
              </p>
              <Button 
                className="bg-assist-blue hover:bg-assist-blue/90"
                onClick={onNavigateToHome}
              >
                Browse Tasks
              </Button>
            </div>
          </div>
        )}
      </section>
      
      {selectedTask && (
        <TaskStatusView 
          isOpen={isTaskDetailsOpen}
          onClose={() => setIsTaskDetailsOpen(false)}
          task={selectedTask}
        />
      )}

      {/* Rating Modal */}
      {taskToRate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Rate your experience</h3>
            <p className="mb-6 text-gray-600">
              How would you rate your experience with {taskToRate.provider} for "{taskToRate.title}"?
            </p>
            
            <div className="flex justify-center mb-6">
              {renderRatingInput()}
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setTaskToRate(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-assist-blue hover:bg-assist-blue/90"
                disabled={ratingValue === 0}
                onClick={() => handleSubmitRating(taskToRate, ratingValue)}
              >
                Submit Rating
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsTab;
