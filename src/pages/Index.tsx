import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TaskCategories from "@/components/home/TaskCategories";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import { 
  Sparkles, 
  Star, 
  GraduationCap, 
  BookOpen, 
  Code, 
  Hammer, 
  Briefcase, 
  ShoppingBag,
  Car, 
  Truck, 
  Package, 
  Trash2, 
  Dumbbell, 
  PartyPopper,
  FileCheck,
  Key,
  Camera 
} from "lucide-react";

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

type PatternElement = {
  id: number;
  x: number;
  y: number;
  type: string;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
};

const Index = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [patternElements, setPatternElements] = useState<PatternElement[]>([]);

  useEffect(() => {
    const blueColors = [
      "#0EA5E9",
      "#0066cc",
      "#4a9fff",
      "#D3E4FD",
      "#33C3F0",
      "#1EAEDB",
      "#0FA0CE",
    ];

    const orangeColors = [
      "#F97316",
      "#FEC6A1",
    ];

    const purpleColors = [
      "#8B5CF6",
      "#D946EF",
      "#E5DEFF",
      "#9b87f5",
      "#7E69AB",
    ];

    const initialStars: Star[] = [];
    const starCount = window.innerWidth < 768 ? 25 : 40;

    for (let i = 0; i < starCount; i++) {
      const colorCategory = Math.random();
      let color;
      
      if (colorCategory < 0.6) {
        color = blueColors[Math.floor(Math.random() * blueColors.length)];
      } else if (colorCategory < 0.8) {
        color = orangeColors[Math.floor(Math.random() * orangeColors.length)];
      } else {
        color = purpleColors[Math.floor(Math.random() * purpleColors.length)];
      }
      
      initialStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        color: color,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.25,
        rotation: Math.random() * 360,
      });
    }

    setStars(initialStars);

    let animationFrameId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      if (timestamp - lastTime >= 33) {
        lastTime = timestamp;
        
        setStars(prevStars => 
          prevStars.map(star => {
            let newX = star.x + star.speedX;
            let newY = star.y + star.speedY;
            
            let newSpeedX = star.speedX;
            let newSpeedY = star.speedY;
            
            if (newX <= 0 || newX >= 100) {
              newSpeedX = -star.speedX * (0.9 + Math.random() * 0.2);
              newX = newX <= 0 ? 0 : 100;
            }
            
            if (newY <= 0 || newY >= 100) {
              newSpeedY = -star.speedY * (0.9 + Math.random() * 0.2);
              newY = newY <= 0 ? 0 : 100;
            }
            
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

  useEffect(() => {
    const colors = [
      "#0EA5E9",
      "#0066cc",
      "#4a9fff",
      "#D3E4FD",
      "#F97316",
      "#FEC6A1",
      "#8B5CF6",
      "#D946EF",
      "#E5DEFF",
      "#9b87f5",
      "#F2FCE2",
      "#FEF7CD",
      "#FFDEE2",
      "#FDE1D3",
    ];

    const elementTypes = [
      'graduation',
      'book',
      'code',
      'hammer',
      'briefcase',
      'car',
      'package',
      'trash',
      'dumbbell',
      'party',
      'filecheck',
      'key',
      'camera',
      'sparkle'
    ];

    const initialElements: PatternElement[] = [];
    const elementCount = window.innerWidth < 768 ? 35 : 60;

    for (let i = 0; i < elementCount; i++) {
      initialElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
        size: Math.random() * 1.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.2,
        rotation: Math.random() * 360,
      });
    }

    setPatternElements(initialElements);

    let animationFrameId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      if (timestamp - lastTime >= 33) {
        lastTime = timestamp;
        
        setPatternElements(prevElements => 
          prevElements.map(element => {
            const speedX = (Math.random() - 0.5) * 0.05;
            const speedY = (Math.random() - 0.5) * 0.05;
            
            let newX = element.x + speedX;
            let newY = element.y + speedY;
            
            if (newX <= 0 || newX >= 100) {
              newX = newX <= 0 ? 0 : 100;
            }
            
            if (newY <= 0 || newY >= 100) {
              newY = newY <= 0 ? 0 : 100;
            }
            
            const newRotation = (element.rotation + 0.1) % 360;
            
            return {
              ...element,
              x: newX,
              y: newY,
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

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
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
            {element.type === 'graduation' && (
              <GraduationCap 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'book' && (
              <BookOpen 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'code' && (
              <Code 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'hammer' && (
              <Hammer 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'briefcase' && (
              <Briefcase 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'car' && (
              <Car 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'package' && (
              <Package 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'trash' && (
              <Trash2 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'dumbbell' && (
              <Dumbbell 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'party' && (
              <PartyPopper 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'filecheck' && (
              <FileCheck 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'key' && (
              <Key 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'camera' && (
              <Camera 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
              />
            )}
            {element.type === 'sparkle' && (
              <Sparkles 
                size={`${element.size}vw`} 
                color={element.color} 
                strokeWidth={1.5}
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
