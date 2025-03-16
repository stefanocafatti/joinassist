
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Logo from "../ui/Logo";

// Define validation schema for login form
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Define validation schema for signup form
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const MobileSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Check if navigating from loading screen
  const fromLoading = location.state?.fromLoading || false;
  
  // Handle fade-in animation
  useEffect(() => {
    // Small delay to ensure transition works
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Initialize login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Initialize signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Handle login submission
  const onLoginSubmit = (values: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully logged in!");
      
      // Store some user data in localStorage (in a real app, you'd use a proper auth solution)
      localStorage.setItem("user", JSON.stringify({ email: values.email, loggedIn: true }));
      
      // Navigate to home page
      navigate("/mobile/home");
    }, 1500);
  };
  
  // Handle signup submission
  const onSignupSubmit = (values: SignupFormValues) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      
      // Store some user data in localStorage (in a real app, you'd use a proper auth solution)
      localStorage.setItem("user", JSON.stringify({ 
        name: values.name,
        email: values.email, 
        loggedIn: true 
      }));
      
      // Navigate to home page
      navigate("/mobile/home");
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-white overflow-hidden transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center justify-start pt-10 pb-6 px-6">
        <Logo className="mb-8" />
        
        <div className="w-full max-w-md">
          {!isSignUp ? (
            <>
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Email</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="your@email.com" 
                              type="email" 
                              className="pl-10 py-6 text-base" 
                              {...field} 
                            />
                          </FormControl>
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-base font-medium">Password</FormLabel>
                          <button
                            type="button"
                            className="text-sm text-assist-blue font-medium"
                            onClick={() => navigate("/mobile/forgot-password")}
                          >
                            Forgot?
                          </button>
                        </div>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="••••••••" 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10 pr-10 py-6 text-base" 
                              {...field} 
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <button 
                            type="button"
                            className="absolute right-3 top-3 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-assist-blue hover:bg-assist-blue/90 text-lg py-6 h-14 rounded-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="mr-2">Logging in</span>
                        <span className="animate-pulse">...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Login
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Don't have an account?</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full border-assist-blue text-assist-blue hover:bg-assist-blue/10 text-lg py-6 h-14 rounded-xl"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </Button>
              </div>
            </>
          ) : (
            <>
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Full Name</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              className="pl-10 py-6 text-base" 
                              {...field} 
                            />
                          </FormControl>
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Email</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="your@email.com" 
                              type="email" 
                              className="pl-10 py-6 text-base" 
                              {...field} 
                            />
                          </FormControl>
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="••••••••" 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10 pr-10 py-6 text-base" 
                              {...field} 
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <button 
                            type="button"
                            className="absolute right-3 top-3 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-assist-blue hover:bg-assist-blue/90 text-lg py-6 h-14 rounded-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="mr-2">Creating account</span>
                        <span className="animate-pulse">...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Create Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Already have an account?</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full border-assist-blue text-assist-blue hover:bg-assist-blue/10 text-lg py-6 h-14 rounded-xl"
                  onClick={() => setIsSignUp(false)}
                >
                  Login
                </Button>
              </div>
            </>
          )}
          
          <div className="mt-10 text-center text-gray-500 text-sm">
            By continuing, you agree to our{" "}
            <button 
              className="text-assist-blue font-medium"
              onClick={() => navigate("/mobile/terms")}
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button 
              className="text-assist-blue font-medium"
              onClick={() => navigate("/mobile/privacy")}
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSignIn;
