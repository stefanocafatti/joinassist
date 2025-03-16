
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Sparkles, Download } from "lucide-react";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const tasks = [
    "Washing my Car",
    "Cleaning my Garage", 
    "Moving into my Dorm",
    "Moving out of my Dorm",
    "Assembling IKEA Furniture",
    "Writing my Essay",
    "Coding a Website",
    "Training in the Gym",
    "Djing for my Event",
    "Delivering my Groceries",
    "Prepping Meals",
    "Watering my Plants",
    "Installing my TV Mount",
    "Tutoring me in Math",
    "Creating Social Media Content",
    "Designing my Logo",
    "Helping me Pack for my Trip",
    "Fixing my Bugs",
    "Planning an Event",
    "Organizing my Closet",
    "Market Researching",
  ];
  
  const timeoutRef = useRef<number | null>(null);
  
  const handleTyping = () => {
    const currentIndex = loopNum % tasks.length;
    const fullText = tasks[currentIndex];
    
    setDisplayText(isDeleting 
      ? fullText.substring(0, displayText.length - 1) 
      : fullText.substring(0, displayText.length + 1)
    );
    
    if (!isDeleting && displayText === fullText) {
      setTypingSpeed(2000);
      setIsDeleting(true);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(150);
    } else {
      setTypingSpeed(isDeleting ? 50 : 150);
    }
  };
  
  const handleGetApp = () => {
    navigate("/customer-app");
  };

  useEffect(() => {
    timeoutRef.current = window.setTimeout(handleTyping, typingSpeed);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  const slideshowImages = [
    {
      src: "/lovable-uploads/b24b515c-09ad-4588-9d54-a96d1805f70f.png",
      alt: "Students washing a car"
    },
    {
      src: "/lovable-uploads/913318c0-10d3-4c6d-91f5-accf9169ae81.png",
      alt: "Student grocery shopping"
    },
    {
      src: "/lovable-uploads/43cf90f5-cec5-4bd6-b7ee-b8af312dcf6c.png",
      alt: "Students walking a dog"
    },
    {
      src: "/lovable-uploads/855b8281-c2b5-4c3f-a8d9-6074db6760b4.png",
      alt: "Student driving car"
    },
    {
      src: "/lovable-uploads/d3cfa02f-5bf5-438d-b0bd-97a6beb2ba63.png",
      alt: "Student doing woodwork"
    },
    {
      src: "/lovable-uploads/e67a50a7-d7a9-4d4a-bdc8-b311dd1abaf4.png",
      alt: "Student doing laundry"
    },
    {
      src: "/lovable-uploads/d4510528-0536-44c5-9297-f0665996da4f.png",
      alt: "Student DJ at a festival"
    },
    {
      src: "/lovable-uploads/66e6ac8c-166a-4ee9-9f42-f5e72a4bf0dc.png",
      alt: "Student personal training"
    }
  ];

  return (
    <div className="relative overflow-hidden pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 md:pt-14 pb-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 md:pr-8 space-y-7">
            <div className="inline-flex items-center gap-1 py-1 px-4 rounded-full bg-amber-100 text-amber-600 text-sm font-medium animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Sparkles size={14} className="text-amber-500" />
              <span>Trusted by 10,000+ students nationwide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="min-h-30 md:min-h-38 flex flex-col justify-start">
                <span>I need a student to assist me...</span>
                <span className="text-assist-blue relative mt-2 md:mt-3">
                  <span className="after:content-['|'] after:ml-1 after:animate-pulse">{displayText}</span>
                </span>
              </div>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 animate-slide-in max-w-lg" style={{ animationDelay: "0.3s" }}>
              Connect with vetted college students for a wide range of tasks. Download our app to get started and find the perfect student for your needs.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-5 pb-4 animate-slide-in" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white h-14 px-8 text-base font-medium shadow-soft hover:shadow-md hover:translate-y-[-2px] transition-all"
                onClick={handleGetApp}
              >
                <Download size={18} className="mr-2" />
                Download App
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-8 md:mt-0 animate-scale-in" style={{ animationDelay: "0.6s" }}>
            <div className="relative">
              <div className="absolute inset-0 -m-4 rounded-3xl bg-soft-pink/30 animate-float" style={{ animationDelay: "0.7s" }}></div>
              <div className="relative rounded-2xl overflow-hidden shadow-elevation h-[290px] sm:h-[330px] md:h-[370px] mt-4">
                <ImageSlideshow 
                  images={slideshowImages} 
                  autoplayInterval={5000} 
                  className="w-full h-full"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white/95 p-3 rounded-xl shadow-elevation animate-float z-30" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-soft-green rounded-full flex items-center justify-center text-green-600">
                    <Star size={16} className="fill-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Satisfaction Guarantee</p>
                    <p className="text-xs text-gray-600">Only pay once you're happy</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white/95 p-3 rounded-xl shadow-elevation animate-float z-30" style={{ animationDelay: "1.3s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-soft-orange rounded-full flex items-center justify-center text-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" fill="rgba(237, 137, 54, 0.2)" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Trusted & Vetted College Students</p>
                    <p className="text-xs text-gray-600">Every student is verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
        @keyframes gradient-animation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        `}
      </style>
    </div>
  );
};

export default Hero;
