
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Coins, ArrowUpRight, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StudentBalanceProps {
  minimal?: boolean;
}

const StudentBalance: React.FC<StudentBalanceProps> = ({ minimal = false }) => {
  // In a real app, this would be fetched from an API
  const balanceData = {
    current: 345.50,
    pending: 75.00,
    lifetime: 1270.80,
    monthlyGoal: 500,
    progress: 69, // percentage towards monthly goal
    transactions: [
      { id: 1, date: "Mar 15, 2023", description: "Math Tutoring", amount: 45.00, type: "credit" },
      { id: 2, date: "Mar 05, 2023", description: "Withdrawal", amount: 120.00, type: "debit" },
      { id: 3, date: "Feb 28, 2023", description: "Dog Walking", amount: 25.00, type: "credit" },
      { id: 4, date: "Feb 20, 2023", description: "Essay Editing", amount: 35.00, type: "credit" },
    ]
  };

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

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-yellow-500" />
            Balance Overview
          </CardTitle>
          <CardDescription>
            Manage your earnings and track your balance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentBalance;
