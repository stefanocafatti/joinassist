
import React from "react";

type CircleBlockProps = {
  className?: string;
};

const CircleBlocks: React.FC<CircleBlockProps> = ({ className = "" }) => {
  const circles = [
    { 
      size: "40vw", 
      color: "#F2FCE2", 
      opacity: 0.6, // Reduced opacity
      top: "15%", 
      left: "-10%",
      animationDelay: "0s" 
    },
    { 
      size: "35vw", 
      color: "#D3E4FD", 
      opacity: 0.7, // Reduced opacity
      top: "60%", 
      left: "70%",
      animationDelay: "2s" 
    },
    { 
      size: "45vw", 
      color: "#E5DEFF", 
      opacity: 0.6, // Reduced opacity
      top: "75%", 
      left: "-15%",
      animationDelay: "1s" 
    },
    { 
      size: "30vw", 
      color: "#FDE1D3", 
      opacity: 0.7, // Reduced opacity
      top: "10%", 
      left: "80%",
      animationDelay: "1.5s" 
    },
  ];

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-float"
          style={{
            width: circle.size,
            height: circle.size,
            backgroundColor: circle.color,
            opacity: circle.opacity,
            top: circle.top,
            left: circle.left,
            animationDelay: circle.animationDelay,
            filter: "blur(40px)",
          }}
        />
      ))}
    </div>
  );
};

export default CircleBlocks;
