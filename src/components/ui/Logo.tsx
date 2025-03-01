
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
      <span className="font-display text-2xl font-extrabold tracking-tight relative">
        Assist
        {sparkle && (
          <span className="absolute -top-2 -right-4 text-yellow-400 text-xs animate-bounce">✨</span>
        )}
      </span>
    </Link>
  );
};

export default Logo;
