
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Menu, Check, X, Navigation } from "lucide-react";
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface HomeHeaderProps {
  userName: string;
}

const HomeHeader = ({ userName }: HomeHeaderProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Los Angeles, CA");
  const [editLocation, setEditLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [useDeviceLocation, setUseDeviceLocation] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Categories data
  const categories = [
    { name: "Cleaning", icon: "🧹", color: "bg-soft-blue" },
    { name: "Delivery", icon: "🚚", color: "bg-soft-green" },
    { name: "Errands", icon: "🏃", color: "bg-soft-yellow" },
    { name: "Moving", icon: "📦", color: "bg-soft-purple" },
    { name: "Research", icon: "🔍", color: "bg-soft-pink" },
    { name: "Tutoring", icon: "📚", color: "bg-soft-orange" },
  ];

  const handleEditLocation = () => {
    if (editLocation.trim()) {
      setLocation(editLocation);
    }
    setIsOpen(false);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Use reverse geocoding to get address from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`
          );
          
          if (!response.ok) throw new Error("Failed to fetch location data");
          
          const data = await response.json();
          
          // Format the location with more precise details
          let locationText = "";
          
          if (data.address) {
            // Use a more detailed address format with neighborhood if available
            const address = data.address;
            
            // Start with the most specific location info
            if (address.neighbourhood) {
              locationText = address.neighbourhood;
            } else if (address.suburb) {
              locationText = address.suburb;
            } else if (address.district) {
              locationText = address.district;
            } else if (address.city_district) {
              locationText = address.city_district;
            } else if (address.aeroway) {
              locationText = address.aeroway;
            }
            
            // Add city/town info
            if (address.city) {
              locationText += locationText ? `, ${address.city}` : address.city;
            } else if (address.town) {
              locationText += locationText ? `, ${address.town}` : address.town;
            } else if (address.village) {
              locationText += locationText ? `, ${address.village}` : address.village;
            }
            
            // Add state/province if available
            if (address.state) {
              if (address.state_code) {
                locationText += locationText ? `, ${address.state_code}` : address.state_code;
              } else {
                locationText += locationText ? `, ${address.state}` : address.state;
              }
            }
          }
          
          // If we couldn't parse a good location name, use the display_name (truncated)
          if (!locationText && data.display_name) {
            locationText = data.display_name.split(',').slice(0, 3).join(', ');
          }
          
          if (locationText) {
            setLocation(locationText);
            setEditLocation(locationText);
            toast.success("Location updated based on your device");
          } else {
            throw new Error("Could not determine your location name");
          }
        } catch (error) {
          console.error("Error getting location:", error);
          toast.error("Could not retrieve your location. Please enter it manually.");
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        setIsGettingLocation(false);
        console.error("Geolocation error:", error);
        
        // Provide specific error messages for different error codes
        switch(error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Location access denied. Please enable location services for this site.");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            toast.error("Location request timed out.");
            break;
          default:
            toast.error("An unknown error occurred while retrieving location.");
        }
      }
    );
  };

  // Effect to get location when switch is toggled on
  useEffect(() => {
    if (useDeviceLocation) {
      getCurrentLocation();
    }
  }, [useDeviceLocation]);

  return (
    <>
      {/* Full-page gradient background */}
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-assist-blue/10 to-soft-purple/30 -z-10"></div>
      
      {/* Header Section */}
      <header className="fixed top-0 left-0 right-0 z-10 p-4">
        <div className="flex justify-between items-center">
          <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <div className="flex items-center text-gray-600 text-sm mb-1 cursor-pointer">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-assist-blue/70" />
                  <span>{location}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Edit your location</h4>
                  <Input 
                    placeholder="Enter your location" 
                    value={editLocation} 
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="h-9"
                    onFocus={() => setEditLocation(location)}
                  />
                  
                  <div className="flex items-center justify-between pt-2 pb-1">
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="use-device-location" 
                        checked={useDeviceLocation}
                        onCheckedChange={setUseDeviceLocation}
                        disabled={isGettingLocation}
                      />
                      <label 
                        htmlFor="use-device-location" 
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        Use device location
                      </label>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="smallIcon"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="h-7 w-7"
                    >
                      <Navigation className="h-3.5 w-3.5 text-assist-blue" />
                    </Button>
                  </div>
                  
                  {isGettingLocation && (
                    <p className="text-xs text-gray-500 animate-pulse">
                      Getting your location...
                    </p>
                  )}
                  
                  <div className="flex justify-end space-x-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsOpen(false)}
                      className="h-8 px-3 text-xs"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleEditLocation}
                      size="sm"
                      className="h-8 px-3 text-xs bg-assist-blue hover:bg-assist-blue/90"
                    >
                      <Check className="h-3.5 w-3.5 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <h1 className="text-2xl font-bold text-gray-900">Hello, {userName}!</h1>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <button className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm border border-gray-100 transition-colors hover:bg-gray-50">
                <Menu className="h-5 w-5 text-assist-blue/70" />
              </button>
            </DrawerTrigger>
            
            <DrawerContent className="px-4 py-6 max-h-[85vh]">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse by Category</h3>
                <p className="text-gray-500 text-sm">Select a category to find tasks</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category, index) => (
                  <div 
                    key={index}
                    className={`${category.color} rounded-xl flex items-center p-4 shadow-sm hover:shadow transition-all duration-200 cursor-pointer`}
                    onClick={() => navigate(`/mobile/category/${category.name.toLowerCase()}`)}
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm">
                      <span className="text-xl">{category.icon}</span>
                    </div>
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </div>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <p className="text-gray-600 text-sm font-medium mt-1 mb-3">Find skilled students for your tasks</p>
        
        {/* Enhanced Search Bar - moved closer to the title */}
        <div className="relative mb-4 group">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-assist-blue/60 group-hover:text-assist-blue transition-colors duration-200" />
          </div>
          <input
            type="text"
            placeholder="Try &quot;help moving&quot; or &quot;need a ride&quot;"
            className="w-full h-12 pl-11 pr-4 bg-white rounded-xl border-2 border-assist-blue/20 
                      focus:outline-none focus:ring-2 focus:ring-assist-blue/30 focus:border-assist-blue 
                      shadow-sm group-hover:border-assist-blue/40 group-hover:shadow 
                      transition-all duration-200 text-gray-800 placeholder:text-gray-400"
            onClick={() => navigate('/mobile/search')}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-assist-blue/60 to-soft-purple/60 
                        scale-x-0 group-hover:scale-x-100 rounded-b-xl transition-transform duration-300 origin-left"></div>
        </div>
      </header>
      
      {/* Adjusted padding to push content below the fixed header */}
      <div className="pt-36"></div>
    </>
  );
};

export default HomeHeader;
