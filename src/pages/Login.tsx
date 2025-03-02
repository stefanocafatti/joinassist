
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/ui/Logo";
import CircleBlocks from "@/components/background/CircleBlocks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process with a timeout
    setTimeout(() => {
      setIsLoading(false);
      
      if (email && password) {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully!",
          variant: "default",
        });
        
        // Save user info to localStorage if remember me is checked
        if (rememberMe) {
          localStorage.setItem("userEmail", email);
        }
        
        // Navigate to main menu after successful login
        navigate("/main-menu");
      } else {
        toast({
          title: "Login failed",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      <CircleBlocks />
      
      <div className="flex justify-center pt-8 pb-6 relative z-10">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-md space-y-8 border border-gray-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="mt-2 text-gray-600">
              Log in to your account to continue
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-base">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-assist-blue hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-assist-blue hover:bg-assist-blue/90 text-lg py-6 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-assist-blue hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center py-4 text-sm text-gray-500 relative z-10">
        &copy; {new Date().getFullYear()} Assist. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
