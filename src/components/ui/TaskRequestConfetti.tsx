
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskRequestConfettiProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle?: string;
}

const TaskRequestConfetti: React.FC<TaskRequestConfettiProps> = ({ 
  isOpen, 
  onClose,
  taskTitle = "Custom Task"
}) => {
  const [particles, setParticles] = useState<Array<{
    left: number;
    top: number;
    size: number;
    color: string;
    delay: number;
  }>>([]);

  useEffect(() => {
    if (isOpen) {
      // Generate confetti particles when popup opens
      const colors = ['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#B388FF', '#FFAB40'];
      const newParticles = Array.from({ length: 100 }, (_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-lg bg-white">
        <div className="relative overflow-hidden px-6 py-10">
          {/* Confetti animation */}
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
                  animation: `fall 3s ease-out forwards ${particle.delay}s`,
                }}
              />
            ))}
          </div>
          
          <div className="text-center space-y-5">
            <div className="mx-auto bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <PartyPopper className="h-10 w-10 text-purple-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900">
              Great! You've submitted a task request
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
              <p className="text-gray-700 text-sm">
                <span className="font-medium text-gray-900">{taskTitle}</span> has been requested
              </p>
            </div>
            
            <p className="text-gray-600 text-sm">
              We'll notify providers in your area about your task. You can check the status in the Requests tab.
            </p>
            
            <div className="pt-2">
              <Button 
                onClick={onClose}
                className="w-full bg-assist-blue hover:bg-assist-blue/90"
              >
                Got it!
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskRequestConfetti;
