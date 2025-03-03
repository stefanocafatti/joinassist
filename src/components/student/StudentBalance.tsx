import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Coins, ArrowUpRight, DollarSign, ArrowDown, CreditCard, Clock, Zap, Info, CheckCircle, HelpCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StudentBalanceProps {
  minimal?: boolean;
}

const StudentBalance: React.FC<StudentBalanceProps> = ({ minimal = false }) => {
  const balanceData = {
    current: 345.50,
    pending: 75.00,
    lifetime: 1270.80,
    monthlyGoal: 500,
    progress: 69,
    transactions: [
      { id: 1, date: "Mar 15, 2023", description: "Math Tutoring", amount: 45.00, type: "credit" },
      { id: 2, date: "Mar 05, 2023", description: "Withdrawal", amount: 120.00, type: "debit" },
      { id: 3, date: "Feb 28, 2023", description: "Dog Walking", amount: 25.00, type: "credit" },
      { id: 4, date: "Feb 20, 2023", description: "Essay Editing", amount: 35.00, type: "credit" },
    ]
  };

  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank");
  const [expeditedOption, setExpeditedOption] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  
  const withdrawalMethods = [
    { id: "bank", name: "Bank Account", processingTime: "1-3 business days", fee: "Free" },
    { id: "paypal", name: "PayPal", processingTime: "1-2 business days", fee: "Free" },
    { id: "venmo", name: "Venmo", processingTime: "1-2 business days", fee: "Free" },
    { id: "cash-app", name: "Cash App", processingTime: "1-2 business days", fee: "Free" },
  ];

  if (minimal) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              Current Balance
            </span>
            <span className="text-xl font-bold">${balanceData.current.toFixed(2)}</span>
          </CardTitle>
          <CardDescription>
            ${balanceData.pending.toFixed(2)} pending
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button variant="outline" size="sm" className="mt-2 w-full">
            View Details
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(withdrawalAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid withdrawal amount");
      return;
    }
    
    if (amount > balanceData.current) {
      toast.error("Withdrawal amount exceeds your current balance");
      return;
    }
    
    setProcessingStep(1);
    
    setTimeout(() => {
      setProcessingStep(2);
      
      setTimeout(() => {
        setProcessingStep(3);
        
        toast.success("Withdrawal request submitted successfully!");
      }, 1500);
    }, 1500);
  };

  const getSpeedyWithdrawalFee = () => {
    const amount = parseFloat(withdrawalAmount) || 0;
    return Math.max(0.99, amount * 0.01).toFixed(2);
  };
  
  const renderWithdrawalForm = () => {
    return (
      <form onSubmit={handleWithdrawalSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="withdrawal-amount">Amount to withdraw</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="smallIcon" className="rounded-full" type="button">
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">Withdrawal Information</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Withdrawal Information</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Minimum withdrawal: $10.00</li>
                        <li>• Processing time: 1-3 business days</li>
                        <li>• Expedited option: Available for 1% fee (min $0.99)</li>
                        <li>• Monthly limit: $1,000.00</li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="withdrawal-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="pl-10"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
              />
            </div>
            <p className="text-sm text-gray-500">
              Available balance: ${balanceData.current.toFixed(2)}
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label>Select withdrawal method</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="smallIcon" className="rounded-full" type="button">
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">Payment Methods Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Payment Methods</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Bank Transfer: 1-3 business days, no fee</li>
                        <li>• PayPal: 1-2 business days, no fee</li>
                        <li>• Venmo: 1-2 business days, no fee</li>
                        <li>• Cash App: 1-2 business days, no fee</li>
                      </ul>
                      <p className="text-xs text-gray-500 mt-2">You can update your payment methods in Payment Settings.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <RadioGroup value={withdrawalMethod} onValueChange={setWithdrawalMethod}>
              {withdrawalMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    withdrawalMethod === method.id ? "border-assist-blue bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="cursor-pointer font-normal">
                      {method.name}
                    </Label>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div>{method.processingTime}</div>
                    <div>{method.fee}</div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div className="rounded-lg bg-yellow-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <div>
                  <h4 className="font-medium text-yellow-800">Instant Withdrawal</h4>
                  <p className="text-sm text-yellow-600">
                    Get your money within 30 minutes
                  </p>
                </div>
              </div>
              <Switch
                checked={expeditedOption}
                onCheckedChange={setExpeditedOption}
                className="data-[state=checked]:bg-yellow-600"
              />
            </div>
            
            {expeditedOption && (
              <div className="mt-3 rounded-md bg-white p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Expedited processing fee:</span>
                  <span>${getSpeedyWithdrawalFee()}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                  <Info className="h-3 w-3" />
                  <span>Fee is 1% of withdrawal amount (min $0.99)</span>
                </div>
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-assist-blue hover:bg-assist-blue/90"
            disabled={!withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > balanceData.current}
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            Request Withdrawal
          </Button>
        </div>
      </form>
    );
  };
  
  const renderProcessingSteps = () => {
    const steps = [
      { id: 1, label: "Verifying account", icon: CreditCard },
      { id: 2, label: "Processing request", icon: Clock },
      { id: 3, label: "Withdrawal submitted", icon: CheckCircle },
    ];
    
    return (
      <div className="space-y-8 py-4">
        <div className="space-y-6">
          {steps.map((step) => {
            const isActive = processingStep >= step.id;
            const isCompleted = processingStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  isCompleted 
                    ? "border-green-500 bg-green-50 text-green-600" 
                    : isActive 
                      ? "border-assist-blue bg-blue-50 text-assist-blue" 
                      : "border-gray-200 bg-gray-50 text-gray-400"
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className={`font-medium ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}>
                    {step.label}
                  </p>
                  {step.id === 3 && isActive && (
                    <p className="text-sm text-green-600">
                      {expeditedOption 
                        ? "Funds will be available within 30 minutes" 
                        : "Funds will be available in 1-3 business days"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {processingStep === 3 && (
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <CheckCircle className="mx-auto h-10 w-10 text-green-600" />
            <h3 className="mt-2 text-lg font-medium text-green-800">
              Withdrawal Request Successful
            </h3>
            <p className="mt-1 text-green-700">
              {expeditedOption 
                ? "Your funds are being expedited and will be available shortly." 
                : "Your funds will be transferred within 1-3 business days."}
            </p>
            <Button 
              className="mt-4 bg-assist-blue hover:bg-assist-blue/90" 
              onClick={() => setProcessingStep(0)}
            >
              Make Another Withdrawal
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-yellow-500" />
            Financial Overview
          </CardTitle>
          <CardDescription>
            Manage your earnings, track your balance, and withdraw funds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="overview" className="data-[state=active]:bg-assist-blue data-[state=active]:text-white">
                Earnings Overview
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="data-[state=active]:bg-assist-blue data-[state=active]:text-white">
                Withdraw Funds
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-gradient-to-r from-assist-blue to-indigo-600 p-6 text-white">
                  <h3 className="text-sm font-medium opacity-80">Current Balance</h3>
                  <div className="mt-2 flex items-baseline">
                    <DollarSign className="h-6 w-6" />
                    <span className="text-3xl font-bold">{balanceData.current.toFixed(2)}</span>
                  </div>
                  <p className="mt-2 text-sm opacity-80">
                    ${balanceData.pending.toFixed(2)} pending approval
                  </p>
                </div>
                
                <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500">Lifetime Earnings</h3>
                  <div className="mt-2 flex items-baseline">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span className="text-2xl font-bold text-gray-900">{balanceData.lifetime.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    <span>12% from last month</span>
                  </div>
                </div>
                
                <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500">Monthly Goal</h3>
                  <div className="mt-2 flex items-baseline">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span className="text-2xl font-bold text-gray-900">{balanceData.monthlyGoal.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{balanceData.progress}%</span>
                    </div>
                    <Progress value={balanceData.progress} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="mb-4 text-lg font-medium">Recent Transactions</h3>
                <div className="space-y-4">
                  {balanceData.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <span className={`font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  View All Transactions
                </Button>
              </div>
              
              <div className="rounded-lg bg-gradient-to-r from-gray-50 to-white p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <ArrowDown className="h-5 w-5 text-assist-blue" />
                    Withdrawal Options
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="smallIcon" className="rounded-full mr-2">
                          <HelpCircle className="h-5 w-5 text-gray-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold">Withdrawal Information</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Minimum withdrawal: $10.00</li>
                            <li>• Processing time: 1-3 business days</li>
                            <li>• Expedited option: Available for 1% fee</li>
                            <li>• Monthly limit: $1,000.00</li>
                            <li>• Withdrawal methods: Bank, PayPal, Venmo, Cash App</li>
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button 
                    type="button"
                    onClick={() => document.querySelectorAll('[data-value="withdraw"]')[0]?.click()}
                    className="bg-assist-blue hover:bg-assist-blue/90"
                  >
                    Withdraw Funds
                  </Button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Available balance: ${balanceData.current.toFixed(2)}
                </p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {withdrawalMethods.map((method) => (
                    <div key={method.id} className="rounded-lg border border-gray-200 p-3 text-center">
                      <h4 className="font-medium">{method.name}</h4>
                      <p className="mt-1 text-xs text-gray-500">{method.processingTime}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="withdraw">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                <div className="md:col-span-3">
                  {processingStep === 0 ? renderWithdrawalForm() : renderProcessingSteps()}
                </div>
                
                <div className="md:col-span-2">
                  <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">Withdrawal Information</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="smallIcon" className="rounded-full">
                              <HelpCircle className="h-4 w-4 text-gray-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs p-4">
                            <div className="space-y-2">
                              <h4 className="font-semibold">Need More Help?</h4>
                              <p className="text-sm">Contact support at support@example.com for assistance with withdrawals.</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Separator className="my-3" />
                    
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-medium">Processing Times</h4>
                        <p className="mt-1 text-gray-500">
                          Standard withdrawals are typically processed within 1-3 business days.
                          For faster access, use the Instant Withdrawal option.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Minimum Withdrawal</h4>
                        <p className="mt-1 text-gray-500">
                          The minimum withdrawal amount is $10.00.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Payment Methods</h4>
                        <p className="mt-1 text-gray-500">
                          You can withdraw funds to your bank account, PayPal, Venmo, or Cash App.
                          To add or update payment methods, go to Payment Settings.
                        </p>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        View Withdrawal History
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentBalance;
