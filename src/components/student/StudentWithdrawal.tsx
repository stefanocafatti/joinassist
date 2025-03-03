
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowDown, CreditCard, DollarSign, Clock, Zap, Info, CheckCircle } from "lucide-react";

const StudentWithdrawal: React.FC = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank");
  const [expeditedOption, setExpeditedOption] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  
  // In a real app, this would be fetched from an API
  const currentBalance = 345.50;
  const withdrawalMethods = [
    { id: "bank", name: "Bank Account", processingTime: "1-3 business days", fee: "Free" },
    { id: "paypal", name: "PayPal", processingTime: "1-2 business days", fee: "Free" },
    { id: "venmo", name: "Venmo", processingTime: "1-2 business days", fee: "Free" },
    { id: "cash-app", name: "Cash App", processingTime: "1-2 business days", fee: "Free" },
  ];
  
  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(withdrawalAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid withdrawal amount");
      return;
    }
    
    if (amount > currentBalance) {
      toast.error("Withdrawal amount exceeds your current balance");
      return;
    }
    
    // Start the withdrawal process simulation
    setProcessingStep(1);
    
    // Simulate processing
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
            <Label htmlFor="withdrawal-amount">Amount to withdraw</Label>
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
              Available balance: ${currentBalance.toFixed(2)}
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Label>Select withdrawal method</Label>
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
            className="w-full"
            disabled={!withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > currentBalance}
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
              className="mt-4" 
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
            <ArrowDown className="h-6 w-6 text-assist-blue" />
            Withdraw Funds
          </CardTitle>
          <CardDescription>
            Transfer your earnings to your preferred payment method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            <div className="md:col-span-3">
              {processingStep === 0 ? renderWithdrawalForm() : renderProcessingSteps()}
            </div>
            
            <div className="md:col-span-2">
              <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium">Withdrawal Information</h3>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentWithdrawal;
