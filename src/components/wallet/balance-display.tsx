"use client";

import { useWalletStore } from "@/lib/store/wallet";
import { useEffect, useState } from "react";
import { useUser } from "../../firebase/auth/use-user";

interface BalanceDisplayProps {
  token: "BNB" | "DRC";
}

export function BalanceDisplay({ token }: BalanceDisplayProps) {
  const { data: user } = useUser();
  const { isConnected: isWalletConnected, bnbBalance, dreamCoinBalance } = useWalletStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !user || !isWalletConnected) {
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
