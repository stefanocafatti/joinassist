
import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Share } from "lucide-react";

interface ReferralDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralDialog: React.FC<ReferralDialogProps> = ({ isOpen, onClose }) => {
  const handleShare = () => {
    // In a real implementation, this would use the Web Share API
    // or copy a referral link to clipboard
    if (navigator.share) {
      navigator.share({
        title: 'Join me on Assist',
        text: 'Get $10 when you sign up and complete your first task!',
        url: 'https://www.assist.com/ref/123456',
      }).catch(err => {
        console.log('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText('https://www.assist.com/ref/123456')
        .then(() => {
          alert('Referral link copied to clipboard!');
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden border-none">
        <div className="relative h-16 flex items-center justify-end p-4 border-b">
          <DialogClose className="absolute right-4">
            <X className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
        
        <div className="flex flex-col items-center px-6 py-8">
          <div className="bg-green-50 rounded-full p-8 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-green-200 rounded-lg relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center">
                  <div className="text-red-500">❤️</div>
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-green-400 rounded-sm"></div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-4 border-l-2 border-r-2 border-t-2 border-green-400 rounded-t-sm"></div>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-4">Help Your Friends, Get $10</h2>
          
          <p className="text-center text-gray-700 mb-8 max-w-xs">
            Help a busy friend! Send them a $10 credit and get $10 when they complete their first task.
          </p>
          
          <p className="text-gray-500 mb-4">Copy link or share below:</p>
          
          <Button 
            onClick={handleShare}
            className="rounded-full px-8 py-6 bg-white text-green-600 border border-green-500 hover:bg-green-50"
          >
            <Share className="mr-2 h-4 w-4" />
            Tap to Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralDialog;
