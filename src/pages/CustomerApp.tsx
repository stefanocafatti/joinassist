
import { Button } from "@/components/ui/button";
import { Apple, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CircleBlocks from "@/components/background/CircleBlocks";
import { Link } from "react-router-dom";

const CustomerApp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CircleBlocks />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-16">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Download the Assist App
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get help with any task, big or small. Our app connects you with verified college students ready to assist you.
              </p>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-xl bg-black text-white hover:bg-black/90 h-16">
                    <Apple className="h-6 w-6 mr-2" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs">Download on the</span>
                      <span className="text-base font-semibold">App Store</span>
                    </div>
                  </Button>
                  
                  <Button size="lg" className="rounded-xl bg-black text-white hover:bg-black/90 h-16">
                    <ShoppingBag className="h-6 w-6 mr-2" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs">GET IT ON</span>
                      <span className="text-base font-semibold">Google Play</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-2xl transform rotate-6"></div>
                <img 
                  src="/lovable-uploads/bd897653-6f63-4864-8ffa-5b7838340cd4.png" 
                  alt="Assist App on smartphone" 
                  className="relative z-10 w-full max-w-xs mx-auto"
                />
              </div>
            </div>
          </div>
          
          <div className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why download our app?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast & Convenient</h3>
                <p className="text-gray-600">Book tasks in minutes and get matched with nearby college students ready to help.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Vetted Assisters</h3>
                <p className="text-gray-600">Every student on our platform is verified and rated, ensuring quality service every time.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-600">Only pay when the job is done to your satisfaction with our secure payment system.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerApp;
