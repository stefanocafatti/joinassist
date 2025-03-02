
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface WelcomeOverlayProps {
  userName: string;
  showWelcome: boolean;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ userName, showWelcome }) => {
  const [progress, setProgress] = useState(0);
  
  // If showWelcome is false, return null (don't render anything)
  if (!showWelcome) return null;
  
  // Animation and progress bar effect
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 4; // Increment speed
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-[90%] max-w-md flex flex-col items-center text-center p-8 rounded-xl">
        <motion.div 
          className="mb-6 text-assist-blue"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-20 h-20 bg-assist-blue/10 rounded-full flex items-center justify-center mb-2">
            <Check className="w-10 h-10 text-assist-blue" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold text-gray-900 mb-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Welcome, {userName}!
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          We're setting up your personalized dashboard...
        </motion.p>
        
        <motion.div 
          className="w-full bg-gray-200 rounded-full h-2 mb-2"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="bg-assist-blue h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </motion.div>
        
        <motion.p 
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {progress < 100 ? 'Loading your preferences...' : 'Ready!'}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WelcomeOverlay;
