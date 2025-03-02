
import { CheckCircle2, GraduationCap, DollarSign, Heart, Clock, Smile, Shield, House } from "lucide-react";
import { Button } from "@/components/ui/button";

const Benefits = () => {
  const studentBenefits = [
    {
      icon: GraduationCap,
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
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Our platform ensures secure payments and verified profiles for peace of mind."
    }
  ];

  const requesterBenefits = [
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
      icon: House,
      title: "Home Tasks Made Easy",
      description: "From repairs to cleaning, get help with all your household needs."
    },
    {
      icon: Smile,
      title: "Reduce Stress",
      description: "Eliminate the hassle of juggling too many responsibilities."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-soft-pink rounded-full blur-3xl opacity-20 translate-x-1/3" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-soft-green rounded-full blur-3xl opacity-20 -translate-x-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Benefits of <span className="bg-gradient-to-r from-assist-blue via-blue-500 to-blue-400 bg-clip-text text-transparent">Assist</span>
          </h2>
          <p className="text-xl text-gray-600">
            Our platform creates opportunities for students while solving everyday challenges for busy people
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* For Students Column */}
          <div className="bg-gradient-to-br from-white to-soft-blue/30 rounded-3xl p-8 shadow-soft glassmorphism">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-soft-blue text-assist-blue">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">For Students</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {studentBenefits.map((benefit, index) => (
                <div key={index} className="bg-white/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-soft-blue text-assist-blue">
                      <benefit.icon size={20} />
                    </div>
                    <h4 className="font-semibold text-lg text-gray-800">{benefit.title}</h4>
                  </div>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                size="lg"
                className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white px-8 py-6 h-14 text-base font-medium shadow-soft hover:translate-y-[-2px] transition-all"
              >
                Sign Up as a Student
              </Button>
            </div>
          </div>
          
          {/* For Task Requesters Column */}
          <div className="bg-gradient-to-br from-white to-soft-green/30 rounded-3xl p-8 shadow-soft glassmorphism">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-soft-green text-green-600">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">For Task Requesters</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {requesterBenefits.map((benefit, index) => (
                <div key={index} className="bg-white/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-soft-green text-green-600">
                      <benefit.icon size={20} />
                    </div>
                    <h4 className="font-semibold text-lg text-gray-800">{benefit.title}</h4>
                  </div>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                size="lg"
                className="rounded-full bg-green-600 hover:bg-green-600/90 text-white px-8 py-6 h-14 text-base font-medium shadow-soft hover:translate-y-[-2px] transition-all"
              >
                Post Your First Task
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students and task requesters already using Assist to simplify their lives
          </p>
          <Button 
            size="lg" 
            className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white px-10 py-6 h-14 text-lg font-medium shadow-soft hover:translate-y-[-2px] transition-all"
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
