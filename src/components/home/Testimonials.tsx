
import { useState } from "react";
import { Quote } from "lucide-react";
import ImageSlideshow from "@/components/ui/ImageSlideshow";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  isStudent: boolean;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Candice Mac-Niven",
      role: "Busy Mother",
      image: "/lovable-uploads/24e7536d-2902-47be-a1d2-a4127842e7e3.png",
      quote: "Assist has been a lifesaver for my hectic schedule. The students are dependable, professional, and always get the job done right. I've saved so much time on errands and household tasks—highly recommend!",
      isStudent: false
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "UCLA Student",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "Working through Assist has allowed me to earn extra income while keeping up with my classes. The flexible schedule means I can pick up tasks when it works for me, and I've gained real-world experience that looks great on my resume.",
      isStudent: true
    },
    {
      id: 3,
      name: "Dalen Michaels",
      role: "Owner of Outheback",
      image: "/lovable-uploads/d1b15791-b459-4052-8e28-1eda7754fd1b.png",
      quote: "As a business owner, finding reliable help without hiring full-time staff can be challenging. This app has been a lifesaver, connecting me with skilled students for everything from social media support to event setup. Highly recommend!",
      isStudent: false
    },
    {
      id: 4,
      name: "Ian Noble",
      role: "Columbia Student Athlete",
      image: "/lovable-uploads/3b73310a-09b9-402c-a1c5-a7a4d0551cb8.png",
      quote: "Assist has been incredibly helpful, and I love having full control over my schedule. I've been able to pay my rent and build valuable skills through the various tasks I complete. It's the perfect side gig for students.",
      isStudent: true
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Convert testimonials to slideshow format
  const testimonialSlides = testimonials.map(testimonial => ({
    src: testimonial.image,
    alt: `Portrait of ${testimonial.name}`,
    content: testimonial
  }));
  
  return (
    <section id="testimonials" className="py-20 mt-0 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-1 py-1 px-4 rounded-full bg-assist-blue/10 text-assist-blue text-sm font-medium mb-4">
                Success Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Our Community Loves Us
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                See how Assist connects busy individuals with reliable student talent, making everyday tasks easier while providing valuable opportunities for students.
              </p>
              
              {/* Removed navigation buttons as they're now in the slideshow component */}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-[400px] w-full md:w-[500px] mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                    index === activeIndex 
                      ? "opacity-100 translate-x-0 scale-100 z-20" 
                      : "opacity-0 scale-95 z-10"
                  }`}
                >
                  <div className={`rounded-2xl shadow-elevation p-8 relative overflow-hidden ${
                    testimonial.isStudent 
                      ? "bg-assist-blue text-white" 
                      : "bg-white text-gray-900"
                  }`}>
                    <div className={`absolute top-6 right-6 ${
                      testimonial.isStudent 
                        ? "text-white/30" 
                        : "text-assist-blue/20"
                    }`}>
                      <Quote size={48} />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                          <p className={`${
                            testimonial.isStudent 
                              ? "text-blue-100" 
                              : "text-gray-600"
                          }`}>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      
                      <blockquote className={`text-lg font-medium ${
                        testimonial.isStudent 
                          ? "text-white/90" 
                          : "text-gray-700"
                      }`}>
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="mt-6 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className={`w-5 h-5 ${
                              testimonial.isStudent 
                                ? "text-white" 
                                : "text-yellow-400"
                            }`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex 
                      ? "bg-assist-blue w-8" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
