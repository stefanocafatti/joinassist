
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  
  const handleCategoryClick = (categoryName: string) => {
    navigate("/main-menu", { state: { activeTab: "allTasks", selectedCategory: categoryName } });
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
          
          <TaskCategories onClick={handleCategoryClick} />
          <Testimonials />
          <CTASection onBrowseAllTasks={handleBrowseAllTasks} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
