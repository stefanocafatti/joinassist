
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from "lucide-react";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-assist-blue/5 rounded-bl-[100px] opacity-80" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-assist-gray/60 rounded-tr-[50px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-12 md:pb-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 md:pr-8 space-y-6">
            <div className="inline-flex items-center gap-1 py-1 px-4 rounded-full bg-assist-blue/10 text-assist-blue text-sm font-medium animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Star size={14} className="fill-assist-blue" />
              <span>Trusted by 10,000+ students nationwide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              Your Tasks, <br />
              <span className="text-assist-blue">Our Students,</span> <br />
              More Time.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 animate-slide-in max-w-lg" style={{ animationDelay: "0.3s" }}>
              Connect with vetted college students for a wide range of tasks. From moving and cleaning to running errands, Assist makes getting things done simple.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 animate-slide-in" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white h-14 px-8 text-base font-medium shadow-soft hover:shadow-md hover:translate-y-[-2px] transition-all"
              >
                Book a Task
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-assist-blue text-assist-blue hover:bg-assist-blue/10 hover:text-assist-blue h-14 px-8 text-base"
              >
                Become a Student Helper <ChevronRight size={16} />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-6 animate-slide-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                    style={{
                      backgroundImage: `url(https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                ))}
                <div className="w-10 h-10 rounded-full bg-assist-blue text-white flex items-center justify-center text-xs font-medium border-2 border-white">
                  +2k
                </div>
              </div>
              <div className="text-gray-700">
                <p className="font-medium">Trusted by students from 200+ universities</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-assist-blue text-assist-blue" />
                  ))}
                  <span className="text-sm font-medium ml-1">4.9/5 (2,000+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-8 md:mt-0 animate-scale-in" style={{ animationDelay: "0.6s" }}>
            <div className="relative">
              <div className="absolute inset-0 -m-4 rounded-3xl bg-assist-blue/10 animate-float" style={{ animationDelay: "0.7s" }}></div>
              <div className="relative rounded-2xl overflow-hidden shadow-elevation">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                  alt="Students collaborating" 
                  className={`w-full h-auto aspect-[4/3] object-cover transition-all duration-700 ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 glassmorphism p-4 rounded-xl shadow-elevation animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-assist-blue/10 rounded-full flex items-center justify-center text-assist-blue">
                    <Star size={20} className="fill-assist-blue" />
                  </div>
                  <div>
                    <p className="font-medium">Satisfaction Guarantee</p>
                    <p className="text-sm text-gray-600">Only pay when you're satisfied</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 glassmorphism p-4 rounded-xl shadow-elevation animate-float" style={{ animationDelay: "1.3s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" fill="rgba(22, 163, 74, 0.2)" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Trusted & Vetted</p>
                    <p className="text-sm text-gray-600">Every student is verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
