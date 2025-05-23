
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const CTASection = () => {
  const isMobile = useIsMobile();
  
  const handleGetApp = () => {
    window.location.href = "https://www.apple.com/app-store/";
  };

  return (
    <section className="py-16 md:py-28 bg-gradient-to-r from-assist-blue/95 to-assist-blue/80 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl transform translate-y-1/2" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight">
            Ready to transform the way you get things done?
          </h2>
          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 md:mb-8">
            Download our app today and connect with verified college students who are ready to help you complete your tasks efficiently.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 md:mb-16">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="rounded-full bg-white text-assist-blue hover:bg-white/90 h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-semibold shadow-soft"
              onClick={handleGetApp}
            >
              Download Assist
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 pt-4 md:pt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-8 hover:bg-white/15 transition-all hover:transform hover:scale-105 hover:shadow-xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-transparent bg-clip-text drop-shadow-sm">10,000+</span>
            </div>
            <p className="text-sm md:text-base text-white/80">Verified students</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-8 hover:bg-white/15 transition-all hover:transform hover:scale-105 hover:shadow-xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-transparent bg-clip-text drop-shadow-sm">200+</span>
            </div>
            <p className="text-sm md:text-base text-white/80">Universities</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-8 hover:bg-white/15 transition-all hover:transform hover:scale-105 hover:shadow-xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-transparent bg-clip-text drop-shadow-sm">50,000+</span>
            </div>
            <p className="text-sm md:text-base text-white/80">Tasks completed</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-8 hover:bg-white/15 transition-all hover:transform hover:scale-105 hover:shadow-xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-transparent bg-clip-text drop-shadow-sm">4.9/5</span>
            </div>
            <p className="text-sm md:text-base text-white/80">Average rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
