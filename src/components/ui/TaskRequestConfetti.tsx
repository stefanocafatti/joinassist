
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, CheckCircle } from "lucide-react";
import Confetti from 'react-confetti';
import { useWindowSize } from "@/hooks/use-window-size";

interface TaskRequestConfettiProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const TaskRequestConfetti: React.FC<TaskRequestConfettiProps> = ({ 
  isOpen, 
  onClose,
  taskTitle = "Custom Task",
  title,
  description,
  buttonText = "Got it!",
  onButtonClick
}) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(200);
  const [particles, setParticles] = useState<Array<{
    left: number;
    top: number;
    size: number;
    color: string;
    delay: number;
  }>>([]);

  useEffect(() => {
    if (isOpen) {
      // Generate enhanced confetti particles with more variety
      const colors = [
        '#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#B388FF', '#FFAB40', 
        '#FF1493', '#00BFFF', '#7CFC00', '#9932CC', '#FF4500'
      ];
      const newParticles = Array.from({ length: 150 }, (_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 12 + 5, // Slightly bigger particles
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.7 // Longer delays for more varied animation
      }));
      setParticles(newParticles);
      
      // Start confetti animation with a big burst
      setShowConfetti(true);
      setConfettiPieces(800);
      
      // After initial burst, reduce confetti
      const burstTimer = setTimeout(() => {
        setConfettiPieces(300);
      }, 1500);
      
      // Stop confetti after an extended duration
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 8000); // Extended duration for more celebration
      
      return () => {
        clearTimeout(timer);
        clearTimeout(burstTimer);
        setShowConfetti(false);
      };
    } else {
      setShowConfetti(false);
    }
  }, [isOpen]);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      onClose();
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={confettiPieces}
          gravity={0.1}
          wind={0.02}
          colors={['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#B388FF', '#FFAB40', '#FF1493', '#00BFFF', '#7CFC00', '#9932CC', '#FF4500']}
          confettiSource={{
            x: width / 2,
            y: height / 3,
            w: 0,
            h: 0
          }}
        />
      )}
    
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] rounded-lg bg-white shadow-2xl animate-enter">
          <div className="relative overflow-hidden px-6 py-10">
            {/* CSS Confetti animation */}
            <div className="absolute inset-0 pointer-events-none">
              {particles.map((particle, index) => (
                <div 
                  key={index}
                  className="absolute animate-fall"
                  style={{
                    left: `${particle.left}%`,
                    top: `-20px`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: particle.color,
                    borderRadius: '50%',
                    opacity: 0,
                    animation: `fall 5s ease-out forwards ${particle.delay}s`,
                    zIndex: 10,
                  }}
                />
              ))}
            </div>
            
            <div className="text-center space-y-5 relative z-20">
              <div className="mx-auto bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center animate-bounce">
                <PartyPopper className="h-10 w-10 text-purple-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 animate-fade-in">
                {title || "Great! You've submitted a task request"}
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-center space-x-3 shadow-inner animate-fade-in">
                <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-gray-900">{taskTitle}</span> has been requested
                </p>
              </div>
              
              <p className="text-gray-600 text-sm animate-fade-in">
                {description || "We'll notify providers in your area about your task. You can check the status in the Requests tab."}
              </p>
              
              <div className="pt-2">
                <Button 
                  onClick={handleButtonClick}
                  className="w-full bg-assist-blue hover:bg-assist-blue/90 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskRequestConfetti;
