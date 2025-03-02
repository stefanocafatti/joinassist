
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
      className={`flex items-center gap-2 ${textColor} ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="font-display text-3xl font-black tracking-tight relative">
        {/* Using a lighter gradient that ensures readability */}
        <span className="text-assist-blue relative">
          Assist
          <span className="absolute inset-0 bg-gradient-to-r from-assist-blue via-assist-blue/90 to-assist-blue/85 bg-clip-text text-transparent mix-blend-overlay opacity-50"></span>
        </span>
        {sparkle && (
          <span className="absolute -top-2 -right-4 text-yellow-400 text-xs animate-bounce">✨</span>
        )}
      </span>
    </Link>
  );
};

export default Logo;
