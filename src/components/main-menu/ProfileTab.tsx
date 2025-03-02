
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, History, CreditCard, Phone, Mail, MapPin } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: "example@university.edu",
    phone: "",
    location: "Westwood, LA",
    avatarUrl: ""
  });
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const handleEditProfile = () => {
    setIsEditDialogOpen(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would save to a backend
    toast.success("Profile updated successfully");
    setIsEditDialogOpen(false);
  };
  
  // Get initials for avatar fallback
  const getInitials = () => {
    return `${profileForm.firstName.charAt(0)}${profileForm.lastName.charAt(0)}`;
  };
  
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            {previewImage ? (
              <Avatar className="w-16 h-16">
                <AvatarImage src={previewImage} alt={`${profileForm.firstName} ${profileForm.lastName}`} />
                <AvatarFallback className="bg-assist-blue/10 text-assist-blue text-lg">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-16 h-16 bg-assist-blue/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-assist-blue" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">{profileForm.firstName} {profileForm.lastName}</h2>
            <p className="text-gray-500">Member since 2023</p>
          </div>
          <Button className="ml-auto" variant="outline" size="sm" onClick={handleEditProfile}>Edit Profile</Button>
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
        
        {profileForm.phone || profileForm.email ? (
          <div className="mt-6 space-y-3">
            <h3 className="font-medium text-gray-700">Contact Information</h3>
            {profileForm.phone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{profileForm.phone}</span>
              </div>
            )}
            {profileForm.email && (
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{profileForm.email}</span>
              </div>
            )}
            {profileForm.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{profileForm.location}</span>
              </div>
            )}
          </div>
        ) : null}
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
      
      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24 cursor-pointer">
                  {previewImage ? (
                    <AvatarImage src={previewImage} alt={`${profileForm.firstName} ${profileForm.lastName}`} />
                  ) : (
                    <AvatarFallback className="bg-assist-blue/10 text-assist-blue text-xl">
                      {getInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Label 
                  htmlFor="profile-image" 
                  className="absolute bottom-0 right-0 p-1 bg-assist-blue text-white rounded-full cursor-pointer"
                >
                  <User className="h-4 w-4" />
                </Label>
                <Input 
                  id="profile-image" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input 
                  id="firstName" 
                  name="firstName"
                  value={profileForm.firstName} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input 
                  id="lastName" 
                  name="lastName"
                  value={profileForm.lastName} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={profileForm.email} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input 
                id="phone" 
                name="phone"
                type="tel" 
                value={profileForm.phone} 
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location"
                value={profileForm.location} 
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProfile}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileTab;
