
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "./MobileLayout";
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
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  ArrowRight, 
  LogIn, 
  UserPlus 
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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
      navigate("/mobile");
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
      navigate("/mobile");
    }, 1500);
  };

  return (
    <MobileLayout
      showBackButton={true}
      onBack={() => navigate("/mobile")}
      showLogo={true}
      showHeader={true}
      title=""
      contentClassName="flex flex-col justify-start items-center"
    >
      <div className="w-full max-w-md px-4 pt-6 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Assist</h1>
          <p className="text-gray-600">Sign in or create an account to continue</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login" className="text-base py-3">
              <LogIn size={18} className="mr-2" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-base py-3">
              <UserPlus size={18} className="mr-2" />
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Email</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="your@email.com" 
                            type="email" 
                            className="pl-10" 
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
                      <FormLabel className="text-base">Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="••••••••" 
                            type={showPassword ? "text" : "password"} 
                            className="pl-10 pr-10" 
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
                      <div className="text-right mt-2">
                        <button
                          type="button"
                          className="text-sm text-assist-blue font-medium"
                          onClick={() => navigate("/mobile/forgot-password")}
                        >
                          Forgot password?
                        </button>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-assist-blue hover:bg-assist-blue/90 text-lg py-6 h-14"
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
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Full Name</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="pl-10" 
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
                      <FormLabel className="text-base">Email</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="your@email.com" 
                            type="email" 
                            className="pl-10" 
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
                      <FormLabel className="text-base">Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="••••••••" 
                            type={showPassword ? "text" : "password"} 
                            className="pl-10 pr-10" 
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
                  className="w-full bg-assist-blue hover:bg-assist-blue/90 text-lg py-6 h-14"
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
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 text-center text-gray-500 text-sm">
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
    </MobileLayout>
  );
};

export default MobileSignIn;
