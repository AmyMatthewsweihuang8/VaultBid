# CloakedEnergy Exchange

A privacy-preserving energy trading marketplace built with Zama's Fully Homomorphic Encryption (FHE) technology.

## Features

- **Private Energy Trading**: Trade energy contracts with complete privacy using FHE
- **Encrypted Bidding**: All offers remain encrypted throughout the entire process
- **Secure Settlements**: Automated settlement with cryptographic guarantees
- **Multi-Energy Support**: Solar, wind, hydro, and other renewable energy sources

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Smart Contracts**: Solidity 0.8.24 with Zama FHE
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: @zama-fhe/relayer-sdk
- **UI**: shadcn/ui + Tailwind CSS
- **Web3**: RainbowKit + Wagmi v2

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:8080`

### Build

```bash
npm run build
```

## Smart Contract

Deployed on Sepolia: `0xcb654Ee83E598acB318edc266642fb6094Ba2E90`

## How It Works

1. **Create Listing**: Energy suppliers create listings with encrypted minimum prices
2. **Submit Offers**: Buyers submit encrypted offers that remain confidential
3. **Automated Matching**: Smart contract compares encrypted values without revealing them
4. **Secure Settlement**: Winning offer is automatically settled on-chain

## Privacy Guarantees

- Offer amounts remain encrypted on-chain
- Only the supplier can decrypt the winning offer after finalization
- No third party can view offer amounts during the bidding period
- Cryptographic proofs ensure offer validity without revealing values

## License

MIT
