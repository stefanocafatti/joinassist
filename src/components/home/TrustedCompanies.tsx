
import React, { useEffect, useRef } from "react";

interface SchoolLogo {
  name: string;
  src: string;
  alt: string;
}

const TrustedCompanies = () => {
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  // School campus logos - new logos uploaded by the user
  const schoolLogos: SchoolLogo[] = [
    {
      name: "University of Michigan",
      src: "/lovable-uploads/1aaec955-1c38-424c-9045-b84a80a4d1de.png",
      alt: "University of Michigan logo - Yellow M with blue outline"
    },
    {
      name: "Auburn University",
      src: "/lovable-uploads/42996569-a765-4051-bed4-0abafd4372e7.png",
      alt: "Auburn University logo - AU in orange and blue"
    },
    {
      name: "University of Utah",
      src: "/lovable-uploads/1a174f4a-0894-4058-b86c-7949d3af82e4.png",
      alt: "University of Utah logo - Red U with feathers"
    },
    {
      name: "Texas Longhorns",
      src: "/lovable-uploads/ff4b47af-eb32-45c6-ad83-285f8a3cd905.png",
      alt: "Texas Longhorns logo - Orange Longhorn silhouette"
    },
    {
      name: "University of South Carolina",
      src: "/lovable-uploads/8d0891f3-e455-4ef9-9c2b-8b077062435d.png",
      alt: "University of South Carolina logo - Black C with garnet gamecock"
    },
    {
      name: "University of Tennessee",
      src: "/lovable-uploads/405fd86b-536d-44bb-a4bd-562deaa4a5d4.png",
      alt: "University of Tennessee logo - Orange T"
    },
    {
      name: "Texas A&M University",
      src: "/lovable-uploads/79b50b55-1c38-4f6c-8542-561bb97fde56.png",
      alt: "Texas A&M University logo - Maroon ATM"
    },
    {
      name: "Duke University",
      src: "/lovable-uploads/8f0819d2-0a35-4d0e-b084-3910376d7efe.png",
      alt: "Duke University logo - Blue D"
    },
    {
      name: "University of Miami",
      src: "/lovable-uploads/601c1754-7fb9-4c9b-813d-eed6284fde2e.png",
      alt: "University of Miami logo - Green and orange U"
    },
    {
      name: "University of Colorado",
      src: "/lovable-uploads/4bf537ed-5547-45ec-818f-541c833b893d.png",
      alt: "University of Colorado logo - Gold and black buffalo"
    },
    {
      name: "University of North Carolina",
      src: "/lovable-uploads/01dfa041-c3a2-4451-baba-e49430a0e6e0.png",
      alt: "University of North Carolina logo - Carolina blue NC"
    },
    {
      name: "USC Trojans",
      src: "/lovable-uploads/f063f72e-9bf9-4d8d-b4f9-db94f9ccf2f9.png",
      alt: "USC Trojans logo - Red and gold USC letters"
    },
  ];

  useEffect(() => {
    // Animation for continuous scrolling effect
    const animateContinuousScroll = () => {
      if (!primaryRef.current || !secondaryRef.current) return;
      
      // Set initial positions
      primaryRef.current.style.transform = "translateX(0)";
      secondaryRef.current.style.transform = "translateX(100%)";
      
      const duration = 30; // Duration in seconds for one complete loop (slightly longer for more logos)
      
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

  // Define the keyframes style as a string
  const scrollKeyframes = `
    @keyframes scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-100%);
      }
    }
  `;

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
              <div key={`logo-1-${index}`} className="px-6 flex-shrink-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-16 md:h-20 object-contain opacity-90 hover:opacity-100 transition-opacity"
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
              <div key={`logo-2-${index}`} className="px-6 flex-shrink-0">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-16 md:h-20 object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add the keyframes as a standard style element */}
      <style dangerouslySetInnerHTML={{ __html: scrollKeyframes }} />
    </section>
  );
};

export default TrustedCompanies;
