
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageSlideProps {
  images: {
    src: string;
    alt: string;
  }[];
  autoplayInterval?: number;
  className?: string;
}

const ImageSlideshow = ({ 
  images, 
  autoplayInterval = 5000,
  className 
}: ImageSlideProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setImageLoaded(false);
    setPrevIndex(currentIndex);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 300);
  }, [images.length, currentIndex]);

  const goToPrevious = useCallback(() => {
    setIsTransitioning(true);
    setImageLoaded(false);
    setPrevIndex(currentIndex);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, 300);
  }, [images.length, currentIndex]);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go to next slide
      goToNext();
    }
    
    if (touchEnd - touchStart > 50) {
      // Swipe right, go to previous slide
      goToPrevious();
    }
  };

  // Preload all images
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, [images]);

  // Autoplay functionality
  useEffect(() => {
    const timerId = setInterval(goToNext, autoplayInterval);
    return () => clearInterval(timerId);
  }, [goToNext, autoplayInterval]);

  // Reset transition state when image changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Handle image load event
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className={cn("relative w-full h-full overflow-hidden rounded-2xl", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation buttons */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          goToPrevious();
        }}
        className="absolute left-3 top-1/2 z-20 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors text-assist-blue"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button 
        onClick={(e) => {
          e.preventDefault();
          goToNext();
        }}
        className="absolute right-3 top-1/2 z-20 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors text-assist-blue"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>
      
      {/* Image container */}
      <div className="relative w-full h-full">
        {/* Previous image (for transition) */}
        {isTransitioning && (
          <div
            className="absolute inset-0 w-full h-full z-5"
          >
            <img
              src={images[prevIndex].src}
              alt={images[prevIndex].alt}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Current image */}
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-300",
              currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              onLoad={handleImageLoad}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setPrevIndex(currentIndex);
              setCurrentIndex(index);
              setIsTransitioning(true);
            }}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              currentIndex === index
                ? "bg-assist-blue w-6"
                : "bg-white/70 hover:bg-white"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;
