
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface Task {
  title: string;
  date: string;
  status: string;
  earnings: string;
  category: string;
  location: string;
}

interface StudentCalendarProps {
  tasks?: Task[];
  minimal?: boolean;
}

const StudentCalendar: React.FC<StudentCalendarProps> = ({ tasks = [], minimal = false }) => {
  const today = new Date();
  const [date, setDate] = React.useState<Date | undefined>(today);

  // Function to check if a date has tasks
  const hasTasksOnDay = (day: Date) => {
    if (!tasks || tasks.length === 0) return false;
    
    return tasks.some(task => {
      const taskDate = task.date.includes(',') 
        ? new Date(task.date.split(',')[0]) 
        : new Date(task.date);
      
      return day.toDateString() === taskDate.toDateString();
    });
  };

  // Function to render day content with task indicator
  const renderDay = (day: Date) => {
    const hasTask = hasTasksOnDay(day);
    if (hasTask) {
      return (
        <div className="relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
            <div className="h-1.5 w-1.5 bg-assist-blue rounded-full"></div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-medium">Calendar</CardTitle>
        <div>
          {!minimal && (
            <Badge className="bg-assist-blue text-white">
              {tasks.length} Upcoming Tasks
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pl-2 flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) =>
            date > addDays(today, 30) || date < today
          }
          className="rounded-md border shadow-sm"
          components={{
            DayContent: (props) => (
              <>
                <div>{props.date.getDate()}</div>
                {renderDay(props.date)}
              </>
            ),
          }}
        />
      </CardContent>
      {!minimal && date && (
        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium mb-2">Tasks on {date.toLocaleDateString()}</h3>
          <div className="space-y-2">
            {tasks
              .filter(task => {
                const taskDate = task.date.includes(',') 
                  ? new Date(task.date.split(',')[0]) 
                  : new Date(task.date);
                return date.toDateString() === taskDate.toDateString();
              })
              .map((task, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded text-sm flex justify-between">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.location}</p>
                  </div>
                  <Badge 
                    className={
                      task.status === "Confirmed" ? "bg-green-100 text-green-800" :
                      task.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-blue-100 text-blue-800"
                    }
                  >
                    {task.status}
                  </Badge>
                </div>
              ))
            }
            {tasks.filter(task => {
              const taskDate = task.date.includes(',') 
                ? new Date(task.date.split(',')[0]) 
                : new Date(task.date);
              return date.toDateString() === taskDate.toDateString();
            }).length === 0 && (
              <p className="text-sm text-gray-500 italic">No tasks scheduled for this day</p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default StudentCalendar;
