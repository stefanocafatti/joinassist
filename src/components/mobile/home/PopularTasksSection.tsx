
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Make sure our Task interface matches the one in MobileHome.tsx
interface Task {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
}

interface PopularTasksSectionProps {
  popularTasks: Task[];
}

const PopularTasksSection = ({ popularTasks }: PopularTasksSectionProps) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const totalPages = Math.ceil(popularTasks.length / tasksPerPage);

  // Update scroll buttons visibility on component mount and when tasks change
  useEffect(() => {
    updateScrollButtonsVisibility();
    // Update scroll buttons visibility when the window is resized
    window.addEventListener('resize', updateScrollButtonsVisibility);
    return () => {
      window.removeEventListener('resize', updateScrollButtonsVisibility);
    };
  }, [popularTasks]);

  // Function to check if we can scroll in either direction
  const updateScrollButtonsVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  // Handle scroll events
  const handleScroll = () => {
    updateScrollButtonsVisibility();
  };

  // Scroll left function
  const scrollLeft = () => {
    if (scrollRef.current) {
      const newPage = Math.max(currentPage - 1, 1);
      setCurrentPage(newPage);
      
      const cardWidth = scrollRef.current.querySelector('div')?.clientWidth || 0;
      scrollRef.current.scrollBy({ 
        left: -cardWidth * tasksPerPage, 
        behavior: 'smooth' 
      });
    }
  };

  // Scroll right function
  const scrollRight = () => {
    if (scrollRef.current) {
      const newPage = Math.min(currentPage + 1, totalPages);
      setCurrentPage(newPage);
      
      const cardWidth = scrollRef.current.querySelector('div')?.clientWidth || 0;
      scrollRef.current.scrollBy({ 
        left: cardWidth * tasksPerPage, 
        behavior: 'smooth' 
      });
    }
  };

  // Navigate to task detail
  const handleTaskClick = (task: Task) => {
    // We can pass price as undefined or empty string since it's removed
    navigate(`/mobile/task/${task.title.toLowerCase().replace(/\s+/g, '-')}`, { 
      state: { task } 
    });
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Popular Tasks</h2>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <Button
              size="smallIcon"
              variant="outline"
              className="rounded-full border border-gray-300"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span className="sr-only">Previous</span>
            </Button>
            
            <span className="text-xs text-gray-500 min-w-8 text-center">
              {currentPage}/{totalPages}
            </span>
            
            <Button
              size="smallIcon"
              variant="outline"
              className="rounded-full border border-gray-300"
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        )}
      </div>
      
      <div 
        className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar snap-x"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {popularTasks.map((task, index) => (
          <div 
            key={index} 
            className="min-w-[250px] max-w-[280px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm snap-start"
            onClick={() => handleTaskClick(task)}
          >
            <div className="h-36 overflow-hidden">
              <img
                src={task.image}
                alt={task.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-900 line-clamp-1">{task.title}</h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-gray-500" />
                <span className="text-xs text-gray-500">{task.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularTasksSection;
