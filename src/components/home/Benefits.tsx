import { useState } from "react";
import { CheckCircle2, GraduationCap, DollarSign, Heart, Clock, UserCheck } from "lucide-react";
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
          title: "Work on Your Schedule",
          description: "Choose tasks that fit your availability, making it easy to balance work and studies."
        },
        {
          icon: DollarSign,
          title: "Earn While You Learn",
          description: "Use your skills to complete tasks and earn extra income while in college."
        },
        {
          icon: Heart,
          title: "Gain Real-World Experience",
          description: "Build your resume and develop valuable skills by assisting with a variety of tasks."
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
          title: "Save Time & Get Things Done",
          description: "Delegate tasks and free up your schedule to focus on what matters."
        },
        {
          icon: UserCheck,
          title: "Access Vetted Student Talent",
          description: "Get matched with reliable, skilled students who can assist with various tasks."
        },
        {
          icon: Heart,
          title: "Stress-Free Assistance",
          description: "Let Assist handle the matching process so you can get help quickly and reliably."
        }
      ],
      cta: "Post Your First Task"
    }
  };

  const currentData = benefitsData[activeView];

  return (
    <section id="benefits" className="py-16 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-soft-blue rounded-full blur-3xl opacity-20 -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-soft-pink rounded-full blur-3xl opacity-20 translate-x-1/3" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Benefits of <span className="bg-gradient-to-r from-assist-blue to-blue-400 bg-clip-text text-transparent">Assist</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Our platform creates opportunities for students while solving everyday challenges for busy people
          </p>
          
          {/* Toggle switch */}
          <div className="inline-flex bg-gray-100 p-1.5 rounded-full shadow-sm mb-6">
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
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${currentData.color}`}>
                <currentData.icon size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{currentData.title}</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {currentData.benefits.map((benefit, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                >
                  <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${currentData.color}`}>
                    <benefit.icon size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                size="lg"
                className={`rounded-full ${currentData.buttonColor} text-white px-8 py-6 h-14 text-base font-medium shadow-sm hover:translate-y-[-2px] transition-all`}
              >
                {currentData.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
