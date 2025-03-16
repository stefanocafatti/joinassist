import { useState, useEffect } from "react";
import { CheckCircle2, DollarSign, Heart, Clock, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Benefits = () => {
  const benefitsData = {
    requesters: {
      icon: CheckCircle2,
      color: "bg-soft-green text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-600/90",
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
      cta: "Book a Task"
    }
  };

  const handleGetApp = () => {
    window.location.href = "https://www.apple.com/app-store/";
  };

  return (
    <section id="benefits" className="py-16 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-soft-blue rounded-full blur-3xl opacity-20 -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-soft-pink rounded-full blur-3xl opacity-20 translate-x-1/3" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-assist-blue to-blue-400 bg-clip-text text-transparent">Assist</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Our platform creates opportunities for students while solving everyday challenges for busy people
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md overflow-hidden transition-all duration-300">
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {benefitsData.requesters.benefits.map((benefit, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                >
                  <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${benefitsData.requesters.color}`}>
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
                className={`rounded-full ${benefitsData.requesters.buttonColor} text-white px-8 py-6 h-14 text-base font-medium shadow-sm hover:translate-y-[-2px] transition-all`}
                onClick={handleGetApp}
              >
                {benefitsData.requesters.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
