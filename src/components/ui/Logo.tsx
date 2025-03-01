
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "white";
  showText?: boolean;
  className?: string;
}

const Logo = ({ variant = "default", showText = true, className = "" }: LogoProps) => {
  const [hover, setHover] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  // Trigger a sparkle animation when hovering
  useEffect(() => {
    if (hover) {
      setSparkle(true);
      const timer = setTimeout(() => setSparkle(false), 800);
      return () => clearTimeout(timer);
    }
  }, [hover]);

  const textColor = variant === "white" ? "text-white" : "text-assist-blue";
  
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 font-bold ${textColor} ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          variant === "white" 
            ? "bg-white/20" 
            : "bg-gradient-to-br from-[#D3E4FD] to-[#E5DEFF]"
        }`}>
          {/* Magic wand star logo */}
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 300 300" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={`transition-transform duration-300 ${hover ? "rotate-12 scale-110" : ""}`}
          >
            <path 
              d="M180 80C197.661 97.6613 204.024 104.024 210.31 100.714C216.595 97.4036 216.595 87.6851 216.595 68.2482L227.876 87.0997C247.313 87.0997 257.031 87.0997 260.342 93.3851C263.653 99.6705 257.289 106.034 244.563 118.76L263.414 130.042C263.414 149.479 263.414 159.197 257.129 162.508C250.844 165.818 244.481 159.455 231.755 146.729L220.473 165.58C201.036 165.58 191.318 165.58 188.008 159.294C184.697 153.009 191.06 146.646 203.786 133.92L184.935 122.638C184.935 103.201 184.935 93.4827 191.221 90.1722C197.506 86.8617 203.87 93.2253 216.595 105.951L220.473 87.0997C201.036 87.0997 191.318 87.0997 188.008 80.8143C184.697 74.5289 191.06 68.1659 203.786 55.4399L184.935 44.1584C184.935 24.7215 184.935 15.0031 191.221 11.6926C197.506 8.38213 203.87 14.7452 216.595 27.4711L227.876 8.61963C247.313 8.61963 257.031 8.61963 260.342 14.905C263.653 21.1904 257.289 27.5534 244.563 40.2794L263.414 51.5609C263.414 71.0069 263.414 80.7254 257.129 84.0413C250.844 87.3572 244.297 80.9886 231.482 68.1751" 
              stroke={variant === "white" ? "#FFFFFF" : "#3B82F6"} 
              strokeWidth="15"
              className={`${sparkle ? "animate-pulse" : ""}`}
            />
            <path 
              d="M80 200L10 270" 
              stroke={variant === "white" ? "#FFFFFF" : "#3B82F6"} 
              strokeWidth="15" 
              strokeLinecap="round"
              className={`${sparkle ? "animate-pulse" : ""}`}
            />
          </svg>
          
          {/* Sparkle effect */}
          {sparkle && (
            <>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-300 animate-ping opacity-75"></div>
              <div className="absolute -bottom-2 -left-1 w-2 h-2 rounded-full bg-yellow-300 animate-ping opacity-75 delay-100"></div>
              <div className="absolute top-1 -left-2 w-2 h-2 rounded-full bg-yellow-300 animate-ping opacity-75 delay-200"></div>
            </>
          )}
        </div>
      </div>
      
      {showText && (
        <span className="font-display text-2xl relative">
          Assist
          {sparkle && (
            <span className="absolute -top-2 -right-4 text-yellow-400 text-xs animate-bounce">✨</span>
          )}
        </span>
      )}
    </Link>
  );
};

export default Logo;
