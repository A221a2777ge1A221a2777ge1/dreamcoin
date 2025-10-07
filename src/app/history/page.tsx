import { Button } from "@/components/ui/button";
import { HistoryTable } from "@/components/history/history-table";
import { userTransactions } from "@/lib/data";
import { FileDown } from "lucide-react";
import { TransactionSummary } from "@/components/history/transaction-summary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function HistoryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Transaction History
        </h1>
        <div className="flex items-center space-x-2">
          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <TransactionSummary />

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <Input placeholder="Filter by hash..." className="max-w-xs" />
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="swap">Swap</SelectItem>
              <SelectItem value="reward">Reward Claim</SelectItem>
            </SelectContent>
          </Select>
           <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <HistoryTable transactions={userTransactions} />
      </div>
    </div>
  );
}
