
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TaskCategories from "@/components/home/TaskCategories";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

// Circle properties and color options
type Circle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
};

const Index = () => {
  const [circles, setCircles] = useState<Circle[]>([]);

  // Generate initial circles
  useEffect(() => {
    const colors = [
      "#F2FCE2", // Soft Green
      "#FEF7CD", // Soft Yellow
      "#FEC6A1", // Soft Orange
      "#E5DEFF", // Soft Purple
      "#FFDEE2", // Soft Pink
      "#FDE1D3", // Soft Peach
      "#D3E4FD", // Soft Blue
      "#F1F0FB", // Soft Gray
    ];

    const initialCircles: Circle[] = [];
    const circleCount = window.innerWidth < 768 ? 12 : 20; // More circles

    for (let i = 0; i < circleCount; i++) {
      initialCircles.push({
        id: i,
        x: Math.random() * 100, // percentage position
        y: Math.random() * 100,
        size: Math.random() * 5 + 1, // much smaller size in vw units (1-6vw)
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.1, // faster speed as percentage of screen
        speedY: (Math.random() - 0.5) * 0.1, // faster speed as percentage of screen
        opacity: Math.random() * 0.4 + 0.1, // opacity between 0.1-0.5
      });
    }

    setCircles(initialCircles);

    // Animation frame for moving circles
    let animationFrameId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      // Throttle to 30fps for performance
      if (timestamp - lastTime >= 33) {
        lastTime = timestamp;
        
        setCircles(prevCircles => 
          prevCircles.map(circle => {
            // Update position based on speed
            let newX = circle.x + circle.speedX;
            let newY = circle.y + circle.speedY;
            
            // Bounce off walls
            let newSpeedX = circle.speedX;
            let newSpeedY = circle.speedY;
            
            if (newX <= 0 || newX >= 100) {
              newSpeedX = -circle.speedX;
              newX = newX <= 0 ? 0 : 100;
            }
            
            if (newY <= 0 || newY >= 100) {
              newSpeedY = -circle.speedY;
              newY = newY <= 0 ? 0 : 100;
            }
            
            return {
              ...circle,
              x: newX,
              y: newY,
              speedX: newSpeedX,
              speedY: newSpeedY,
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
      {/* Animated background circles */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="absolute rounded-full"
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: `${circle.size}vw`,
              height: `${circle.size}vw`,
              backgroundColor: circle.color,
              opacity: circle.opacity,
              transform: `translate(-50%, -50%)`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
          />
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
