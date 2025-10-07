import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Transaction } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight, CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HistoryTableProps {
  transactions: Transaction[];
  variant?: 'compact' | 'full';
}

function StatusIcon({ status }: { status: Transaction['status'] }) {
    switch (status) {
        case 'Completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
        case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />;
        case 'Failed': return <XCircle className="h-4 w-4 text-red-500" />;
        default: return null;
    }
}

export function HistoryTable({ transactions, variant = 'full' }: HistoryTableProps) {
  const isCompact = variant === 'compact';

  return (
    <div className={cn(!isCompact && "rounded-md border")}>
      <Table>
        {!isCompact && (
            <TableHeader>
            <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
        )}
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    {tx.type === 'Swap' 
                        ? <Badge variant="secondary">Swap</Badge>
                        : <Badge>Reward</Badge>
                    }
                    {!isCompact && <span className="hidden md:inline">{tx.type}</span>}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                    <StatusIcon status={tx.status} />
                    {!isCompact && <span className="hidden md:inline">{tx.status}</span>}
                </div>
              </TableCell>
              <TableCell>
                {tx.type === 'Swap' ? (
                  <div className="font-mono text-xs md:text-sm">
                    {tx.fromAmount} {tx.fromToken} → {tx.toAmount} {tx.toToken}
                  </div>
                ) : (
                  <div className="text-xs md:text-sm">
                    {tx.rewardAmount} DRC ({tx.rewardTier})
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right text-muted-foreground text-xs md:text-sm">
                {formatDistanceToNow(new Date(tx.date), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" asChild>
                  <a href={`https://bscscan.com/tx/${tx.txHash}`} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
