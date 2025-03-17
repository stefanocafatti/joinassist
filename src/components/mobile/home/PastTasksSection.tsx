
import React from "react";
import { useNavigate } from "react-router-dom";
import { History, Repeat, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PastTask {
  title: string;
  date: string;
  provider: string;
  image: string;
}

interface PastTasksSectionProps {
  pastTasks: PastTask[];
}

const PastTasksSection = ({ pastTasks }: PastTasksSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="mb-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-1">
          <History size={18} className="text-assist-blue" />
          Past Tasks
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-assist-blue text-sm p-0 hover:bg-transparent" 
          onClick={() => navigate('/mobile/past-tasks')}
        >
          View All
          <ChevronRight size={16} />
        </Button>
      </div>
      
      {pastTasks.length > 0 ? (
        <div className="space-y-3">
          {pastTasks.map((task, index) => (
            <Card key={index} className="overflow-hidden border-gray-100 shadow-sm hover:shadow transition-all">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <div className="h-16 w-16 bg-cover bg-center" style={{ backgroundImage: `url(${task.image})` }} />
                  <div className="flex-1 p-3">
                    <h3 className="font-medium text-sm text-gray-900">{task.title}</h3>
                    <p className="text-xs text-gray-500">{task.date} • {task.provider}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mr-2 p-1.5 h-auto bg-soft-blue/20 rounded-full"
                    onClick={() => navigate(`/mobile/new-task?template=${task.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <Repeat size={16} className="text-assist-blue" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-50 rounded-lg p-6 border border-gray-100">
          <p className="text-gray-600 text-sm">You haven't completed any tasks yet</p>
        </div>
      )}
    </section>
  );
};

export default PastTasksSection;
