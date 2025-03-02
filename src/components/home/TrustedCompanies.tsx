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
    {
      name: "Loyola Marymount University",
      src: "/lovable-uploads/5007f985-256b-44c7-84a4-771e38f68d46.png",
      alt: "Loyola Marymount University logo - LMU in red with blue outline"
    },
    {
      name: "University of Maryland",
      src: "/lovable-uploads/a378830a-1a27-4d2e-92e1-c031259886f2.png",
      alt: "University of Maryland logo - red M with yellow and black outline"
    },
    {
      name: "Harvard University",
      src: "/lovable-uploads/bd897653-6f63-4864-8ffa-5b7838340cd4.png",
      alt: "Harvard University logo - red shield with Veritas books"
    },
    {
      name: "University of Florida",
      src: "/lovable-uploads/dfa8b3e7-eb5c-4c4f-aead-1cb691832ef9.png",
      alt: "University of Florida Gators logo - green alligator head with orange background"
    },
    {
      name: "New York University",
      src: "/lovable-uploads/ecb9ca3e-a5cc-4c7a-bd9b-596ae2745cd6.png",
      alt: "New York University logo - purple NYU with torch"
    },
    {
      name: "Stanford University",
      src: "/lovable-uploads/b168f9c7-63a3-4c44-9158-26a838ebd0d7.png",
      alt: "Stanford University logo - red S with tree"
    },
    {
      name: "University of Kentucky",
      src: "/lovable-uploads/d4347ef6-1725-4fd0-805d-34dcbfe25b7e.png",
      alt: "University of Kentucky Wildcats logo - blue UK"
    },
    {
      name: "University of Georgia",
      src: "/lovable-uploads/3f69b76f-921c-4aeb-ae85-e3e61d0ccff1.png",
      alt: "University of Georgia Bulldogs logo - black oval G with red outline"
    },
    {
      name: "Boston College",
      src: "/lovable-uploads/78f415b7-07f0-4e26-941c-cbba67ad22df.png",
      alt: "Boston College Eagles logo - maroon BC with eagle"
    },
    {
      name: "Princeton University",
      src: "/lovable-uploads/cbe8bf6e-c568-40f6-acf7-47eb4c4aa67c.png",
      alt: "Princeton University Tigers logo - orange P with black stripes"
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

    // Use CSS animation instead of JS for smoother scrolling
    const containerWidth = scrollContainer.scrollWidth / 2;
    scrollContainer.style.setProperty('--scroll-width', `${containerWidth}px`);
    scrollContainer.classList.add('animate-scroll');

    return () => {
      scrollContainer.classList.remove('animate-scroll');
    };
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-soft-green/40 via-white/30 to-soft-green/40 backdrop-blur-sm">
      <div className="relative overflow-hidden w-full">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-6 whitespace-nowrap"
        >
          {schoolLogos.map((logo, index) => (
            <div key={`logo-${index}`} className="flex-shrink-0 px-2">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-8 md:h-10 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--scroll-width)));
          }
        }
        
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      ` }} />
    </section>
  );
};

export default TrustedCompanies;
