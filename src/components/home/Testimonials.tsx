
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

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
      name: "Sarah Johnson",
      role: "Busy Professional",
      image: "https://randomuser.me/api/portraits/women/15.jpg",
      quote: "Assist has been a game-changer for my busy schedule. The students are reliable, professional, and complete tasks exactly as needed. I've saved countless hours on cleaning and organization tasks.",
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
      name: "David Rodriguez",
      role: "Small Business Owner",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      quote: "As a small business owner, I need reliable help for various tasks without hiring full-time staff. Assist connects me with talented students who help with everything from social media to event setup. Highly recommend!",
      isStudent: false
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "NYU Student",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      quote: "The platform is incredibly user-friendly, and I love having full control over my schedule. I've been able to pay my rent and build valuable skills through the various tasks I complete. It's the perfect side gig for students.",
      isStudent: true
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  
  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-1 py-1 px-4 rounded-full bg-assist-blue/10 text-assist-blue text-sm font-medium mb-4">
                Success Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Hear From Our Community
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                From busy professionals to hardworking students, discover how Assist is creating value for everyone involved.
              </p>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-gray-100 hover:bg-assist-blue/10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="text-gray-700" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-gray-100 hover:bg-assist-blue/10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="text-gray-700" />
                </button>
              </div>
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
                      : "opacity-0 scale-95 z-10 " + 
                        (direction === 'right' 
                          ? "-translate-x-full" 
                          : direction === 'left' 
                            ? "translate-x-full" 
                            : ""
                        )
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
