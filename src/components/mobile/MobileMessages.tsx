import React, { useState } from "react";
import MobileLayout from "./MobileLayout";
import BottomNavigation from "./BottomNavigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, PenSquare, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    initials: string;
    verified?: boolean;
    isOnline?: boolean;
    isAd?: boolean;
  };
  content: string;
  time: string;
  unread?: boolean;
}

const MobileMessages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const messages: Message[] = [
    {
      id: "msg1",
      sender: {
        name: "Ashley Wilson",
        initials: "AW",
        verified: true,
        isOnline: true
      },
      content: "Your task has been confirmed for tomorrow at 2PM.",
      time: "Today",
      unread: true
    },
    {
      id: "msg2",
      sender: {
        name: "Michael N.",
        avatar: "/placeholder.svg",
        initials: "MN",
        isAd: true
      },
      content: "Looking for help with Video Editing?",
      time: "Yesterday",
    },
    {
      id: "msg3",
      sender: {
        name: "Task Support",
        initials: "TS",
        verified: true
      },
      content: "Your payment for Home Cleaning has been processed.",
      time: "Oct 21",
    },
    {
      id: "msg4",
      sender: {
        name: "David Park",
        initials: "DP",
        isOnline: false
      },
      content: "I'll be there in 15 minutes.",
      time: "Oct 18",
    },
    {
      id: "msg5",
      sender: {
        name: "Support Team",
        initials: "ST",
        verified: true
      },
      content: "Hello, how can we help you today?",
      time: "Sep 30",
    }
  ];

  const filteredMessages = messages.filter(msg => 
    msg.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <MobileLayout 
        title="Messages" 
        showHeader={true}
        showLogo={false}
        headerClassName="bg-gradient-to-r from-blue-400 via-assist-blue/90 to-blue-500 text-center text-white"
        contentClassName="pb-20 px-0"
      >
        <div className="px-5 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search messages"
              className="pl-10 bg-white border-assist-blue/30 focus:border-assist-blue shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="divide-y divide-blue-100">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div 
                key={message.id}
                className="flex items-start gap-3 p-4 bg-white shadow-sm hover:bg-blue-50/50 cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                    <AvatarFallback className={message.sender.verified ? "bg-assist-blue text-white" : "bg-gray-200"}>
                      {message.sender.initials}
                    </AvatarFallback>
                  </Avatar>
                  {message.sender.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                  )}
                  {message.sender.verified && (
                    <span className="absolute -top-1 -right-1">
                      <CheckCircle className="h-4 w-4 text-assist-blue fill-white" />
                    </span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <h3 className={`font-semibold ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.sender.name}
                      </h3>
                      {message.sender.isAd && (
                        <Badge variant="outline" className="ml-2 text-xs bg-gray-100">
                          AD
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className={`text-sm truncate ${message.unread ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                    {message.content}
                  </p>
                </div>
                
                {message.unread && (
                  <div className="h-2.5 w-2.5 rounded-full bg-assist-blue flex-shrink-0 mt-2"></div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center px-5 bg-white mx-4 rounded-lg shadow-sm">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <Search className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Messages Found</h3>
              <p className="text-gray-500 mb-6 max-w-xs">
                We couldn't find any messages matching your search.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")}
                className="border-assist-blue text-assist-blue"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </MobileLayout>
      
      <BottomNavigation />
    </>
  );
};

export default MobileMessages;
