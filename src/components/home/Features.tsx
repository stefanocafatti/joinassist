
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

const Features = () => {
  const [activeSection, setActiveSection] = useState(0);
  
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
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-assist-blue/5 rounded-full opacity-70 -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-assist-gray/50 rounded-full opacity-80 translate-x-1/3" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Assist Works
          </h2>
          <p className="text-lg text-gray-600">
            Assist connects people with tasks to students who can help, creating value for both sides of the marketplace.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
          <div className="flex-1 max-w-md mx-auto md:mx-0">
            <div className="relative bg-white rounded-2xl shadow-card p-6 h-full">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-assist-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Post Your Task</h3>
                <p className="text-gray-600">
                  Describe what you need help with, set your budget, and choose when you'd like the task completed.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-auto md:mx-0 md:mt-8">
            <div className="relative bg-white rounded-2xl shadow-card p-6 h-full">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-assist-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Get Matched</h3>
                <p className="text-gray-600">
                  Our platform connects you with verified students who have the skills and availability to help.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-auto md:mx-0">
            <div className="relative bg-white rounded-2xl shadow-card p-6 h-full">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-assist-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Task Completed</h3>
                <p className="text-gray-600">
                  Your student helper completes the task, and you only pay when you're completely satisfied.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 space-y-8">
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
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
                
                <h3 className="text-2xl font-bold">
                  {features[activeSection].title}
                </h3>
                <p className="text-gray-600">
                  {features[activeSection].description}
                </p>
              </div>
              
              <div className="space-y-6">
                {features[activeSection].items.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-4 hover-scale rounded-xl transition-all bg-white shadow-card"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-assist-blue/10 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative">
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-assist-blue/20 to-assist-blue/5 rounded-3xl transition-opacity duration-500 ${activeSection === 0 ? 'opacity-100' : 'opacity-0'}`} 
              />
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-green-100/40 to-blue-50/30 rounded-3xl transition-opacity duration-500 ${activeSection === 1 ? 'opacity-100' : 'opacity-0'}`} 
              />
              
              <div className="relative rounded-3xl overflow-hidden shadow-elevation p-8">
                <div className={`transition-opacity duration-500 ${activeSection === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                    alt="Students working together" 
                    className="w-full h-auto rounded-2xl shadow-card"
                  />
                  
                  <div className="absolute bottom-16 -right-4 glassmorphism p-4 rounded-xl shadow-elevation max-w-xs animate-float">
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
                
                <div className={`absolute inset-0 transition-opacity duration-500 p-8 ${activeSection === 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Professional collaboration" 
                    className="w-full h-auto rounded-2xl shadow-card"
                  />
                  
                  <div className="absolute top-16 -left-4 glassmorphism p-4 rounded-xl shadow-elevation max-w-xs animate-float" style={{ animationDelay: "0.5s" }}>
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
