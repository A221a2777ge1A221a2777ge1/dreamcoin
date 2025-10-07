import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins, Trophy, Wallet, Zap } from "lucide-react";
import { PersonalizedSuggestion } from "@/components/dashboard/personalized-suggestion";
import { HistoryTable } from "@/components/history/history-table";
import { userTransactions, userRewards } from "@/lib/data";
import { BalanceDisplay } from "@/components/wallet/balance-display";

export default function DashboardPage() {
  const recentTransactions = userTransactions.slice(0, 5);
  const earnedRewardsCount = userRewards.filter(r => r.status === 'claimed').length;
  const totalRewardsCount = userRewards.length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BNB Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <BalanceDisplay token="BNB" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              DreamCoin Balance
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <BalanceDisplay token="DRC" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earnedRewardsCount} / {totalRewardsCount}</div>
            <p className="text-xs text-muted-foreground">
              Total rewards claimed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Swaps
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userTransactions.filter(t => t.type === 'Swap').length}</div>
            <p className="text-xs text-muted-foreground">
              Across all pairs
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <PersonalizedSuggestion />
        </div>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>
              Your last 5 transactions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <HistoryTable transactions={recentTransactions} variant="compact" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
