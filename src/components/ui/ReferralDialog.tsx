
import React from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Share, Users, Bell, TrendingUp } from "lucide-react";

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
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden bg-white text-gray-900 border-none max-w-[90vw]">
        <DialogClose className="absolute right-4 top-4 z-10">
          <X className="h-6 w-6 text-gray-500" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <div className="flex flex-col items-center px-6 py-8">
          {/* Gold coin image */}
          <div className="mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 flex items-center justify-center shadow-lg">
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-200 flex items-center justify-center">
                <div className="text-red-500 text-3xl">❤️</div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-6">
            Referred friends get $10 to book their tasks, you get $10
          </h2>
          
          {/* Benefits section */}
          <div className="w-full space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 rounded-full p-3">
                <Users className="h-5 w-5 text-assist-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Build your network</h3>
                <p className="text-sm text-gray-600">Referred friends will get $10 off their first task</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 rounded-full p-3">
                <Bell className="h-5 w-5 text-assist-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Get notified</h3>
                <p className="text-sm text-gray-600">You'll be notified when they complete their first task</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 rounded-full p-3">
                <TrendingUp className="h-5 w-5 text-assist-blue" />
              </div>
              <div>
                <h3 className="font-semibold">Earn rewards</h3>
                <p className="text-sm text-gray-600">Get $10 credit when your friend completes their first task</p>
              </div>
            </div>
          </div>
          
          {/* Referral link section */}
          <div className="w-full mb-6">
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50">
              <div className="flex-1 px-4 py-3 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                assist.com/invite/yourcode123
              </div>
              <button 
                className="bg-assist-blue text-white px-6 py-3 font-medium"
                onClick={() => {
                  navigator.clipboard.writeText('assist.com/invite/yourcode123');
                  alert('Copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
          </div>
          
          <Button 
            onClick={handleShare}
            className="w-full rounded-full py-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg"
          >
            Share Invite
          </Button>
          
          <div className="w-full flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>Credits: $0</span>
            <span className="underline">See Terms</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralDialog;
