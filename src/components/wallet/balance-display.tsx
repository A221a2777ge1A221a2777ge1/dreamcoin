"use client";

import { useUser } from "@/firebase";
import { useEffect, useState } from "react";

interface BalanceDisplayProps {
  token: "BNB" | "DRC";
}

// Mock balances since wallet connection is removed
const mockBalances = {
    bnbBalance: "1.234",
    dreamCoinBalance: "5,678.90"
}

export function BalanceDisplay({ token }: BalanceDisplayProps) {
  const { user, isUserLoading } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !user) {
    return <div className="text-2xl font-bold">--</div>;
  }
  
  const balance = token === "BNB" ? mockBalances.bnbBalance : mockBalances.dreamCoinBalance;
  const symbol = token === "BNB" ? "BNB" : "DRC";

  return (
    <div>
      <div className="text-2xl font-bold">{balance}</div>
      <p className="text-xs text-muted-foreground">{symbol}</p>
    </div>
  );
}
