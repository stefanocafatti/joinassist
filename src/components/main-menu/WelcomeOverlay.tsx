
import React from "react";

interface WelcomeOverlayProps {
  userName: string;
  showWelcome: boolean;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ userName, showWelcome }) => {
  // Always return null to skip the welcome overlay completely
  return null;
};

export default WelcomeOverlay;
