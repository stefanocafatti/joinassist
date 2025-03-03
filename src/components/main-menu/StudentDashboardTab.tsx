
import React, { useState } from "react";
import { Calendar, Wallet, Award, Clock, CreditCard, Coins, CheckCircle, User, BookOpen, Download, CalendarCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface StudentDashboardTabProps {
  user: {
    firstName: string;
    lastName: string;
    profileImage?: string | null;
    studentInfo: {
      balance: number;
      points: number;
      level: number;
      completedTasks: number;
      totalTasks: number;
      memberSince: string;
      calendarSynced: boolean;
      institution?: string;
      studentId?: string;
    };
    badges: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      isEarned: boolean;
    }>;
    transactions: Array<{
      id: string;
      type: string;
      amount: number;
      date: string;
      status: string;
      description: string;
    }>;
    upcomingTasks: Array<{
      id: string;
      title: string;
      date: string;
      points: number;
      status: string;
    }>;
  };
}

const StudentDashboardTab: React.FC<StudentDashboardTabProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("instant");
  const [calendarSynced, setCalendarSynced] = useState(user.studentInfo.calendarSynced);
  const [isSyncDialogOpen, setIsSyncDialogOpen] = useState(false);
  const [isCalendarSyncing, setIsCalendarSyncing] = useState(false);
  
  const handleWithdraw = () => {
    // Validate withdrawal amount
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (amount > user.studentInfo.balance) {
      toast.error("Insufficient balance");
      return;
    }
    
    // Process withdrawal
    toast.success(`$${amount} withdrawal initiated via ${withdrawMethod === "instant" ? "instant transfer" : "standard transfer"}`);
    setIsWithdrawDialogOpen(false);
    
    // Show estimated arrival
    setTimeout(() => {
      toast.info(
        withdrawMethod === "instant" 
          ? "Funds will arrive in your account within minutes" 
          : "Funds will arrive in your account in 1-3 business days"
      );
    }, 1000);
  };
  
  const syncCalendar = () => {
    setIsCalendarSyncing(true);
    
    // Simulate calendar sync
    setTimeout(() => {
      setCalendarSynced(true);
      setIsCalendarSyncing(false);
      setIsSyncDialogOpen(false);
      toast.success("Calendar synced successfully!");
    }, 2000);
  };
  
  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };
  
  const calculateLevelProgress = () => {
    // This is a simple calculation, could be more complex in a real app
    return Math.min((user.studentInfo.points % 100) / 100 * 100, 100);
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Student Profile Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  {user.profileImage ? (
                    <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
                  ) : (
                    <AvatarFallback className="bg-purple-100 text-purple-800 text-lg">
                      {getInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{user.firstName} {user.lastName}</CardTitle>
                  <CardDescription>
                    {user.studentInfo.institution || "Student"} • Member since {user.studentInfo.memberSince}
                  </CardDescription>
                </div>
                <div className="ml-auto">
                  <Badge variant="student">
                    <User className="mr-1 h-3 w-3" /> Student
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">Completed Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{user.studentInfo.completedTasks}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">Total Earned</p>
                  <p className="text-2xl font-bold text-gray-900">${user.studentInfo.balance}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center text-green-700 mb-1">
                    <Coins className="h-4 w-4 mr-1" />
                    <p className="text-sm">Points</p>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{user.studentInfo.points}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">Level</p>
                  <p className="text-2xl font-bold text-gray-900">{user.studentInfo.level}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Level Progress</span>
                  <span className="text-sm font-medium">{Math.round(calculateLevelProgress())}%</span>
                </div>
                <Progress value={calculateLevelProgress()} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button onClick={() => setIsSyncDialogOpen(true)} variant="outline" size="sm" className="flex gap-2">
                <Calendar className="h-4 w-4" />
                {calendarSynced ? "Calendar Synced" : "Sync Calendar"}
              </Button>
              <Button onClick={() => setIsWithdrawDialogOpen(true)} variant="default" size="sm" className="flex gap-2">
                <Download className="h-4 w-4" />
                Withdraw Funds
              </Button>
            </CardFooter>
          </Card>
          
          {/* Upcoming Tasks Quick View */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.upcomingTasks.length > 0 ? (
                <div className="space-y-4">
                  {user.upcomingTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div>
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          +{task.points} pts
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`${
                            task.status === "Confirmed" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No upcoming tasks scheduled</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">View All Tasks</Button>
            </CardFooter>
          </Card>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-600" />
                  Available Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${user.studentInfo.balance.toFixed(2)}</p>
                <Button onClick={() => setIsWithdrawDialogOpen(true)} className="mt-4 w-full">Withdraw</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-600" />
                  Badges Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{user.badges.filter(badge => badge.isEarned).length}</p>
                <Button variant="outline" className="mt-4 w-full" onClick={() => setActiveTab("achievements")}>View Badges</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="earnings" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5 text-blue-600" />
                Earnings & Transactions
              </CardTitle>
              <CardDescription>
                Your transaction history and available balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-gray-600 text-sm">Available Balance</p>
                <p className="text-3xl font-bold text-gray-900">${user.studentInfo.balance.toFixed(2)}</p>
                <Button onClick={() => setIsWithdrawDialogOpen(true)} className="mt-4">Withdraw Funds</Button>
              </div>
              
              <div className="space-y-1 mb-4">
                <h3 className="font-medium">Recent Transactions</h3>
              </div>
              
              {user.transactions.length > 0 ? (
                <div className="space-y-4">
                  {user.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full p-2 ${
                          transaction.type === "payment" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {transaction.type === "payment" ? (
                            <CreditCard className="h-4 w-4" />
                          ) : (
                            <Download className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.type === "payment" ? "text-green-600" : "text-blue-600"
                        }`}>
                          {transaction.type === "payment" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            transaction.status === "completed" 
                              ? "bg-green-50 text-green-700" 
                              : transaction.status === "pending"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No transactions yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                My Tasks
              </CardTitle>
              <CardDescription>
                Your upcoming and completed tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming" className="mt-4">
                  {user.upcomingTasks.length > 0 ? (
                    <div className="space-y-4">
                      {user.upcomingTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <div>
                            <p className="font-medium text-gray-900">{task.title}</p>
                            <p className="text-sm text-gray-500">{task.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              +{task.points} pts
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`${
                                task.status === "Confirmed" 
                                  ? "bg-green-50 text-green-700 border-green-200" 
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }`}
                            >
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>No upcoming tasks scheduled</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="completed" className="mt-4">
                  <div className="text-center py-6 text-gray-500">
                    <p>Completed tasks history will be shown here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">Find New Tasks</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-600" />
                Badges & Achievements
              </CardTitle>
              <CardDescription>
                Track your progress and badges earned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Level {user.studentInfo.level} Progress</span>
                  <span className="text-sm font-medium">{Math.round(calculateLevelProgress())}%</span>
                </div>
                <Progress value={calculateLevelProgress()} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                  {100 - Math.round(calculateLevelProgress())} points needed to reach Level {user.studentInfo.level + 1}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.badges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className={`border ${badge.isEarned ? 'border-amber-200' : 'border-gray-200'} rounded-lg p-4 text-center ${
                      badge.isEarned ? 'bg-amber-50' : 'bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <h3 className={`font-medium ${badge.isEarned ? 'text-amber-900' : 'text-gray-500'}`}>{badge.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                    {badge.isEarned && (
                      <Badge variant="outline" className="mt-2 bg-amber-100 text-amber-800">
                        <CheckCircle className="h-3 w-3 mr-1" /> Earned
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Transfer your earnings to your bank account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to withdraw</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-8"
                />
              </div>
              <p className="text-sm text-gray-500">Available balance: ${user.studentInfo.balance.toFixed(2)}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="withdraw-method">Withdrawal method</Label>
              <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select withdrawal method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant Transfer (Fee: $0.50)</SelectItem>
                  <SelectItem value="standard">Standard Transfer (1-3 days)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleWithdraw}>Withdraw Funds</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Calendar Sync Dialog */}
      <Dialog open={isSyncDialogOpen} onOpenChange={setIsSyncDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sync Calendar</DialogTitle>
            <DialogDescription>
              Sync your tasks with your preferred calendar app.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarCheck className="h-5 w-5 text-purple-600" />
                <Label htmlFor="sync-calendar">Google Calendar</Label>
              </div>
              <Switch
                id="sync-calendar"
                checked={calendarSynced}
                disabled={isCalendarSyncing}
              />
            </div>
            
            <p className="text-sm text-gray-500">
              Syncing will add all your scheduled tasks to your calendar and keep them updated automatically.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSyncDialogOpen(false)}>Cancel</Button>
            <Button onClick={syncCalendar} disabled={isCalendarSyncing || calendarSynced}>
              {isCalendarSyncing ? "Syncing..." : calendarSynced ? "Synced" : "Sync Calendar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboardTab;
