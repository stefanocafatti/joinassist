
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Download, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  time: string;
  location: string;
  status: "confirmed" | "pending" | "completed";
}

interface CalendarDay {
  date: Date;
  tasks: Task[];
}

const StudentCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarConnected, setCalendarConnected] = useState(false);
  
  // In a real app, this would be fetched from an API
  const calendarDays: CalendarDay[] = [
    {
      date: new Date(),
      tasks: [
        { id: 1, title: "Math Tutoring", time: "3:00 PM - 4:30 PM", location: "Library Study Room B", status: "confirmed" },
        { id: 2, title: "Dog Walking", time: "5:30 PM - 6:30 PM", location: "Westwood Park", status: "pending" }
      ]
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      tasks: [
        { id: 3, title: "Essay Review", time: "1:00 PM - 2:00 PM", location: "Coffee Bean", status: "confirmed" }
      ]
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      tasks: [
        { id: 4, title: "Grocery Delivery", time: "11:00 AM - 12:00 PM", location: "Campus Housing", status: "completed" }
      ]
    }
  ];
  
  const getTasksForDate = (date?: Date) => {
    if (!date) return [];
    
    const day = calendarDays.find(
      day => day.date.toDateString() === date.toDateString()
    );
    
    return day ? day.tasks : [];
  };
  
  const selectedDayTasks = getTasksForDate(selectedDate);
  
  const handleSyncCalendar = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: "Connecting to your calendar...",
        success: () => {
          setCalendarConnected(true);
          return "Calendar connected successfully!";
        },
        error: "Failed to connect calendar. Please try again.",
      }
    );
  };
  
  const handleExportCalendar = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1000)),
      {
        loading: "Exporting calendar events...",
        success: "Calendar events exported successfully!",
        error: "Failed to export calendar events. Please try again.",
      }
    );
  };
  
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-assist-blue" />
            Calendar Sync
          </CardTitle>
          <CardDescription>
            Manage your tasks and sync with your preferred calendar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  
                  <div className="mt-6 space-y-2">
                    {!calendarConnected ? (
                      <Button 
                        className="w-full" 
                        onClick={handleSyncCalendar}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Connect Calendar
                      </Button>
                    ) : (
                      <>
                        <div className="flex items-center rounded-md bg-green-50 p-2 text-green-700">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span className="text-sm">Calendar Connected</span>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={handleExportCalendar}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Export Calendar
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : "Select a date"}
                  </CardTitle>
                  <CardDescription>
                    {selectedDayTasks.length > 0 
                      ? `${selectedDayTasks.length} tasks scheduled` 
                      : "No tasks scheduled for this day"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDayTasks.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDayTasks.map((task) => (
                        <div 
                          key={task.id} 
                          className="rounded-lg border border-gray-100 p-4 shadow-sm"
                        >
                          <div className="flex justify-between">
                            <h3 className="font-medium">{task.title}</h3>
                            <Badge
                              className={`
                                ${task.status === 'confirmed' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                                ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                                ${task.status === 'completed' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                              `}
                            >
                              {task.status}
                            </Badge>
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Time:</span> {task.time}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Location:</span> {task.location}
                            </p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" variant="outline">View Details</Button>
                            {task.status === 'pending' && (
                              <Button size="sm">Confirm</Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg bg-gray-50 p-6 text-center">
                      <AlertCircle className="mx-auto h-8 w-8 text-gray-400" />
                      <h3 className="mt-2 font-medium">No tasks for this date</h3>
                      <p className="mt-1 text-sm text-gray-500">Select another date or browse available tasks</p>
                      <Button className="mt-4" onClick={() => navigate("/main-menu")}>
                        Browse Tasks
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentCalendar;
