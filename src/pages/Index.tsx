
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
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

  // Category emojis for the homepage
  const categories = [
    { name: "Cleaning", emoji: "🧹" },
    { name: "Transportation & Moving", emoji: "🚚" },
    { name: "Assembly", emoji: "🔧" },
    { name: "Academic Help", emoji: "📚" },
    { name: "Digital Services", emoji: "💻" },
    { name: "Fitness & Wellness", emoji: "💪" },
    { name: "Event Planning", emoji: "🎉" },
    { name: "Special Tasks", emoji: "⭐" }
  ];

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
                {categories.map((category, index) => (
                  <div 
                    key={index} 
                    className="bg-assist-gray/10 hover:bg-assist-blue/5 rounded-xl p-4 text-center cursor-pointer transition-all hover:shadow-md hover:-translate-y-1"
                    onClick={handleBrowseAllTasks}
                  >
                    <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <span className="text-2xl">{category.emoji}</span>
                    </div>
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
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
