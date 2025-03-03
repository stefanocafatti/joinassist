
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, AlertCircle, LucideIcon, Award, Clock, Zap, ThumbsUp, Trophy, Bookmark, Star } from "lucide-react";

interface StudentBadgesProps {
  minimal?: boolean;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  earned: boolean;
  date?: string;
}

const StudentBadges: React.FC<StudentBadgesProps> = ({ minimal = false }) => {
  // In a real app, this would be fetched from an API
  const badges: Badge[] = [
    { 
      id: 1, 
      name: "Quick Responder", 
      description: "Respond to task requests within 30 minutes", 
      icon: Zap, 
      color: "text-yellow-500",
      earned: true,
      date: "Mar 10, 2023"
    },
    { 
      id: 2, 
      name: "Top Rated", 
      description: "Receive five 5-star ratings", 
      icon: Star, 
      color: "text-purple-500",
      earned: true,
      date: "Feb 15, 2023"
    },
    { 
      id: 3, 
      name: "Task Master", 
      description: "Complete 10 tasks successfully", 
      icon: Award, 
      color: "text-blue-500",
      earned: true,
      date: "Feb 1, 2023"
    },
    { 
      id: 4, 
      name: "Punctual", 
      description: "Always arrive on time for 5 consecutive tasks", 
      icon: Clock, 
      color: "text-green-500",
      earned: false
    },
    { 
      id: 5, 
      name: "Helper", 
      description: "Assist with 5 community-oriented tasks", 
      icon: ThumbsUp, 
      color: "text-pink-500",
      earned: false
    },
    { 
      id: 6, 
      name: "Champion", 
      description: "Earn all other badges", 
      icon: Trophy, 
      color: "text-amber-500",
      earned: false
    },
  ];

  const earnedBadges = badges.filter(badge => badge.earned);
  const pendingBadges = badges.filter(badge => !badge.earned);

  if (minimal) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-indigo-500" />
              Earned Badges
            </span>
            <span className="text-xl font-bold">{earnedBadges.length}</span>
          </CardTitle>
          <CardDescription>
            {badges.length - earnedBadges.length} more badges to earn
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-center gap-2 mt-2">
            {earnedBadges.slice(0, 3).map(badge => (
              <span key={badge.id} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <badge.icon className={`h-5 w-5 ${badge.color}`} />
              </span>
            ))}
            {earnedBadges.length > 3 && (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <span className="text-xs font-medium text-gray-700">+{earnedBadges.length - 3}</span>
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" className="mt-4 w-full">
            View All Badges
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
            <BadgeCheck className="h-6 w-6 text-indigo-500" />
            Badges & Achievements
          </CardTitle>
          <CardDescription>
            Track your progress and earn badges for your accomplishments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="mb-6 text-lg font-medium">Earned Badges ({earnedBadges.length}/{badges.length})</h3>
            
            {earnedBadges.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {earnedBadges.map((badge) => (
                  <div key={badge.id} className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                    <div className={`rounded-full p-2 ${badge.color} bg-white shadow-sm`}>
                      <badge.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">{badge.name}</h4>
                      <p className="mt-1 text-xs text-gray-500">{badge.description}</p>
                      <p className="mt-2 text-xs text-gray-400">Earned on {badge.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <AlertCircle className="mx-auto h-8 w-8 text-gray-400" />
                <h3 className="mt-2 font-medium">No badges earned yet</h3>
                <p className="mt-1 text-sm text-gray-500">Complete tasks and earn your first badge</p>
              </div>
            )}
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="mb-6 text-lg font-medium">Badges to Earn</h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {pendingBadges.map((badge) => (
                <div key={badge.id} className="flex items-start gap-4 rounded-lg bg-gray-50 p-4 opacity-70">
                  <div className={`rounded-full p-2 text-gray-400 bg-white shadow-sm`}>
                    <badge.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">{badge.name}</h4>
                    <p className="mt-1 text-xs text-gray-500">{badge.description}</p>
                    <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-xs text-indigo-600">
                      <Bookmark className="mr-1 h-3 w-3" />
                      Set as Goal
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentBadges;
