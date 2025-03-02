
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Eye } from "lucide-react";

interface PastTask {
  id: string;
  title: string;
  date: string;
  status: string;
}

interface PastTasksSectionProps {
  pastTasks: PastTask[];
  favoriteTaskIds: string[];
  onFavoriteToggle: (taskTitle: string) => void;
  onViewTask: (taskTitle: string) => void;
}

const PastTasksSection: React.FC<PastTasksSectionProps> = ({ 
  pastTasks, 
  favoriteTaskIds, 
  onFavoriteToggle, 
  onViewTask 
}) => {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Past Ordered Tasks</h2>
        <Button variant="link" className="text-assist-blue">
          View all →
        </Button>
      </div>
      
      {pastTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
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
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  className="bg-assist-blue hover:bg-assist-blue/90"
                  onClick={() => onViewTask(task.title)}
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
    </section>
  );
};

export default PastTasksSection;
