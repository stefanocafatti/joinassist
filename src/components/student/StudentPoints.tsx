import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StudentPointsProps {
  minimal?: boolean;
}

const StudentPoints: React.FC<StudentPointsProps> = ({ minimal = false }) => {
  // In a real app, this would be fetched from an API
  const pointsData = {
    current: 750,
    nextReward: 1000,
    progress: 75, // percentage towards next reward
    history: [
      { id: 1, date: "Mar 10, 2023", description: "Quick Responder Badge", points: 50, type: "earned" },
      { id: 2, date: "Mar 03, 2023", description: "Task Completion Streak", points: 100, type: "earned" },
      { id: 3, date: "Feb 25, 2023", description: "Redeemed Gift Card", points: 500, type: "spent" },
      { id: 4, date: "Feb 15, 2023", description: "5-Star Rating", points: 75, type: "earned" },
    ],
    rewards: [
      { id: 1, name: "$10 Amazon Gift Card", points: 1000, image: "https://images.unsplash.com/photo-1616321575355-63e736d3c61d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2lmdCUyMGNhcmR8ZW58MHx8MHx8fDA%3D" },
      { id: 2, name: "$25 Starbucks Card", points: 2500, image: "https://images.unsplash.com/photo-1589769105893-3979fa155350?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RhcmJ1Y2tzfGVufDB8fDB8fHww" },
      { id: 3, name: "$50 University Bookstore", points: 5000, image: "https://images.unsplash.com/photo-1589739900268-7f88f4e1ff51?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2tzdG9yZXxlbnwwfHwwfHx8MA%3D%3D" },
    ]
  };

  if (minimal) {
    return (
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-2">
            <div className="bg-purple-100 p-1.5 rounded-full">
              <Star className="h-5 w-5 text-purple-500 fill-purple-500" />
            </div>
            <span className="font-semibold">Point Balance</span>
          </span>
          <span className="text-xl font-bold text-purple-600">{pointsData.current}</span>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          {pointsData.nextReward - pointsData.current} points until next reward
        </p>
        <Progress value={pointsData.progress} className="h-2 bg-purple-100" indicatorClassName="bg-purple-500" />
        <Button variant="outline" size="sm" className="mt-4 w-full border-purple-200 text-purple-700 hover:bg-purple-50">
          View Rewards
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Points & Rewards
          </CardTitle>
          <CardDescription>
            Earn points for your activity and redeem for rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
              <h3 className="text-sm font-medium opacity-80">Current Points</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">{pointsData.current}</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Next Reward: {pointsData.nextReward} points</span>
                  <span>{pointsData.progress}%</span>
                </div>
                <Progress value={pointsData.progress} className="h-2 bg-white/20" indicatorClassName="bg-white" />
              </div>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500">Earning Opportunities</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>Complete tasks: <b>50-100 points</b></span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Receive 5-star rating: <b>75 points</b></span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Gift className="h-4 w-4 text-purple-500" />
                  <span>Earn badges: <b>50 points each</b></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="mb-4 text-lg font-medium">Available Rewards</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {pointsData.rewards.map((reward) => (
                <div key={reward.id} className="overflow-hidden rounded-lg border border-gray-200">
                  <div className="aspect-video w-full overflow-hidden">
                    <img src={reward.image} alt={reward.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">{reward.name}</h4>
                    <p className="mt-1 text-sm text-gray-500">{reward.points} points</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full"
                      disabled={pointsData.current < reward.points}
                    >
                      {pointsData.current >= reward.points ? "Redeem" : "Not Enough Points"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="mb-4 text-lg font-medium">Points History</h3>
            <div className="space-y-4">
              {pointsData.history.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  <span className={`font-medium ${item.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.type === 'earned' ? '+' : '-'}{item.points} pts
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              View Full History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentPoints;
