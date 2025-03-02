import React from "react";

interface WelcomeOverlayProps {
  userName: string;
  showWelcome: boolean;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ userName, showWelcome }) => {
  // If showWelcome is false, return null (don't render anything)
  if (!showWelcome) return null;
  
  // Otherwise, return an empty div - effectively hiding the welcome overlay
  return null;
};

export default WelcomeOverlay;
