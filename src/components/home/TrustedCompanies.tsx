
import React, { useEffect, useRef } from "react";

interface SchoolLogo {
  name: string;
  src: string;
  alt: string;
}

const TrustedCompanies = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // School campus logos
  const schoolLogos: SchoolLogo[] = [
    {
      name: "University of South Carolina",
      src: "/lovable-uploads/8878f3f1-a684-49c1-bf61-41bbaeb302bc.png",
      alt: "University of South Carolina Gamecocks logo"
    },
    {
      name: "Auburn University",
      src: "/lovable-uploads/33ac30a4-4b4d-47a9-89a9-63711ff5e3fd.png",
      alt: "Auburn University logo with blue AU with orange outline"
    },
    {
      name: "University of Colorado",
      src: "/lovable-uploads/d3d48dba-0dac-4178-90e7-07985ad38734.png",
      alt: "University of Colorado Buffaloes logo with gold CU and black buffalo"
    },
    {
      name: "University of Michigan",
      src: "/lovable-uploads/087c819f-c0d8-4e17-8dec-e596d9076dbc.png",
      alt: "University of Michigan Wolverines logo - Yellow M with blue outline"
    },
    {
      name: "Duke University",
      src: "/lovable-uploads/042fe552-2786-4932-8528-c8f6f68c153d.png",
      alt: "Duke University Blue Devils logo - blue D"
    },
    {
      name: "Texas Longhorns",
      src: "/lovable-uploads/70679614-dca7-42cf-9596-9222a0ace956.png",
      alt: "Texas Longhorns logo - Orange Longhorn silhouette"
    },
    {
      name: "Texas A&M University",
      src: "/lovable-uploads/586d90f7-1a75-4b8a-9a06-a6e4e12680f8.png",
      alt: "Texas A&M University Aggies logo - maroon ATM"
    },
    {
      name: "University of Tennessee",
      src: "/lovable-uploads/22395a07-e465-4813-9e62-ce0ab3ef071b.png",
      alt: "University of Tennessee Volunteers logo - orange T"
    },
    {
      name: "University of Utah",
      src: "/lovable-uploads/c2ccc794-ffc7-4f4b-bae9-439be4c804f6.png",
      alt: "University of Utah Utes logo - red U with feathers"
    },
    {
      name: "University of North Carolina",
      src: "/lovable-uploads/14a9f2db-1073-4e30-aa50-fb7eb16d4689.png",
      alt: "University of North Carolina Tar Heels logo - Carolina blue NC"
    },
    {
      name: "University of Miami",
      src: "/lovable-uploads/6ff9b4c7-eed4-4fe2-a523-2cf251d47ff0.png",
      alt: "University of Miami Hurricanes logo - orange and green U"
    },
    {
      name: "USC Trojans",
      src: "/lovable-uploads/16e9c2ee-6d48-4bcc-8218-e8be6eac201a.png",
      alt: "USC Trojans logo - cardinal USC with gold outline"
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Clone the logos to ensure a seamless loop
    const content = Array.from(scrollContainer.children);
    content.forEach(item => {
      const clone = item.cloneNode(true);
      scrollContainer.appendChild(clone);
    });

    // Set up animation
    const animateScroll = () => {
      if (!scrollContainer) return;
      
      // If we've scrolled to half the content, reset to start for seamless loop
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
      
      requestAnimationFrame(animateScroll);
    };

    // Start the animation
    const animationId = requestAnimationFrame(animateScroll);

    // Clean up animation on unmount
    return () => {
      cancelAnimationFrame(animationId);
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
        <div 
          ref={scrollContainerRef}
          className="flex space-x-8 whitespace-nowrap overflow-x-hidden"
          style={{ scrollBehavior: 'smooth' }}
        >
          {schoolLogos.map((logo, index) => (
            <div key={`logo-${index}`} className="flex-shrink-0 px-3">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-16 md:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      ` }} />
    </section>
  );
};

export default TrustedCompanies;
