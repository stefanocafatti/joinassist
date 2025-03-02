
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
        {/* Using stronger gradient with extended color stops for better readability */}
        <span className="bg-gradient-to-r from-assist-blue from-10% via-assist-blue via-70% to-assist-blue to-90% bg-clip-text text-transparent font-bold">
          Assist
        </span>
        {sparkle && (
          <span className="absolute -top-2 -right-4 text-yellow-400 text-xs animate-bounce">✨</span>
        )}
      </span>
    </Link>
  );
};

export default Logo;
