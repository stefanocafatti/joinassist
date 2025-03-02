
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Filter } from "lucide-react";

interface Request {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  status: string;
  provider: string;
}

interface RequestsTabProps {
  requests: Request[];
  onNavigateToHome: () => void;
}

const RequestsTab: React.FC<RequestsTabProps> = ({ requests, onNavigateToHome }) => {
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <ClipboardList className="h-5 w-5 mr-2 text-assist-blue" /> Submitted Task Requests
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" size="sm">
              Sort by Date
            </Button>
          </div>
        </div>
        
        {requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Task</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Location</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Price</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <span className="font-medium text-gray-900">{request.title}</span>
                    </td>
                    <td className="px-4 py-4 text-gray-700">{request.date}</td>
                    <td className="px-4 py-4 text-gray-700">{request.location}</td>
                    <td className="px-4 py-4 text-gray-700">{request.price}</td>
                    <td className="px-4 py-4">
                      <Badge
                        className={`
                          ${request.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                          ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                          ${request.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                        `}
                      >
                        {request.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Button variant="ghost" size="sm" className="text-assist-blue">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests submitted</h3>
              <p className="text-gray-600 mb-6">
                You haven't submitted any task requests yet. Browse our available tasks or search for specific services.
              </p>
              <Button 
                className="bg-assist-blue hover:bg-assist-blue/90"
                onClick={onNavigateToHome}
              >
                Browse Tasks
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default RequestsTab;
