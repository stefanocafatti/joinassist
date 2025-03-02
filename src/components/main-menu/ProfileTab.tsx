
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, History, CreditCard } from "lucide-react";

interface ProfileTabProps {
  user: {
    firstName: string;
    lastName: string;
    pastTasks: Array<{
      id: string;
      title: string;
      date: string;
      status: string;
    }>;
    paymentMethods: Array<{
      id: string;
      type: string;
      last4: string;
      brand: string;
      isDefault: boolean;
    }>;
  };
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user }) => {
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-assist-blue/10 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-assist-blue" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-500">Member since 2023</p>
          </div>
          <Button className="ml-auto" variant="outline" size="sm">Edit Profile</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{user.pastTasks.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-2xl font-bold text-gray-900">{user.pastTasks.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 text-sm">Saved Tasks</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
          </div>
        </div>
      </section>
      
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <History className="h-5 w-5 mr-2 text-assist-blue" /> Past Bookings
          </h2>
          <Button variant="ghost" size="sm" className="text-assist-blue">View All</Button>
        </div>
        
        {user.pastTasks.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {user.pastTasks.map((task) => (
              <div key={task.id} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">You don't have any past bookings yet.</p>
        )}
      </section>
      
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-assist-blue" /> Payment Methods
          </h2>
          <Button variant="outline" size="sm">Add New</Button>
        </div>
        
        {user.paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {user.paymentMethods.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between border border-gray-100 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{payment.brand} •••• {payment.last4}</p>
                    <p className="text-sm text-gray-500">{payment.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {payment.isDefault && (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">Default</Badge>
                  )}
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">No payment methods added yet.</p>
        )}
      </section>
    </div>
  );
};

export default ProfileTab;
