
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
    <div className="fixed inset-0 bg-assist-blue flex flex-col items-center justify-center h-screen w-screen">
      <div className={`transition-all duration-1000 ${animationComplete ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
        <Logo variant="white" showText={true} className="scale-150" />
      </div>
    </div>
  );
};

export default LoadingScreen;
