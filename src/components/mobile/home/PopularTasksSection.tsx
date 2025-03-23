
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TaskDetailView from "@/components/ui/TaskDetailView";

// Updated image path
const TASK_IMAGE = "/lovable-uploads/239bf11e-868d-49c4-b2cf-e3fdd3bc7c20.png";

interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  price: string;
}

interface PopularTasksSectionProps {
  popularTasks: Task[];
}

const PopularTasksSection = ({ popularTasks }: PopularTasksSectionProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(popularTasks);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const tasksPerPage = 4;

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTasks(popularTasks);
    } else {
      const filtered = popularTasks.filter(
        task => 
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
    setCurrentPage(0);
  }, [searchTerm, popularTasks]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredTasks.length / tasksPerPage));
  }, [filteredTasks]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  const handleCloseTaskDetail = () => {
    setShowTaskDetail(false);
  };

  const handleBookTask = (
    taskTitle: string, 
    date: Date, 
    time: string, 
    priceType?: string, 
    price?: number,
    location?: string,
    additionalInfo?: string
  ) => {
    console.log("Task booked:", {
      taskTitle,
      date,
      time,
      priceType,
      price,
      location,
      additionalInfo
    });
    // Close the detail view after booking
    setShowTaskDetail(false);
  };

  const paginatedTasks = filteredTasks.slice(
    currentPage * tasksPerPage,
    (currentPage + 1) * tasksPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section className="mb-1">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Popular Tasks</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-assist-blue text-sm p-0 hover:bg-transparent" 
          onClick={() => navigate('/mobile/tasks')}
        >
          View All
          <ChevronRight size={16} />
        </Button>
      </div>
      
      {/* Search bar */}
      <div className="mb-3 relative">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 py-2 h-10 bg-gray-50 border-gray-200"
        />
      </div>
      
      {filteredTasks.length > 0 ? (
        <>
          <div className="space-y-2.5">
            {paginatedTasks.map((task, index) => (
              <Card 
                key={index} 
                className="overflow-hidden border-gray-100 shadow-sm hover:shadow transition-all cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div 
                      className="h-20 w-20 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${TASK_IMAGE})` }}
                    />
                    <div className="p-3 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm text-gray-900 mb-0.5">{task.title}</h3>
                        <Badge className="bg-soft-blue/20 text-assist-blue border-0 h-5 text-[10px]">
                          {task.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mb-1.5 line-clamp-2">{task.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-[10px] text-gray-500">4.8 (120+)</span>
                        </div>
                        <p className="text-xs font-medium text-assist-blue">{task.price}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination - only show if there are multiple pages */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  &lt;
                </Button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button
                    key={index}
                    variant={currentPage === index ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                >
                  &gt;
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center bg-gray-50 rounded-lg p-6 border border-gray-100">
          <p className="text-gray-600 text-sm">No tasks found matching your search</p>
        </div>
      )}
      
      {selectedTask && (
        <TaskDetailView 
          isOpen={showTaskDetail}
          onClose={handleCloseTaskDetail}
          onTaskBooked={handleBookTask}
          task={selectedTask}
        />
      )}
    </section>
  );
};

export default PopularTasksSection;
