
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
  buttonText?: string; // Added this prop to match usage in MainMenu.tsx
  onButtonClick?: () => void; // Added this prop to match usage in MainMenu.tsx
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
  buttonText, // Added this prop to match usage in MainMenu.tsx
  onButtonClick // Added this prop to match usage in MainMenu.tsx 
}) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
      
      return () => clearTimeout(timer);
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
          numberOfPieces={150}
          gravity={0.15}
        />
      )}
      
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[400px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">{title}</DialogTitle>
          </DialogHeader>
          
          <div className="mt-2 text-center">
            {description && (
              <p className="text-gray-600 mb-4">{description}</p>
            )}
            
            {content && content}
            
            {taskTitle && !content && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-lg font-medium">{taskTitle}</p>
                <p className="text-sm text-gray-500">has been added to your tasks</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
            {secondaryText && onSecondaryAction && (
              <Button variant="outline" onClick={onSecondaryAction} className="w-full sm:w-auto">
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfettiPopup;
