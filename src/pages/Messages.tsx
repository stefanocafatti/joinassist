
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MessagesTab from "@/components/main-menu/MessagesTab";

const Messages = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/main-menu")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Main Menu
        </Button>
        <h1 className="text-2xl font-bold mb-6">Your Messages</h1>
        
        <MessagesTab />
      </div>
    </div>
  );
};

export default Messages;
