import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Sparkles } from "lucide-react";
import ImageSlideshow from "@/components/ui/ImageSlideshow";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const tasks = [
    "Wash my Car",
    "Clean my Garage",
    "Help with Moving",
    "Assemble IKEA Furniture",
    "Write my Essay",
    "Code a Website",
    "Personal Training",
    "DJ for my Event",
    "Grocery Delivery",
    "Meal Prep",
    "Water my Plants",
    "Install my TV Mount",
    "Tutor me in Math",
    "Create Social Media Content",
    "Design my Logo",
    "Help Pack for my Trip",
    "Fix my Bugs",
    "Event Planning",
    "Organize my Closet",
    "Market Research",
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
  
  useEffect(() => {
    timeoutRef.current = window.setTimeout(handleTyping, typingSpeed);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  // Slideshow images
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
    }
  ];

  return (
    <div className="relative overflow-hidden pt-8">
      <div 
        className="absolute inset-0 z-2 bg-white/20 backdrop-blur-[0.5px]"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-12 md:pb-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 md:pr-8 space-y-6">
            <div className="inline-flex items-center gap-1 py-1 px-4 rounded-full bg-soft-yellow text-assist-blue text-sm font-medium animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Sparkles size={14} className="text-yellow-500" />
              <span>Trusted by 10,000+ students nationwide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="min-h-28 md:min-h-36 flex flex-col justify-start">
                <span>I need someone to help me...</span>
                <span className="text-assist-blue relative mt-2 md:mt-3">
                  <span className="after:content-['|'] after:ml-1 after:animate-pulse">{displayText}</span>
                </span>
              </div>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 animate-slide-in max-w-lg" style={{ animationDelay: "0.3s" }}>
              Connect with vetted college students for a wide range of tasks. From moving and cleaning to running errands, Assist makes getting things done simple.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 animate-slide-in" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white h-14 px-8 text-base font-medium shadow-soft hover:shadow-md hover:translate-y-[-2px] transition-all"
              >
                Book Your Task
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-assist-blue text-assist-blue hover:bg-assist-blue/10 hover:text-assist-blue h-14 px-8 text-base"
              >
                Join Assist as a Student <ChevronRight size={16} />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-6 animate-slide-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden hover:scale-110 transition-transform">
                  <img 
                    src="/lovable-uploads/85907e9e-0f77-4b04-b5b7-132ec55971fa.png" 
                    alt="Student 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden hover:scale-110 transition-transform">
                  <img 
                    src="/lovable-uploads/5857c7f0-9637-4ee9-adba-2c5f1076b9ac.png" 
                    alt="Student 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden hover:scale-110 transition-transform">
                  <img 
                    src="/lovable-uploads/a7543c7b-5d9f-4ac2-b243-49bfc5b8d199.png" 
                    alt="Student 3" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden hover:scale-110 transition-transform">
                  <img 
                    src="/lovable-uploads/917480cd-1a1e-4b01-b0ea-1fa142676a18.png" 
                    alt="Student 4" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-soft-blue to-soft-purple text-assist-blue flex items-center justify-center text-xs font-medium border-2 border-white">
                  +2k
                </div>
              </div>
              <div className="text-gray-700">
                <p className="font-medium">Trusted by students from 200+ universities</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm font-medium ml-1">4.9/5 (2,000+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-8 md:mt-0 animate-scale-in" style={{ animationDelay: "0.6s" }}>
            <div className="relative">
              <div className="absolute inset-0 -m-4 rounded-3xl bg-soft-pink/30 animate-float" style={{ animationDelay: "0.7s" }}></div>
              <div className="relative rounded-2xl overflow-hidden shadow-elevation h-[300px] sm:h-[350px] md:h-[400px]">
                <ImageSlideshow 
                  images={slideshowImages} 
                  autoplayInterval={5000} 
                  className="w-full h-full"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 glassmorphism p-4 rounded-xl shadow-elevation animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-soft-green rounded-full flex items-center justify-center text-green-600">
                    <Star size={20} className="fill-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Satisfaction Guarantee</p>
                    <p className="text-sm text-gray-600">Only pay once you're happy</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 glassmorphism p-4 rounded-xl shadow-elevation animate-float" style={{ animationDelay: "1.3s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-soft-orange rounded-full flex items-center justify-center text-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" fill="rgba(237, 137, 54, 0.2)" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Trusted & Vetted College Students</p>
                    <p className="text-sm text-gray-600">Every student is verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes gradient-animation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </div>
  );
};

export default Hero;
