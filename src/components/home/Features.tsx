import { useState, useEffect } from "react";
import { 
  Clock, 
  Search, 
  PenLine,
  GraduationCap,
  Check
} from "lucide-react";

const Features = () => {
  const [animatedStep, setAnimatedStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStep((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('how-it-works');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  return (
    <section id="how-it-works" className="py-8 md:py-12 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-soft-blue rounded-full blur-3xl opacity-20 -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-soft-pink rounded-full blur-3xl opacity-20 translate-x-1/3" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            How <span className="bg-gradient-to-r from-assist-blue via-blue-500 to-blue-400 bg-clip-text text-transparent">Assist</span> Works
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We've made it effortless to get the help you need—quickly, safely, and on your terms
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6 w-full">
            {[0, 1, 2].map(step => (
              <div 
                key={step} 
                className={`relative flex flex-col items-center ${
                  step === animatedStep ? 'opacity-100 scale-105' : 'opacity-80 scale-100'
                } transition-all duration-500 w-full md:w-1/3 max-w-sm`}
              >
                <div className={`
                  w-full h-48 mb-4 rounded-2xl flex items-center justify-center shadow-soft relative overflow-hidden
                  ${step === 0 ? 'bg-soft-orange text-orange-600' : 
                     step === 1 ? 'bg-soft-blue text-blue-600' : 
                     'bg-soft-green text-green-600'}
                  ${step === animatedStep ? 'animate-float' : ''}
                  transform transition-all duration-500 glassmorphism
                `}>
                  <div className="absolute top-3 right-3 h-3 w-3">
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${
                      step === 0 ? 'bg-orange-500' : 
                      step === 1 ? 'bg-blue-500' : 
                      'bg-green-500'
                    }`}></span>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <div className="mb-3 flex items-center justify-center">
                      {step === 0 ? (
                        <div className="p-2 rounded-full bg-orange-100">
                          <PenLine size={24} className="text-orange-500" />
                        </div>
                      ) : step === 1 ? (
                        <div className="p-2 rounded-full bg-blue-100">
                          <GraduationCap size={24} className="text-blue-500" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-full bg-green-100">
                          <Check size={24} className="text-green-500" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {step === 0 ? 'Browse or Post Your Task' : 
                       step === 1 ? 'Get Matched Instantly' : 
                       'Task Completed, Stress-Free'}
                    </h3>
                    <p className="text-center text-sm text-gray-600">
                      {step === 0 ? 'Describe what you need help with, set your budget, and choose a time that works for you.' : 
                       step === 1 ? 'We connect you with vetted college students who are ready to assist, ensuring reliable service.' : 
                       'Your Assist Student Expert completes the task to your satisfaction, with secure payment handling.'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-2">
            <div className="flex space-x-2">
              {[0, 1, 2].map(dot => (
                <button
                  key={dot}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    dot === animatedStep ? 'w-5 bg-assist-blue' : 'bg-gray-300'
                  }`}
                  onClick={() => setAnimatedStep(dot)}
                  aria-label={`View step ${dot + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
