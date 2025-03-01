
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TaskCategories from "@/components/home/TaskCategories";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import { Sparkles, Star } from "lucide-react";

// Star properties and color options
type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
};

// Pattern element type
type PatternElement = {
  id: number;
  x: number;
  y: number;
  type: 'sparkle' | 'circle' | 'star';
  size: number;
  color: string;
  opacity: number;
  rotation: number;
};

const Index = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [patternElements, setPatternElements] = useState<PatternElement[]>([]);

  // Generate initial stars
  useEffect(() => {
    // Define colors with emphasis on blues (60%), with some oranges (20%) and purples (20%)
    const blueColors = [
      "#0EA5E9", // Ocean Blue
      "#0066cc", // Assist Blue
      "#4a9fff", // Light Blue
      "#D3E4FD", // Soft Blue
      "#33C3F0", // Sky Blue
      "#1EAEDB", // Bright Blue
      "#0FA0CE", // Bright Blue
    ];
    
    const orangeColors = [
      "#F97316", // Bright Orange
      "#FEC6A1", // Soft Orange
    ];
    
    const purpleColors = [
      "#8B5CF6", // Vivid Purple
      "#D946EF", // Magenta Pink
      "#E5DEFF", // Soft Purple
      "#9b87f5", // Primary Purple
      "#7E69AB", // Secondary Purple
    ];

    const initialStars: Star[] = [];
    const starCount = window.innerWidth < 768 ? 25 : 40; // More stars for better effect

    for (let i = 0; i < starCount; i++) {
      // Determine which color category to use based on desired distribution
      // 60% blue, 20% orange, 20% purple
      const colorCategory = Math.random();
      let color;
      
      if (colorCategory < 0.6) {
        // 60% blue
        color = blueColors[Math.floor(Math.random() * blueColors.length)];
      } else if (colorCategory < 0.8) {
        // 20% orange
        color = orangeColors[Math.floor(Math.random() * orangeColors.length)];
      } else {
        // 20% purple
        color = purpleColors[Math.floor(Math.random() * purpleColors.length)];
      }
      
      initialStars.push({
        id: i,
        x: Math.random() * 100, // percentage position
        y: Math.random() * 100,
        size: Math.random() * 4 + 1, // size in vw units (1-5vw)
        color: color,
        speedX: (Math.random() - 0.5) * 0.2, // velocity
        speedY: (Math.random() - 0.5) * 0.2, // velocity
        opacity: Math.random() * 0.5 + 0.25, // opacity between 0.25-0.75 for better visibility
        rotation: Math.random() * 360, // random initial rotation
      });
    }

    setStars(initialStars);

    // Animation frame for moving stars
    let animationFrameId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      // Throttle to 30fps for performance
      if (timestamp - lastTime >= 33) {
        lastTime = timestamp;
        
        setStars(prevStars => 
          prevStars.map(star => {
            // Update position based on speed
            let newX = star.x + star.speedX;
            let newY = star.y + star.speedY;
            
            // Bounce off walls with slight random variation for more natural movement
            let newSpeedX = star.speedX;
            let newSpeedY = star.speedY;
            
            if (newX <= 0 || newX >= 100) {
              newSpeedX = -star.speedX * (0.9 + Math.random() * 0.2); // Add slight randomness to bounce
              newX = newX <= 0 ? 0 : 100;
            }
            
            if (newY <= 0 || newY >= 100) {
              newSpeedY = -star.speedY * (0.9 + Math.random() * 0.2); // Add slight randomness to bounce
              newY = newY <= 0 ? 0 : 100;
            }
            
            // Slowly rotate the star as it moves
            const newRotation = (star.rotation + 0.2) % 360;
            
            return {
              ...star,
              x: newX,
              y: newY,
              speedX: newSpeedX,
              speedY: newSpeedY,
              rotation: newRotation,
            };
          })
        );
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Generate pattern elements
  useEffect(() => {
    const colors = [
      "#F2FCE2", // Soft Green
      "#FEF7CD", // Soft Yellow
      "#FEC6A1", // Soft Orange
      "#E5DEFF", // Soft Purple
      "#FFDEE2", // Soft Pink
      "#FDE1D3", // Soft Peach
      "#D3E4FD", // Soft Blue
    ];

    const elementTypes: Array<'sparkle' | 'circle' | 'star'> = ['sparkle', 'circle', 'star'];
    const initialElements: PatternElement[] = [];
    const elementCount = window.innerWidth < 768 ? 25 : 40;

    for (let i = 0; i < elementCount; i++) {
      initialElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
        size: Math.random() * 1.5 + 0.5, // 0.5-2vw
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.2 + 0.05, // Very subtle opacity
        rotation: Math.random() * 360, // Random rotation
      });
    }

    setPatternElements(initialElements);
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {});
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background stars */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: `translate(-50%, -50%) rotate(${star.rotation}deg)`,
              zIndex: -1,
            }}
          >
            <Star
              size={`${star.size}vw`}
              color={star.color}
              fill={star.color}
              fillOpacity={star.opacity * 0.5}
              strokeWidth={1}
              opacity={star.opacity}
            />
          </div>
        ))}

        {/* Static pattern elements */}
        {patternElements.map((element) => (
          <div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              opacity: element.opacity,
              transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
              zIndex: -1,
            }}
          >
            {element.type === 'sparkle' && (
              <Sparkles 
                size={`${element.size}vw`} 
                color={element.color} 
              />
            )}
            {element.type === 'circle' && (
              <Star 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1}
              />
            )}
            {element.type === 'star' && (
              <Star 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1}
              />
            )}
          </div>
        ))}
      </div>
      
      <Navbar />
      
      <main className="flex-grow relative z-10">
        <Hero />
        <Features />
        <TaskCategories />
        <Testimonials />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
