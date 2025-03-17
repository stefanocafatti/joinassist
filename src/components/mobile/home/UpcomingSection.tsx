
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const UpcomingSection = () => {
  const navigate = useNavigate();

  return (
    <section className="mb-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-assist-blue text-sm p-0 hover:bg-transparent" 
          onClick={() => navigate('/mobile/calendar')}
        >
          Calendar
          <ChevronRight size={16} />
        </Button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between bg-gradient-to-r from-white to-soft-blue/30 rounded-lg p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center">
            <div className="bg-white text-assist-blue p-2 rounded-lg mr-3 shadow-sm">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-900">Weekly Cleaning</h3>
              <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="smallIcon"
            className="text-gray-500 bg-white rounded-full shadow-sm"
            onClick={() => navigate('/mobile/calendar/1')}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
        
        <div className="flex items-center justify-between bg-gradient-to-r from-white to-soft-green/30 rounded-lg p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center">
            <div className="bg-white text-green-600 p-2 rounded-lg mr-3 shadow-sm">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-900">Grocery Delivery</h3>
              <p className="text-xs text-gray-500">Friday, 2:30 PM</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="smallIcon"
            className="text-gray-500 bg-white rounded-full shadow-sm"
            onClick={() => navigate('/mobile/calendar/2')}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;
