
import React from "react";

interface WelcomeOverlayProps {
  userName: string;
  showWelcome: boolean;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ userName, showWelcome }) => {
  if (!showWelcome) return null;
  
  return (
    <div className="fixed inset-0 bg-assist-blue/90 flex items-center justify-center z-50 animate-fade-in">
      <div className="text-white text-center p-8 max-w-md animate-scale-in">
        <h1 className="text-4xl font-bold mb-4">Welcome, {userName}!</h1>
        <p className="text-xl">We're setting up your personalized dashboard...</p>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
