
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
        {/* Simple star wand SVG that matches the provided image */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={`transition-transform duration-300 ${hover ? "rotate-12 scale-110" : ""}`}
        >
          {/* Star with sparkles */}
          <path 
            d="M10.5 8.5L11.5 3.5L12.5 8.5L17.5 9.5L12.5 10.5L11.5 15.5L10.5 10.5L5.5 9.5L10.5 8.5Z" 
            stroke={variant === "white" ? "#FFFFFF" : "#3B82F6"} 
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className={`${sparkle ? "animate-pulse" : ""}`}
          />
          {/* Wand handle */}
          <path 
            d="M4 20L11.5 12.5" 
            stroke={variant === "white" ? "#FFFFFF" : "#3B82F6"} 
            strokeWidth="1.5"
            strokeLinecap="round"
            className={`${sparkle ? "animate-pulse" : ""}`}
          />
          {/* Sparkle dots */}
          <path 
            d="M9 6.5L8.5 6M14 9L14.5 8.5M14 10L14.5 10.5M12 5L12 4.5" 
            stroke={variant === "white" ? "#FFFFFF" : "#3B82F6"} 
            strokeWidth="1"
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
