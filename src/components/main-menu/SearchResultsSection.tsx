
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, X, Plus, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchResultsSectionProps {
  searchQuery: string;
  searchResults: {
    title: string;
    description: string;
    category: string;
    location: string;
    image: string;
  }[];
  favoriteTaskIds: string[];
  onFavoriteToggle: (taskTitle: string) => void;
  onBookNow: (taskTitle: string) => void;
  onClearResults: () => void;
  onRequestTask: () => void;
  onBrowseTasks?: () => void;
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  searchQuery,
  searchResults,
  favoriteTaskIds,
  onFavoriteToggle,
  onBookNow,
  onClearResults,
  onRequestTask,
  onBrowseTasks
}) => {
  // Helper function to highlight matching text in search results
  const highlightMatchingText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    // Split query into words for better matching
    const queryWords = query.trim().toLowerCase().split(/\s+/);
    
    // Create regex pattern that matches any of the words
    const pattern = queryWords.map(word => `(${word})`).join('|');
    const regex = new RegExp(pattern, 'gi');
    
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => {
          // Check if this part matches any of our query words
          const isMatch = queryWords.some(word => 
            part.toLowerCase() === word
          );
          
          return isMatch ? 
            <span key={i} className="bg-yellow-100 text-yellow-800 px-1 rounded">{part}</span> : 
            part;
        })}
      </>
    );
  };

  // Additional popular tasks to show when no results are found
  const popularTasks = [
    {
      title: "Clean my apartment",
      description: "Professional cleaning services by verified students",
      category: "Cleaning",
      location: "Campus Area",
      image: "/lovable-uploads/84373410-0ca0-44aa-bce4-fecda1465ffb.png"
    },
    {
      title: "Build my IKEA desk",
      description: "Expert furniture assembly by skilled students",
      category: "Furniture Assembly",
      location: "Various Locations",
      image: "/lovable-uploads/e7eb2a95-9b98-41ac-ae57-c3c88485715c.png"
    },
    {
      title: "Help me move",
      description: "Get assistance with your move from strong student helpers",
      category: "Help Moving",
      location: "Campus Area",
      image: "/lovable-uploads/049d1420-586e-4794-b6e1-5c14cfeb328e.png"
    },
    {
      title: "Language tutoring",
      description: "Learn a new language from native-speaking students",
      category: "Academic Tutoring",
      location: "Online or In-person",
      image: "/lovable-uploads/603a2dee-f790-49b1-aade-54b5318f754a.png"
    },
    {
      title: "Proofreading",
      description: "Get your essays and papers proofread by English majors",
      category: "Academic Tutoring",
      location: "Online",
      image: "/lovable-uploads/603a2dee-f790-49b1-aade-54b5318f754a.png"
    },
    {
      title: "Grocery shopping",
      description: "Student runners for your grocery shopping needs",
      category: "Errands",
      location: "Local Area",
      image: "/lovable-uploads/b1aee96b-9a26-4fd9-9872-57f40cbe16d7.png"
    },
    {
      title: "Wash my car",
      description: "Get your car washed and detailed by students",
      category: "Cleaning",
      location: "Campus Area",
      image: "/lovable-uploads/c9d970a2-7da1-4c02-997f-aa30ef2e5bba.png"
    },
    {
      title: "Make my bed and change sheets",
      description: "Need help changing my bed sheets and making my bed nicely",
      category: "Home Services",
      location: "Dorms & Apartments",
      image: "/lovable-uploads/bd95bdf7-c140-465b-8e12-3a21d5d46a94.png"
    },
    {
      title: "Organize my closet",
      description: "Help organizing your clothes and storage spaces",
      category: "Home Services",
      location: "Dorms & Apartments",
      image: "/lovable-uploads/049d1420-586e-4794-b6e1-5c14cfeb328e.png"
    },
    {
      title: "Tech support",
      description: "Troubleshooting and tech setup by IT students",
      category: "Tech",
      location: "Campus Area",
      image: "/lovable-uploads/bab65021-5d30-4495-bcd8-b77a329626c7.png"
    },
    {
      title: "Website building",
      description: "Basic website creation by CS students",
      category: "Tech",
      location: "Online",
      image: "/lovable-uploads/bab65021-5d30-4495-bcd8-b77a329626c7.png"
    },
    {
      title: "Assemble bookshelf",
      description: "Need help putting together a bookcase",
      category: "Furniture Assembly",
      location: "Various Locations",
      image: "/lovable-uploads/e7eb2a95-9b98-41ac-ae57-c3c88485715c.png"
    },
    {
      title: "Dog walking",
      description: "Student pet sitters to walk and care for your dog",
      category: "Pet Sitting",
      location: "Campus Area",
      image: "/lovable-uploads/33ac30a4-4b4d-47a9-89a9-63711ff5e3fd.png"
    },
    {
      title: "Meal prep for the week",
      description: "Student chefs prepare weekly meals for you",
      category: "Cooking",
      location: "Various Locations",
      image: "/lovable-uploads/b1aee96b-9a26-4fd9-9872-57f40cbe16d7.png"
    },
    {
      title: "TV mounting",
      description: "Professional TV mounting by skilled students",
      category: "TV Mounting",
      location: "Dorms & Apartments",
      image: "/lovable-uploads/eb78ee8e-c334-4102-b507-3e323c2fc98c.png"
    },
    {
      title: "Dorm room setup",
      description: "Help setting up your dorm room efficiently",
      category: "Moving",
      location: "Campus Housing",
      image: "/lovable-uploads/049d1420-586e-4794-b6e1-5c14cfeb328e.png"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Results for "{searchQuery}"
          </h2>
          <button
            onClick={onClearResults}
            className="ml-3 text-gray-400 hover:text-gray-600"
            aria-label="Clear search results"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((task) => (
            <div
              key={task.title}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => onBookNow(task.title)}
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={task.image}
                  alt={task.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">
                    {highlightMatchingText(task.title, searchQuery)}
                  </h3>
                  <Badge variant="secondary" className="bg-soft-blue/20 text-blue-700 border-0 ml-2">
                    {task.category}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <button
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavoriteToggle(task.title);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={
                        favoriteTaskIds.includes(task.title)
                          ? "currentColor"
                          : "none"
                      }
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                  <Button 
                    size="sm" 
                    className="bg-assist-blue hover:bg-assist-blue/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookNow(task.title);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View Task
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-500 mb-2">
              We couldn't find any tasks matching "{searchQuery}"
            </p>
            <Button
              variant="default"
              className="bg-assist-blue hover:bg-assist-blue/90 mx-auto mt-2"
              onClick={onRequestTask}
            >
              <Plus className="h-4 w-4 mr-2" />
              Request Custom Task
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Popular Tasks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTasks.map((task) => (
                <div
                  key={task.title}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => onBookNow(task.title)}
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">
                        {task.title}
                      </h3>
                      <Badge variant="secondary" className="bg-soft-blue/20 text-blue-700 border-0 ml-2">
                        {task.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {task.description}
                    </p>
                    <div className="flex justify-end mt-3">
                      <Button 
                        size="sm" 
                        className="bg-assist-blue hover:bg-assist-blue/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookNow(task.title);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View Task
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsSection;
