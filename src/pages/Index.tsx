
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Grid } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Benefits from "@/components/home/Benefits";
import TaskCategories from "@/components/home/TaskCategories";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import CircleBlocks from "@/components/background/CircleBlocks";
import TrustedCompanies from "@/components/home/TrustedCompanies";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {});
      });
    };
  }, []);

  const handleBrowseAllTasks = () => {
    navigate("/main-menu", { state: { activeTab: "allTasks" } });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <CircleBlocks />
      
      <Navbar />
      
      <main className="flex-grow relative z-10 pt-16">
        <Hero />
        <div className="mt-4">
          <Features />
          <TrustedCompanies />
          <Benefits />
          
          <section className="py-10 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by Category</h2>
                <Button 
                  variant="ghost" 
                  className="text-assist-blue hover:bg-assist-blue/10 group"
                  onClick={handleBrowseAllTasks}
                >
                  <span>View All Categories</span>
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {["Cleaning", "Transportation & Moving", "Assembly", "Academic Help", 
                  "Digital Services", "Fitness & Wellness", "Event Planning", "Special Tasks"].map((category, index) => (
                  <div 
                    key={index} 
                    className="bg-assist-gray/10 hover:bg-assist-blue/5 rounded-xl p-4 text-center cursor-pointer transition-all"
                    onClick={handleBrowseAllTasks}
                  >
                    <div className="h-12 w-12 bg-assist-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Grid className="h-6 w-6 text-assist-blue" />
                    </div>
                    <h3 className="font-medium text-gray-900">{category}</h3>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button 
                  size="lg" 
                  className="rounded-full bg-assist-blue hover:bg-assist-blue/90 text-white"
                  onClick={handleBrowseAllTasks}
                >
                  Browse All Tasks
                </Button>
              </div>
            </div>
          </section>
          
          <TaskCategories />
          <Testimonials />
          <CTASection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
