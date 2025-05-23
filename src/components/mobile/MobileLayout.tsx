
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
    <div className="flex flex-col min-h-screen bg-blue-50">
      {showHeader && (
        <header className={cn(
          "sticky top-0 z-10 p-4 text-white shadow-sm", 
          "bg-gradient-to-r from-blue-400 via-assist-blue to-blue-500",
          headerClassName
        )}>
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center gap-3", !showLogo && !showBackButton && title ? "flex-1" : "")}>
              {showBackButton && (
                <button 
                  onClick={onBack} 
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              {showLogo && <Logo className="py-1 text-white" />}
            </div>
            
            {title && (
              <h1 className={cn(
                "text-xl font-bold text-white",
                !showLogo && !showBackButton ? "text-center mx-auto" : ""
              )}>
                {title}
              </h1>
            )}
            
            {headerAction ? (
              <div className="flex items-center">{headerAction}</div>
            ) : !showLogo && !showBackButton && title ? (
              <div className="flex-1"></div> // Empty div for proper centering
            ) : null}
          </div>
        </header>
      )}
      
      <main className={cn("flex-1 overflow-auto pb-16", contentClassName)}>
        <div className={isMobile ? "px-5 py-6" : "container px-6 py-6"}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MobileLayout;
