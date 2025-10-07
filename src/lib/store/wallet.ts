import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
  bnbBalance: string;
  dreamCoinBalance: string;
  connect: (walletDetails: Partial<Omit<WalletState, 'isConnected'>>) => void;
  disconnect: () => void;
  setBalance: (balances: { bnbBalance: string; dreamCoinBalance: string }) => void;
}

export const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set) => ({
        address: null,
        isConnected: false,
        chainId: null,
        bnbBalance: '0.00',
        dreamCoinBalance: '0.00',
        connect: (walletDetails) => set({ 
          isConnected: true, 
          address: walletDetails.address,
          chainId: walletDetails.chainId,
          bnbBalance: walletDetails.bnbBalance || '0.00',
          dreamCoinBalance: walletDetails.dreamCoinBalance || '0.00',
        }),
        disconnect: () => set({ 
          isConnected: false, 
          address: null, 
          chainId: null,
          bnbBalance: '0.00',
          dreamCoinBalance: '0.00' 
        }),
        setBalance: (balances) => set({
            bnbBalance: balances.bnbBalance,
            dreamCoinBalance: balances.dreamCoinBalance
        }),
      }),
      {
        name: 'dreamcoin-wallet-storage',
      }
    )
  )
);
