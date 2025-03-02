
import React, { useEffect, useRef } from "react";

interface SchoolLogo {
  name: string;
  src: string;
  alt: string;
}

const TrustedCompanies = () => {
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  // School campus logos
  const schoolLogos: SchoolLogo[] = [
    {
      name: "University of Utah",
      src: "/lovable-uploads/2f908d1f-c87f-4675-9a90-f463d0ccfd82.png",
      alt: "University of Utah logo - A red U inside a circle with a feather"
    },
    {
      name: "University of Colorado Boulder",
      src: "/lovable-uploads/28483c8a-0b86-4971-9c73-112476cc44d6.png",
      alt: "University of Colorado Boulder logo - A black buffalo with gold outline"
    },
    {
      name: "UCLA",
      src: "/lovable-uploads/73e3849a-bc0a-47a6-b487-66dafd6a3740.png",
      alt: "UCLA logo - Blue script spelling UCLA"
    },
    {
      name: "University of Tennessee",
      src: "/lovable-uploads/150c4d6c-9d7f-40b4-b4b7-6c2e9e97125a.png",
      alt: "University of Tennessee logo - Orange T"
    },
    {
      name: "USC",
      src: "/lovable-uploads/6abe5f55-5c7f-403c-8021-7a54874142a1.png",
      alt: "USC logo - USC in maroon letters with gold outlines"
    },
    {
      name: "University of Miami",
      src: "/lovable-uploads/c05aa831-974b-4269-ab8a-0f404db27da9.png",
      alt: "University of Miami logo - U with orange and green sides"
    },
    {
      name: "University of North Carolina",
      src: "/lovable-uploads/e2cb4f00-9428-4de0-9840-e9fa6e59c807.png",
      alt: "University of North Carolina logo - Light blue interlocking NC"
    },
    {
      name: "Duke University",
      src: "/lovable-uploads/976f133b-8038-4638-a276-9d490ad641b6.png",
      alt: "Duke University logo - Dark blue D"
    },
    {
      name: "Auburn University",
      src: "/lovable-uploads/e6618c4e-d67a-4c94-8d11-6b4d4e37f582.png",
      alt: "Auburn University logo - Blue AU with orange outline"
    },
    {
      name: "University of Michigan",
      src: "/lovable-uploads/2c4c89f8-f6f8-4028-bfc4-0b1e459fbf37.png",
      alt: "University of Michigan logo - Yellow M with blue outline"
    }
  ];

  useEffect(() => {
    // Animation for continuous scrolling effect
    const animateContinuousScroll = () => {
      if (!primaryRef.current || !secondaryRef.current) return;
      
      // Set initial positions
      primaryRef.current.style.transform = "translateX(0)";
      secondaryRef.current.style.transform = "translateX(100%)";
      
      const duration = 25; // Duration in seconds for one complete loop
      
      // Apply smooth transitions
      primaryRef.current.style.transition = `transform ${duration}s linear infinite`;
      secondaryRef.current.style.transition = `transform ${duration}s linear infinite`;
      
      // Start animation after a small delay to ensure transitions are applied
      setTimeout(() => {
        if (!primaryRef.current || !secondaryRef.current) return;
        
        // Move both sets to create continuous loop effect
        primaryRef.current.style.transform = "translateX(-100%)";
        secondaryRef.current.style.transform = "translateX(0)";
      }, 50);
    };

    animateContinuousScroll();

    return () => {
      // Cleanup animation on unmount
      if (primaryRef.current) {
        primaryRef.current.style.transition = "none";
      }
      if (secondaryRef.current) {
        secondaryRef.current.style.transition = "none";
      }
    };
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-soft-green via-white to-soft-green">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 py-2 px-6">
            <h3 className="text-green-600 font-semibold tracking-wide text-center uppercase">
              Schools Trust Assist
            </h3>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden w-full">
        <div className="flex whitespace-nowrap">
          {/* Primary set of logos */}
          <div 
            ref={primaryRef} 
            className="flex items-center justify-around min-w-full"
            style={{ willChange: "transform" }}
          >
            {schoolLogos.map((logo, index) => (
              <div key={`logo-1-${index}`} className="px-8 flex-shrink-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-12 md:h-14 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Secondary set for continuous loop */}
          <div 
            ref={secondaryRef} 
            className="flex items-center justify-around min-w-full absolute left-0 top-0"
            style={{ willChange: "transform" }}
          >
            {schoolLogos.map((logo, index) => (
              <div key={`logo-2-${index}`} className="px-8 flex-shrink-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-12 md:h-14 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedCompanies;
