
import React, { useEffect, useRef } from "react";

interface CompanyLogo {
  name: string;
  src: string;
  alt: string;
}

const TrustedCompanies = () => {
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  // Company logos
  const companyLogos: CompanyLogo[] = [
    {
      name: "Yahoo",
      src: "/lovable-uploads/6f7d1e56-33a4-4f51-808e-e817d982c869.png",
      alt: "Yahoo logo"
    },
    {
      name: "PBS",
      src: "/lovable-uploads/6f7d1e56-33a4-4f51-808e-e817d982c869.png",
      alt: "PBS logo"
    },
    {
      name: "Vacation",
      src: "/lovable-uploads/6f7d1e56-33a4-4f51-808e-e817d982c869.png",
      alt: "Vacation logo"
    },
    {
      name: "Peacock",
      src: "/lovable-uploads/6f7d1e56-33a4-4f51-808e-e817d982c869.png",
      alt: "Peacock logo"
    },
    {
      name: "HBO",
      src: "/lovable-uploads/6f7d1e56-33a4-4f51-808e-e817d982c869.png",
      alt: "HBO logo"
    },
    {
      name: "Steve Madden",
      src: "/lovable-uploads/6f7d1e56-33a4-4f51-808e-e817d982c869.png",
      alt: "Steve Madden logo"
    }
  ];

  useEffect(() => {
    // Animation for continuous scrolling effect
    const animateScroll = () => {
      if (!primaryRef.current || !secondaryRef.current) return;

      primaryRef.current.style.transform = "translateX(-100%)";
      secondaryRef.current.style.transform = "translateX(0)";

      const transitionDuration = 30 * companyLogos.length; // Adjust speed based on number of logos
      primaryRef.current.style.transition = `transform ${transitionDuration}s linear`;
      secondaryRef.current.style.transition = `transform ${transitionDuration}s linear`;

      // Reset after animation completes for seamless looping
      setTimeout(() => {
        if (!primaryRef.current || !secondaryRef.current) return;
        primaryRef.current.style.transition = "none";
        secondaryRef.current.style.transition = "none";
        primaryRef.current.style.transform = "translateX(0)";
        secondaryRef.current.style.transform = "translateX(100%)";

        // Restart animation after a brief timeout
        setTimeout(() => {
          animateScroll();
        }, 50);
      }, transitionDuration * 1000);
    };

    animateScroll();

    return () => {
      // Cleanup animation on unmount
      if (primaryRef.current) {
        primaryRef.current.style.transition = "none";
      }
      if (secondaryRef.current) {
        secondaryRef.current.style.transition = "none";
      }
    };
  }, [companyLogos.length]);

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 py-2 px-6">
            <h3 className="text-assist-blue font-semibold tracking-wide text-center uppercase">
              Companies Trust Assist
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
          >
            {companyLogos.map((logo, index) => (
              <div key={`logo-1-${index}`} className="px-10 flex-shrink-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-12 md:h-16 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Secondary set for continuous loop */}
          <div 
            ref={secondaryRef} 
            className="flex items-center justify-around min-w-full absolute left-full top-0"
          >
            {companyLogos.map((logo, index) => (
              <div key={`logo-2-${index}`} className="px-10 flex-shrink-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-12 md:h-16 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
