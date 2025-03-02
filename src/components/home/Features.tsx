
import { useState, useEffect } from "react";
import { 
  Clock, 
  Briefcase, 
  UserCheck, 
  Shield, 
  CreditCard, 
  Calendar, 
  CheckCircle2 
} from "lucide-react";
import ImageSlideshow from "../ui/ImageSlideshow";

const Features = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [animatedStep, setAnimatedStep] = useState(0);
  
  const features = [
    {
      id: "students",
      title: "For Students",
      description: "Earn, develop real-world skills, and gain hands-on experience — all while maintaining your own schedule.",
      items: [
        {
          icon: <Clock className="text-assist-blue" />,
          title: "Flexible Income",
          description: "Earn money on your own schedule without committing to rigid work hours."
        },
        {
          icon: <Briefcase className="text-assist-blue" />,
          title: "Real-World Experience",
          description: "Gain hands-on experience in various fields, from logistics to personal assistance."
        },
        {
          icon: <Calendar className="text-assist-blue" />,
          title: "Work Around Your Schedule",
          description: "Accept tasks between classes or on weekends without disrupting your academic life."
        }
      ]
    },
    {
      id: "everyone",
      title: "For Everyone",
      description: "Save time, get things done, and access trusted student talent — all while ensuring a smooth experience.",
      items: [
        {
          icon: <UserCheck className="text-assist-blue" />,
          title: "Reliable, Vetted Talent",
          description: "Work only with students who are verified and highly-rated for quality assurance."
        },
        {
          icon: <Shield className="text-assist-blue" />,
          title: "Safety & Security First",
          description: "All students are carefully vetted, providing confidence in work quality and safety."
        },
        {
          icon: <CreditCard className="text-assist-blue" />,
          title: "Transparent Pricing",
          description: "Know exactly what you'll pay upfront with no hidden fees or surprises."
        }
      ]
    }
  ];

  // Animation for steps
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStep((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Autoplay for tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const stepImages = [
    [
      {
        src: "https://images.unsplash.com/photo-1616587226157-48e49175ee20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        alt: "Person posting a task on a mobile phone"
      }
    ],
    [
      {
        src: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        alt: "Student matched with a task"
      }
    ],
    [
      {
        src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        alt: "Task being completed"
      }
    ]
  ];
  
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-soft-blue rounded-full blur-3xl opacity-20 -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-soft-pink rounded-full blur-3xl opacity-20 translate-x-1/3" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-soft-blue mb-4 text-assist-blue text-sm font-medium animate-fade-in">
            <span className="inline-block w-2 h-2 rounded-full bg-assist-blue animate-pulse"></span>
            <span>Simple & Intuitive</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How <span className="bg-gradient-to-r from-assist-blue via-blue-500 to-blue-400 bg-clip-text text-transparent">Assist</span> Works
          </h2>
          <p className="text-lg text-gray-600">
            Assist connects people with tasks to students who can help, creating value for both sides of the marketplace.
          </p>
        </div>
        
        {/* New animated steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="relative z-10">
              <div className="flex items-center justify-start space-x-6 mb-10">
                {[0, 1, 2].map(step => (
                  <button 
                    key={step}
                    onClick={() => setAnimatedStep(step)}
                    className={`relative ${animatedStep === step ? '' : 'opacity-40'} transition-all duration-500`}
                  >
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg
                      transition-all duration-500 transform
                      ${animatedStep === step ? 'bg-assist-blue text-white scale-110' : 'bg-white text-assist-blue'}
                    `}>
                      {step + 1}
                    </div>
                    {step < 2 && (
                      <div className={`absolute top-1/2 left-full w-8 h-0.5 ${animatedStep > step ? 'bg-assist-blue' : 'bg-gray-200'} transition-all duration-300`} />
                    )}
                  </button>
                ))}
              </div>
            
              <div className="relative min-h-[14rem]">
                {[
                  {
                    title: "Post Your Task",
                    icon: "📝",
                    description: "Describe what you need help with, set your budget, and choose when you'd like the task completed."
                  },
                  {
                    title: "Get Matched",
                    icon: "🤝",
                    description: "Our platform connects you with verified students who have the skills and availability to help."
                  },
                  {
                    title: "Task Completed",
                    icon: "✅",
                    description: "Your student helper completes the task, and you only pay when you're completely satisfied."
                  }
                ].map((step, index) => (
                  <div 
                    key={index}
                    className={`
                      absolute top-0 left-0 w-full transition-all duration-500 transform
                      ${animatedStep === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-soft-blue w-12 h-12 rounded-xl flex items-center justify-center text-2xl">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glassmorphism p-6 rounded-xl">
              <h4 className="font-medium text-assist-blue mb-2">Why students love Assist</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-soft-green flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-green-600" />
                  </div>
                  <span>Flexible work that fits their schedule</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-soft-green flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-green-600" />
                  </div>
                  <span>Real-world experience for their resume</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-soft-green flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-green-600" />
                  </div>
                  <span>Income to help with expenses</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-soft-blue to-soft-pink rounded-3xl opacity-30 blur-xl" />
            <div className="relative h-full flex items-center">
              <div className="w-full rounded-2xl overflow-hidden shadow-elevation">
                <ImageSlideshow 
                  images={stepImages[animatedStep]} 
                  autoplayInterval={5000}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <div className="flex gap-3 mb-4">
                  {features.map((feature, index) => (
                    <button
                      key={feature.id}
                      onClick={() => setActiveSection(index)}
                      className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                        activeSection === index 
                          ? "bg-assist-blue text-white shadow-md" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {feature.title}
                    </button>
                  ))}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900">
                  {features[activeSection].title}
                </h3>
                <p className="text-gray-600">
                  {features[activeSection].description}
                </p>
              </div>
              
              <div className="space-y-4">
                {features[activeSection].items.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-6 rounded-xl transition-all glassmorphism hover-scale"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" 
                      style={{ 
                        background: activeSection === 0 ? 'var(--soft-blue, #D3E4FD)' : 'var(--soft-green, #F2FCE2)'
                      }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-soft-blue to-soft-pink rounded-3xl opacity-30 blur-xl" />
              
              <div className="relative rounded-3xl overflow-hidden shadow-elevation">
                <div className={`transition-all duration-700 transform ${activeSection === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute inset-0'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                    alt="Students working together" 
                    className="w-full h-auto rounded-2xl shadow-card"
                  />
                  
                  <div className="absolute bottom-8 right-8 glassmorphism p-4 rounded-xl shadow-elevation max-w-xs animate-float">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Income with Purpose</p>
                        <p className="text-sm text-gray-600">Earn while building skills that matter for your future career.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`transition-all duration-700 transform ${activeSection === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute inset-0'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Professional collaboration" 
                    className="w-full h-auto rounded-2xl shadow-card"
                  />
                  
                  <div className="absolute top-8 left-8 glassmorphism p-4 rounded-xl shadow-elevation max-w-xs animate-float" style={{ animationDelay: "0.5s" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-assist-blue flex-shrink-0 mt-1">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Tasks Done Right</p>
                        <p className="text-sm text-gray-600">Get matched with students who have the right skills for your tasks.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
