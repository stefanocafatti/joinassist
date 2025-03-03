
import React, { useEffect, useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Confetti from 'react-confetti';
import { useWindowSize } from "@/hooks/use-window-size";

interface ConfettiPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  onConfirm?: () => void;
  secondaryText?: string;
  onSecondaryAction?: () => void;
  content?: React.ReactNode;
  taskTitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const ConfettiPopup: React.FC<ConfettiPopupProps> = ({ 
  isOpen, 
  onClose,
  title = "Success!",
  description,
  confirmText = "Continue",
  onConfirm,
  secondaryText,
  onSecondaryAction,
  content,
  taskTitle,
  buttonText,
  onButtonClick
}) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Start confetti immediately when the popup opens
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 6000); // Extended duration for more celebration
      
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [isOpen]);
  
  // If buttonText is provided, use that for the main button text
  const finalConfirmText = buttonText || confirmText;
  // If onButtonClick is provided, use that for the main button action
  const finalOnConfirm = onButtonClick || onConfirm || onClose;
  
  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          colors={['#FFD700', '#FF6347', '#4169E1', '#32CD32', '#9932CC', '#FF8C00', '#00BFFF']}
          tweenDuration={8000}
          confettiSource={{
            x: width / 2,
            y: height / 3,
            w: 0,
            h: 0
          }}
        />
      )}
      
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[400px] bg-white rounded-lg p-0 overflow-hidden">
          <div className="p-6">
            <DialogHeader className="pb-2">
              <DialogTitle className="text-2xl font-bold text-center">{title}</DialogTitle>
            </DialogHeader>
            
            <div className="mt-2 text-center">
              {description && (
                <p className="text-gray-600 mb-4">{description}</p>
              )}
              
              {content && content}
              
              {taskTitle && !content && (
                <div className="bg-gray-50 p-6 rounded-lg mb-4 mt-4 text-left">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 font-medium">Task:</span>
                    <span className="font-semibold text-gray-900">{taskTitle}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 font-medium">Price:</span>
                    <span className="font-semibold text-green-600">$40/hr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Location:</span>
                    <span className="font-semibold text-gray-900">Campus Center</span>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
              {secondaryText && onSecondaryAction && (
                <Button 
                  variant="outline" 
                  onClick={onSecondaryAction} 
                  className="w-full sm:w-auto border-gray-300"
                >
                  {secondaryText}
                </Button>
              )}
              
              <Button 
                className="bg-assist-blue hover:bg-assist-blue/90 w-full sm:w-auto" 
                onClick={finalOnConfirm}
              >
                {finalConfirmText}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfettiPopup;
