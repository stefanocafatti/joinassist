
import React, { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  headerAction?: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
}

const MobileLayout = ({
  children,
  showHeader = true,
  title,
  showBackButton = false,
  onBack,
  showLogo = true,
  headerAction,
  headerClassName = "",
  contentClassName = "",
}: MobileLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {showHeader && (
        <header className={cn("sticky top-0 z-10 bg-white shadow-sm p-4", headerClassName)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <button 
                  onClick={onBack} 
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              {showLogo && <Logo className="py-1" />}
              {title && <h1 className="text-xl font-bold text-gray-800">{title}</h1>}
            </div>
            {headerAction && (
              <div className="flex items-center">{headerAction}</div>
            )}
          </div>
        </header>
      )}
      
      <main className={cn("flex-1 overflow-auto", contentClassName)}>
        <div className={isMobile ? "px-5 py-6" : "container px-6 py-6"}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MobileLayout;
