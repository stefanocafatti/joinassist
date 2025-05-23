
import React, { useState } from "react";
import { MessageSquare, Search, Send, MoreHorizontal, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  time: string;
  isFromMe: boolean;
  isRead: boolean;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string | null;
  };
  lastMessage: {
    text: string;
    time: string;
    isRead: boolean;
  };
  taskTitle: string;
  messages: Message[];
  isActive: boolean;
}

const MessagesTab = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      user: {
        name: "Jessica T.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
      },
      lastMessage: {
        text: "I'm at the library waiting for the tutoring session. Will you be here soon?",
        time: "2 hours ago",
        isRead: false,
      },
      taskTitle: "Mathematics Tutoring",
      isActive: true,
      messages: [
        {
          id: "1-1",
          text: "Hi there! Looking forward to our math tutoring session today at 3pm.",
          time: "Yesterday, 2:30 PM",
          isFromMe: false,
          isRead: true,
        },
        {
          id: "1-2",
          text: "Yes, I'll be there. I'm preparing some example problems for us to work through.",
          time: "Yesterday, 2:45 PM",
          isFromMe: true,
          isRead: true,
        },
        {
          id: "1-3",
          text: "That sounds great! I'm struggling with derivatives especially.",
          time: "Yesterday, 2:50 PM",
          isFromMe: false,
          isRead: true,
        },
        {
          id: "1-4",
          text: "Perfect, I'll focus on that and bring some good practice problems for derivatives.",
          time: "Yesterday, 3:00 PM",
          isFromMe: true,
          isRead: true,
        },
        {
          id: "1-5",
          text: "I'm at the library waiting for the tutoring session. Will you be here soon?",
          time: "Today, 2:30 PM",
          isFromMe: false,
          isRead: false,
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "Michael R.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      },
      lastMessage: {
        text: "Thanks for helping with my CS project! The code is working perfectly now.",
        time: "Yesterday",
        isRead: true,
      },
      taskTitle: "Computer Science Assistance",
      isActive: false,
      messages: [
        {
          id: "2-1",
          text: "Hi! I'm really stuck on this Python data visualization project.",
          time: "Monday, 9:30 AM",
          isFromMe: false,
          isRead: true,
        },
        {
          id: "2-2",
          text: "I can help with that. I'm good with matplotlib and pandas. When would you like to meet?",
          time: "Monday, 9:45 AM",
          isFromMe: true,
          isRead: true,
        },
        {
          id: "2-3",
          text: "Could we meet at the computer lab tomorrow at 2pm?",
          time: "Monday, 10:15 AM",
          isFromMe: false,
          isRead: true,
        },
        {
          id: "2-4",
          text: "That works for me. I'll see you there.",
          time: "Monday, 10:20 AM",
          isFromMe: true,
          isRead: true,
        },
        {
          id: "2-5",
          text: "Thanks for helping with my CS project! The code is working perfectly now.",
          time: "Yesterday, 3:45 PM",
          isFromMe: false,
          isRead: true,
        },
      ],
    },
    {
      id: "3",
      user: {
        name: "Lisa W.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      },
      lastMessage: {
        text: "Are you available for dog walking this weekend too? Fluffy really enjoyed the walk!",
        time: "3 days ago",
        isRead: true,
      },
      taskTitle: "Dog Walking",
      isActive: false,
      messages: [
        {
          id: "3-1",
          text: "Hello! I'm wondering if you can walk my dog Fluffy tomorrow at 3pm?",
          time: "3 days ago, 10:00 AM",
          isFromMe: false,
          isRead: true,
        },
        {
          id: "3-2",
          text: "Hi Lisa! Yes, I'm available tomorrow at 3pm for dog walking. How long would you like me to walk Fluffy?",
          time: "3 days ago, 10:15 AM",
          isFromMe: true,
          isRead: true,
        },
        {
          id: "3-3",
          text: "Are you available for dog walking this weekend too? Fluffy really enjoyed the walk!",
          time: "3 days ago, 10:30 AM",
          isFromMe: false,
          isRead: true,
        },
      ],
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectConversation = (conversation: Conversation) => {
    const updatedConversations = conversations.map(c => {
      if (c.id === conversation.id) {
        const updatedMessages = c.messages.map(m => ({
          ...m,
          isRead: true
        }));
        return {
          ...c,
          lastMessage: { ...c.lastMessage, isRead: true },
          messages: updatedMessages,
          isActive: true
        };
      }
      return { ...c, isActive: false };
    });
    
    setConversations(updatedConversations);
    setSelectedConversation(updatedConversations.find(c => c.id === conversation.id) || null);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMessageObj: Message = {
      id: `${selectedConversation.id}-${selectedConversation.messages.length + 1}`,
      text: newMessage,
      time: "Just now",
      isFromMe: true,
      isRead: false
    };

    const updatedConversations = conversations.map(c => {
      if (c.id === selectedConversation.id) {
        return {
          ...c,
          lastMessage: {
            text: newMessage,
            time: "Just now",
            isRead: true
          },
          messages: [...c.messages, newMessageObj]
        };
      }
      return c;
    });

    setConversations(updatedConversations);
    setSelectedConversation(
      updatedConversations.find(c => c.id === selectedConversation.id) || null
    );
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(
    conversation => 
      conversation.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.taskTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const backToConversationList = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] min-h-[650px]">
      <div className={cn(
        "w-full md:w-1/3 border-r border-gray-100 flex flex-col",
        selectedConversation ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Task Communications</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={cn(
                  "p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors",
                  conversation.isActive && "bg-blue-50 hover:bg-blue-100",
                  !conversation.lastMessage.isRead && "bg-blue-50/30"
                )}
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={conversation.user.avatar || ""} />
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {conversation.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 truncate">
                        {conversation.user.name}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-1">
                        {conversation.lastMessage.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {conversation.taskTitle}
                    </p>
                    <p className={cn(
                      "text-sm mt-1 line-clamp-1",
                      !conversation.lastMessage.isRead ? "font-medium text-gray-900" : "text-gray-600"
                    )}>
                      {conversation.lastMessage.text}
                    </p>
                    {!conversation.lastMessage.isRead && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs mt-1">New</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <MessageSquare className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No conversations found</p>
            </div>
          )}
        </div>
      </div>

      <div className={cn(
        "w-full md:w-2/3 flex flex-col",
        !selectedConversation ? "hidden md:flex" : "flex"
      )}>
        {selectedConversation ? (
          <>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden"
                  onClick={backToConversationList}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.user.avatar || ""} />
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {selectedConversation.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedConversation.user.name}</h3>
                  <p className="text-xs text-gray-500">{selectedConversation.taskTitle}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View task details</DropdownMenuItem>
                  <DropdownMenuItem>Mark as complete</DropdownMenuItem>
                  <DropdownMenuItem>Request payment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div 
                    key={message.id}
                    className={cn(
                      "flex",
                      message.isFromMe ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.isFromMe 
                        ? "bg-green-600 text-white rounded-br-none shadow-sm" 
                        : "bg-white shadow-sm border border-gray-100 rounded-bl-none"
                    )}>
                      <p className="text-sm">{message.text}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        message.isFromMe ? "text-green-100" : "text-gray-500"
                      )}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[60px] resize-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="h-[60px] bg-green-600 hover:bg-green-700" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                <p>Keep all task communications on the platform for both parties' protection</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Select a conversation</h3>
              <p className="text-gray-500 mt-2">Stay in touch with clients about your tasks and respond promptly to inquiries</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesTab;
