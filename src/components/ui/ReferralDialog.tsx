
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Share, Users, TrendingUp, Award } from "lucide-react";

interface ReferralDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralDialog: React.FC<ReferralDialogProps> = ({ isOpen, onClose }) => {
  const handleShare = () => {
    // Build the share content
    const shareTitle = 'Assist';
    const shareText = "I'm using Assist to get all my tasks completed! Make your life easier with help for everyday needs. Get $10 off your first task using this link";
    const shareUrl = 'https://www.assist.com/ref/123456';
    
    // Use Web Share API when available
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      }).catch(err => {
        console.log('Error sharing:', err);
        // Fallback to clipboard if sharing fails
        copyToClipboard();
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard();
    }
  };
  
  const copyToClipboard = () => {
    const shareText = "I'm using Assist to get all my tasks completed! Make your life easier with help for everyday needs. Get $10 off your first task using this link: https://www.assist.com/ref/123456";
    
    navigator.clipboard.writeText(shareText)
      .then(() => {
        alert('Referral link and message copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden bg-white text-gray-900 border-none max-w-[90vw]">
        <DialogTitle className="sr-only">Referral Program</DialogTitle>
        
        <Button 
          variant="ghost" 
          size="smallIcon" 
          className="absolute right-4 top-4 z-10 h-8 w-8 p-0" 
          onClick={onClose}
        >
          <X className="h-5 w-5 text-gray-500" />
          <span className="sr-only">Close</span>
        </Button>
        
        <div className="flex flex-col items-center px-6 py-8">
          {/* Gold coin image */}
          <div className="mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 flex items-center justify-center shadow-md">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-200 flex items-center justify-center">
                <Award className="h-10 w-10 text-yellow-600" strokeWidth={2} />
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-center mb-5">
            Give $10, Get $10
          </h2>
          
          {/* Benefits section - simplified */}
          <div className="w-full space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 rounded-full p-2.5">
                <Users className="h-4 w-4 text-assist-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Friends get $10 off their first task</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 rounded-full p-2.5">
                <TrendingUp className="h-4 w-4 text-assist-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-600">You get $10 when they complete their first task</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleShare}
            className="w-full rounded-full py-2 bg-gradient-to-r from-assist-blue to-blue-400 hover:opacity-90 text-white font-medium"
          >
            <Share className="h-4 w-4 mr-2" />
            Share Invite
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralDialog;
