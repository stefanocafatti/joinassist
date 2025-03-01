
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-assist-blue to-assist-blue/80 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-2/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to transform the way you get things done?
            </h2>
            <p className="text-white/90 text-lg max-w-2xl">
              Whether you're a student looking to earn or someone who needs tasks completed, Assist connects you with the right people at the right time.
            </p>
          </div>
          
          <div className="w-full md:w-1/3 flex flex-col sm:flex-row md:flex-col gap-4">
            <Button 
              size="lg" 
              className="rounded-full bg-white text-assist-blue hover:bg-white/90 h-14 px-8 text-base shadow-soft"
            >
              Book Your Task
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full border-white text-white hover:bg-white/10 hover:text-white h-14 px-8 text-base"
            >
              Join Assist as a Student <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">10,000+</div>
            <p className="text-white/80">Verified students</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">200+</div>
            <p className="text-white/80">Universities represented</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">50,000+</div>
            <p className="text-white/80">Tasks completed</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">4.9/5</div>
            <p className="text-white/80">Average task rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
