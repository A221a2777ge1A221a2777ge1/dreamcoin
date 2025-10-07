"use client";

import { useWalletStore } from "@/lib/store/wallet";
import { useEffect, useState } from "react";

interface BalanceDisplayProps {
  token: "BNB" | "DRC";
}

export function BalanceDisplay({ token }: BalanceDisplayProps) {
  const { bnbBalance, dreamCoinBalance, isConnected } = useWalletStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isConnected) {
    return <div className="text-2xl font-bold">--</div>;
  }
  
  const balance = token === "BNB" ? bnbBalance : dreamCoinBalance;
  const symbol = token === "BNB" ? "BNB" : "DRC";

  return (
    <div>
      <div className="text-2xl font-bold">{balance}</div>
      <p className="text-xs text-muted-foreground">{symbol}</p>
    </div>
  );
}
