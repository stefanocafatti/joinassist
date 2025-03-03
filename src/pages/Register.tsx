
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";
import CircleBlocks from "@/components/background/CircleBlocks";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isStudentRegistration, setIsStudentRegistration] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for isStudent in location state when component mounts
  useEffect(() => {
    if (location.state?.isStudent) {
      setIsStudentRegistration(true);
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStudentEmail = (email: string) => {
    // Common education email domains
    const educationDomains = [
      '.edu',
      '.ac.uk',
      '.edu.au',
      '.ac.nz',
      '.edu.sg',
      '.school.',
      '.k12.',
      '.sch.'
    ];
    
    return educationDomains.some(domain => email.toLowerCase().includes(domain));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    // Check for student email if student registration
    if (isStudentRegistration && !validateStudentEmail(formData.email)) {
      toast.error("Please use a valid educational email address");
      setIsLoading(false);
      return;
    }

    try {
      // Here you would typically handle registration with a backend service
      console.log("Registration data:", formData, "Student account:", isStudentRegistration);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store a user session in localStorage with the isStudent flag
      const userSession = {
        id: `user-${Date.now()}`,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        isStudent: isStudentRegistration,
      };
      
      localStorage.setItem("userSession", JSON.stringify(userSession));
      
      if (isStudentRegistration) {
        toast.success("Student account created successfully!");
        navigate("/student-dashboard");
      } else {
        toast.success("Account created successfully!");  
        navigate("/main-menu");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentRegistration = () => {
    setIsStudentRegistration(true);
  };

  const handleGoBack = () => {
    setIsStudentRegistration(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      <CircleBlocks />
      
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Link to="/" className="inline-block">
              <Logo />
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {isStudentRegistration ? "Join as a Student" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-assist-blue hover:text-assist-blue/80"
              >
                Sign in
              </Link>
            </p>
          </div>
          
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <div className="mt-1">
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <div className="mt-1">
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {isStudentRegistration && (
                    <p className="mt-1 text-sm text-gray-500">
                      Please use your educational email address (.edu, school domains, etc.)
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-assist-blue to-indigo-600 hover:from-assist-blue/90 hover:to-indigo-600/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : isStudentRegistration ? "Sign up as a student" : "Sign up"}
                </Button>
              </div>

              {isStudentRegistration ? (
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={handleGoBack}
                  >
                    Go back to normal sign up
                  </Button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or
                      </span>
                    </div>
                  </div>

                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-assist-blue text-assist-blue hover:bg-assist-blue/10"
                      onClick={handleStudentRegistration}
                    >
                      Join as a student
                    </Button>
                    <p className="text-xs text-center mt-2 text-gray-500">
                      Access additional student features and benefits
                    </p>
                  </div>
                </>
              )}
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    By creating an account, you agree to our
                  </span>
                </div>
              </div>
              
              <div className="mt-3 text-center text-xs text-gray-500">
                <Link to="/terms" className="underline">Terms of Service</Link>
                {" and "}
                <Link to="/privacy" className="underline">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
