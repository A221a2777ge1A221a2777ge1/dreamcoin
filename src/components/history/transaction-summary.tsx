import { getTransactionSummaries } from "@/ai/flows/transaction-summaries";
import { userTransactions } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export async function TransactionSummary() {
  const summaryResult = await getTransactionSummaries({
    userId: "mock_user_id",
    transactionHistory: JSON.stringify(userTransactions),
  });

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Summary
            </CardTitle>
            <CardDescription>A quick overview of your recent activity.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{summaryResult.summary}</p>
      </CardContent>
    </Card>
  );
}
