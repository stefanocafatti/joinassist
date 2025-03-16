
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Show loading animation for 2.5 seconds then navigate to sign-in
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      navigate('/mobile/sign-in');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center h-screen w-screen">
      <div className={`transition-all duration-1000 ${animationComplete ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="relative">
          <Logo variant="default" showText={true} className="scale-150" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
