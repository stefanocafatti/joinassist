import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Filter, Bell, BellOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
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

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <ClipboardList className="h-5 w-5 mr-2 text-assist-blue" /> Open Task Requests
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" size="sm">
              Sort by Date
            </Button>
          </div>
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
        
        {requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Task</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Location</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Price</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((request) => (
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
                        `}
                      >
                        {request.status}
                      </Badge>
                    </td>
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
    </div>
  );
};

export default RequestsTab;
