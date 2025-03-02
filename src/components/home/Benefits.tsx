
import { useState } from "react";
import { CheckCircle2, GraduationCap, DollarSign, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Benefits = () => {
  const [activeView, setActiveView] = useState<"students" | "requesters">("students");

  const benefitsData = {
    students: {
      icon: GraduationCap,
      color: "bg-soft-blue text-assist-blue",
      buttonColor: "bg-assist-blue hover:bg-assist-blue/90",
      title: "For Students",
      benefits: [
        {
          icon: Clock,
          title: "Flexible Schedule",
          description: "Take on tasks when it fits your schedule, perfect for balancing with classes."
        },
        {
          icon: DollarSign,
          title: "Earn Extra Income",
          description: "Put your skills to work and earn money to help cover expenses while studying."
        },
        {
          icon: Heart,
          title: "Build Valuable Experience",
          description: "Gain real-world experience and build your resume while still in school."
        }
      ],
      cta: "Sign Up as a Student"
    },
    requesters: {
      icon: CheckCircle2,
      color: "bg-soft-green text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-600/90",
      title: "For Task Requesters",
      benefits: [
        {
          icon: Clock,
          title: "Save Valuable Time",
          description: "Delegate tasks and focus on what matters most to you."
        },
        {
          icon: CheckCircle2,
          title: "Get Expert Help",
          description: "Access a diverse pool of student talent with varied skills and knowledge."
        },
        {
          icon: Heart,
          title: "Reduce Stress",
          description: "Eliminate the hassle of juggling too many responsibilities."
        }
      ],
      cta: "Post Your First Task"
    }
  };

  const currentData = benefitsData[activeView];

  return (
    <section id="benefits" className="pb-24 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Benefits of <span className="bg-gradient-to-r from-assist-blue to-blue-400 bg-clip-text text-transparent">Assist</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Our platform creates opportunities for students while solving everyday challenges for busy people
          </p>
          
          {/* Toggle switch */}
          <div className="inline-flex bg-gray-100 p-1.5 rounded-full shadow-sm mb-10">
            <button
              onClick={() => setActiveView("students")}
              className={cn(
                "py-2.5 px-6 rounded-full text-sm font-medium transition-all duration-200",
                activeView === "students"
                  ? "bg-assist-blue text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-2">
                <GraduationCap size={18} />
                <span>For Students</span>
              </div>
            </button>
            <button
              onClick={() => setActiveView("requesters")}
              className={cn(
                "py-2.5 px-6 rounded-full text-sm font-medium transition-all duration-200",
                activeView === "requesters"
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span>For Task Requesters</span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md overflow-hidden transition-all duration-300">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-10">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${currentData.color}`}>
                <currentData.icon size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{currentData.title}</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {currentData.benefits.map((benefit, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                >
                  <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${currentData.color}`}>
                    <benefit.icon size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button 
                size="lg"
                className={`rounded-full ${currentData.buttonColor} text-white px-8 py-6 h-14 text-base font-medium shadow-sm hover:translate-y-[-2px] transition-all`}
              >
                {currentData.cta}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students and task requesters already using Assist
          </p>
          <Button 
            size="lg" 
            className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white px-10 py-6 h-14 text-lg font-medium shadow-sm hover:translate-y-[-2px] transition-all"
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
