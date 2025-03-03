import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, X, MapPin, DollarSign, ThumbsUp, MessageSquare, Star } from "lucide-react";

interface Request {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  status: string;
  client?: string;
  provider?: string;
  additionalInfo?: string;
  clientImage?: string;
  rating?: number;
}

const RequestsTab = () => {
  const [activeRequestTab, setActiveRequestTab] = useState("incoming");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  
  const incomingRequests: Request[] = [
    {
      id: "req1",
      title: "Help With Physics Homework",
      date: "Tomorrow, 4:00 PM",
      location: "University Library, 2nd Floor",
      price: "$35",
      status: "pending",
      client: "Alex Johnson",
      clientImage: "https://i.pravatar.cc/150?img=11",
      additionalInfo: "Need help with mechanics problems and test preparation."
    },
    {
      id: "req2",
      title: "Website Debugging",
      date: "Friday, 2:30 PM",
      location: "Remote",
      price: "$50",
      status: "pending",
      client: "Maria Garcia",
      clientImage: "https://i.pravatar.cc/150?img=5",
      additionalInfo: "Looking for help debugging a React application with some state management issues."
    }
  ];
  
  const outgoingRequests: Request[] = [
    {
      id: "req3",
      title: "Math Tutoring",
      date: "Wednesday, 3:00 PM",
      location: "Science Building, Room 101",
      price: "$30",
      status: "confirmed",
      provider: "Jake Wilson",
      additionalInfo: "Calculus tutoring session, bring textbook and homework problems."
    },
    {
      id: "req4",
      title: "Essay Review",
      date: "Thursday, 1:00 PM",
      location: "Student Center",
      price: "$25",
      status: "pending",
      provider: "Emily Chen",
      additionalInfo: "Need review of 5-page essay on American Literature before submission."
    }
  ];
  
  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setViewDetailsOpen(true);
  };
  
  const handleCloseDetails = () => {
    setViewDetailsOpen(false);
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const renderRequestCard = (request: Request, type: "incoming" | "outgoing") => {
    return (
      <Card key={request.id} className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{request.title}</CardTitle>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{request.date}</span>
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4 mr-1" />
                <span>{request.location}</span>
              </div>
            </div>
            <Badge className={getStatusColor(request.status)}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {type === "incoming" && request.clientImage ? (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={request.clientImage} alt={request.client} />
                  <AvatarFallback>{request.client?.[0]}</AvatarFallback>
                </Avatar>
              ) : null}
              <div>
                <p className="text-sm font-medium">
                  {type === "incoming" ? request.client : request.provider}
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {request.price}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleViewDetails(request)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Task Requests</h1>
      
      <Tabs defaultValue="incoming" value={activeRequestTab} onValueChange={setActiveRequestTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="incoming" className="space-y-4">
          {incomingRequests.length > 0 ? (
            incomingRequests.map(request => renderRequestCard(request, "incoming"))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No incoming requests</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="outgoing" className="space-y-4">
          {outgoingRequests.length > 0 ? (
            outgoingRequests.map(request => renderRequestCard(request, "outgoing"))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No outgoing requests</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {selectedRequest && (
        <Dialog open={viewDetailsOpen} onOpenChange={handleCloseDetails}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedRequest.title}</DialogTitle>
              <DialogDescription>
                {activeRequestTab === "incoming" 
                  ? "Incoming request details" 
                  : "Your request details"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {selectedRequest.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {selectedRequest.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                      {selectedRequest.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge className={getStatusColor(selectedRequest.status)}>
                      {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Additional Information</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedRequest.additionalInfo || "No additional information provided"}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">
                  {activeRequestTab === "incoming" ? "Client" : "Provider"}
                </p>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  {activeRequestTab === "incoming" && selectedRequest.clientImage ? (
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={selectedRequest.clientImage} alt={selectedRequest.client} />
                      <AvatarFallback>{selectedRequest.client?.[0]}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>{(activeRequestTab === "incoming" ? selectedRequest.client : selectedRequest.provider)?.[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-medium">
                      {activeRequestTab === "incoming" ? selectedRequest.client : selectedRequest.provider}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {activeRequestTab === "incoming" && selectedRequest.status === "pending" && (
                <>
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                    onClick={handleCloseDetails}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Decline
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Accept
                  </Button>
                </>
              )}
              
              {activeRequestTab === "outgoing" && selectedRequest.status === "pending" && (
                <Button 
                  variant="outline" 
                  className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                  onClick={handleCloseDetails}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel Request
                </Button>
              )}
              
              {selectedRequest.status === "confirmed" && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              )}
              
              {selectedRequest.status === "completed" && activeRequestTab === "outgoing" && (
                <Button className="bg-yellow-500 hover:bg-yellow-600">
                  <Star className="h-4 w-4 mr-2" />
                  Leave Review
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RequestsTab;
