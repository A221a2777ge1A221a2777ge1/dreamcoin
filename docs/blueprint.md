# **App Name**: Dreamtoke

## Core Features:

- Wallet Connection: Connect to MetaMask, WalletConnect, or Coinbase Wallet using Thirdweb SDK.  Store wallet details securely in Zustand.
- Token Swapping: Swap BEP-20 tokens for DreamCoin via PancakeSwap.  Include real-time quotes, slippage tolerance, and transaction confirmation.
- Reward System: Implement African City Tier rewards (Lagos, Cairo, Nairobi, Accra) based on user engagement. Award rewards using a Cloud Function tool that prevents abuse.
- Transaction History: Display swaps and reward claims. Allow filtering, exporting to CSV, and real-time Firestore updates.
- PWA Capabilities: Enable PWA features: installable app, offline viewing, background sync, push notifications, and share target API.
- User Data Storage: Store user data, rewards, and transactions in Firestore. Securely manage user sessions with Firebase Authentication.

## Style Guidelines:

- Primary color: Saturated gold (#FFD700) to evoke wealth and value.
- Background color: Desaturated dark green (#1A3300) provides a rich, earthy feel suitable to the "African modern game-like vibe".
- Accent color:  Analogous yellow-orange (#FFB300) provides strong contrast to focus attention on key UI elements like call-to-action buttons.
- Body: 'PT Sans', sans-serif. Headlines: 'Playfair', serif. Use 'Playfair' for headlines and 'PT Sans' for longer blocks of text.
- Use animated icons related to each African city tier (Lagos, Cairo, Nairobi, Accra).
- Implement a mobile-first, fully responsive layout with clear, concise UI elements.
- Add subtle animations for reward claims and wallet connections, with animated progress bars for unclaimed amounts.