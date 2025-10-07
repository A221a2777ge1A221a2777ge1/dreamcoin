"use client";

import { ConnectWallet, useAddress, useDisconnect, useBalance } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { useWalletStore } from "@/lib/store/wallet";
import { formatEther } from "ethers";

const DREAMCOIN_CONTRACT_ADDRESS = "0x...YOUR_DREAMCOIN_CONTRACT_ADDRESS"; // Placeholder

export function WalletConnect() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const { connect, disconnect: disconnectStore, setBalance } = useWalletStore();
  
  const { data: bnbBalance } = useBalance();
  const { data: dreamCoinBalance } = useBalance(DREAMCOIN_CONTRACT_ADDRESS);


  useEffect(() => {
    if (address) {
      connect({ address, chainId: 56 }); // Assuming BSC mainnet
      const formattedBnb = bnbBalance ? parseFloat(formatEther(bnbBalance.value)).toFixed(4) : "0.00";
      const formattedDreamCoin = dreamCoinBalance ? parseFloat(formatEther(dreamCoinBalance.value)).toFixed(2) : "0.00";
      setBalance({ bnbBalance: formattedBnb, dreamCoinBalance: formattedDreamCoin });
    } else {
      disconnectStore();
    }
  }, [address, bnbBalance, dreamCoinBalance, connect, disconnectStore, setBalance]);

  return (
    <ConnectWallet
      theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
      btnTitle="Connect Wallet"
      modalSize="compact"
    />
  );
}
