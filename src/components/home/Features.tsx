
import { useState, useEffect } from "react";
import { 
  Clock, 
  Search, 
  Star, 
  Sparkles, 
  Wrench, 
  Calendar, 
  Users, 
  MessageCircle,
  CheckCircle2,
  PenLine,
  GraduationCap,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  const [animatedStep, setAnimatedStep] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const featuresData = [
    {
      title: "Expert Assistance",
      description: "Get matched with skilled students who can handle a wide range of tasks.",
      icon: Wrench,
      color: "bg-soft-blue",
      sections: [
        {
          title: "Home Repairs",
          description: "From leaky faucets to furniture assembly, find students with the right skills.",
          tasks: ["Fixing appliances", "Mounting shelves", "Assembling furniture"],
          image: "/lovable-uploads/09999999-6666-4444-aaaa-222222222222.png",
        },
        {
          title: "Tech Support",
          description: "Need help setting up your smart home devices or troubleshooting computer issues?",
          tasks: ["Setting up devices", "Troubleshooting issues", "Installing software"],
          image: "/lovable-uploads/11111111-bbbb-4444-cccc-333333333333.png",
        },
      ],
    },
    {
      title: "Time-Saving Solutions",
      description: "Delegate your to-do list and free up your time for what matters most.",
      icon: Clock,
      color: "bg-soft-green",
      sections: [
        {
          title: "Errands & Shopping",
          description: "Let students handle your grocery shopping, dry cleaning, and other errands.",
          tasks: ["Grocery shopping", "Picking up dry cleaning", "Running errands"],
          image: "/lovable-uploads/22222222-cccc-4444-dddd-444444444444.png",
        },
        {
          title: "Cleaning & Organization",
          description: "Get your home sparkling clean and organized with the help of reliable students.",
          tasks: ["House cleaning", "Organizing closets", "Decluttering spaces"],
          image: "/lovable-uploads/33333333-dddd-4444-eeee-555555555555.png",
        },
      ],
    },
    {
      title: "Academic Support",
      description: "Connect with knowledgeable students for tutoring, essay help, and more.",
      icon: Search,
      color: "bg-soft-pink",
      sections: [
        {
          title: "Tutoring & Homework Help",
          description: "Get personalized tutoring and homework help in a variety of subjects.",
          tasks: ["Math tutoring", "Science tutoring", "Essay editing"],
          image: "/lovable-uploads/44444444-eeee-4444-ffff-666666666666.png",
        },
        {
          title: "Research & Writing",
          description: "Need help with research papers, essays, or presentations?",
          tasks: ["Research assistance", "Essay writing", "Presentation design"],
          image: "/lovable-uploads/55555555-ffff-4444-aaaa-777777777777.png",
        },
      ],
    },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStep((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    
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
    
    const element = document.getElementById('features-section');
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
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-soft-blue rounded-full blur-3xl opacity-20 -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-soft-pink rounded-full blur-3xl opacity-20 translate-x-1/3" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            How <span className="bg-gradient-to-r from-assist-blue via-blue-500 to-blue-400 bg-clip-text text-transparent">Assist</span> Works
          </h2>
          <p className="text-xl text-gray-600">
            We've made it effortless to get the help you need—quickly, safely, and on your terms
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center mb-24">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-12 w-full">
            {[0, 1, 2].map(step => (
              <div 
                key={step} 
                className={`relative flex flex-col items-center ${
                  step === animatedStep ? 'opacity-100 scale-105' : 'opacity-80 scale-100'
                } transition-all duration-500 w-full md:w-1/3 max-w-sm`}
              >
                <div className={`
                  w-full h-56 mb-6 rounded-2xl flex items-center justify-center shadow-soft relative overflow-hidden
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
                  <div className="flex flex-col items-center">
                    <div className="mb-4 flex items-center justify-center">
                      {step === 0 ? (
                        <div className="p-3 rounded-full bg-orange-100">
                          <PenLine size={28} className="text-orange-500" />
                        </div>
                      ) : step === 1 ? (
                        <div className="p-3 rounded-full bg-blue-100">
                          <GraduationCap size={28} className="text-blue-500" />
                        </div>
                      ) : (
                        <div className="p-3 rounded-full bg-green-100">
                          <Check size={28} className="text-green-500" />
                        </div>
                      )}
                    </div>
                    <span className="text-4xl font-bold mb-3">
                      {step + 1}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">
                      {step === 0 ? 'Browse or Post Your Task' : 
                       step === 1 ? 'Get Matched Instantly' : 
                       'Task Completed, Stress-Free'}
                    </h3>
                    <p className="text-center px-6 text-gray-600">
                      {step === 0 ? 'Describe what you need help with, set your budget, and choose a time that works for you.' : 
                       step === 1 ? 'We connect you with vetted college students who are ready to assist, ensuring reliable and secure service.' : 
                       'Your Assist Expert completes the task to your satisfaction, and payment is handled securely through the platform.'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-8">
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
          <Button 
            size="lg" 
            className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white px-8 py-6 h-14 text-base font-medium shadow-soft hover:translate-y-[-2px] transition-all"
          >
            Get Started
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index}
              className={`glass-card p-6 rounded-2xl shadow-soft transition-all duration-300 hover:scale-102 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feature.color} text-white`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              
              <div className="space-y-3">
                {feature.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">{section.title}</h4>
                    <p className="text-gray-500 text-sm mb-2">{section.description}</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {section.tasks.map((task, taskIndex) => (
                        <li key={taskIndex}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
