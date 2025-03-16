
import { Button } from "@/components/ui/button";
import { Apple, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CircleBlocks from "@/components/background/CircleBlocks";
import { Link } from "react-router-dom";

const StudentApp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CircleBlocks />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-16">
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Download the Assist Student App
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Start earning money by helping others with tasks. Our student app connects college students with people who need your help.
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
                
                <p className="text-sm text-gray-500">
                  Need help with tasks instead? <Link to="/customer-app" className="text-assist-blue font-medium">Download our customer app</Link>.
                </p>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-[3rem] blur-2xl transform -rotate-6"></div>
                <img 
                  src="/lovable-uploads/a7543c7b-5d9f-4ac2-b243-49bfc5b8d199.png" 
                  alt="Assist Student App on smartphone" 
                  className="relative z-10 w-full max-w-xs mx-auto"
                />
              </div>
            </div>
          </div>
          
          <div className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why join as a student?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Income</h3>
                <p className="text-gray-600">Choose when and where you work. Earn money on your own schedule between classes.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gain Experience</h3>
                <p className="text-gray-600">Build real-world skills and references that will help with your future career.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Build Connections</h3>
                <p className="text-gray-600">Network with people in your community and create valuable connections.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentApp;
