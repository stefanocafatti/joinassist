import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";

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

  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-medium">Calendar</CardTitle>
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
        />
      </CardContent>
    </Card>
  );
};

export default StudentCalendar;
