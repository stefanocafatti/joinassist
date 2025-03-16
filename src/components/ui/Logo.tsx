
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "default" | "white";
  showText?: boolean;
  className?: string;
}

const Logo = ({ variant = "default", showText = true, className = "" }: LogoProps) => {
  const textColor = variant === "white" ? "text-white" : "text-assist-blue";
  
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 ${className}`}
    >
      {showText && (
        <span className="font-display text-3xl font-black tracking-tight">
          <span className={textColor}>Assist</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
