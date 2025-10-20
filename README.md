# VaultBid

> Private Digital Collectibles Auction Platform powered by Zama's Fully Homomorphic Encryption (FHE)

VaultBid is a decentralized auction platform that enables completely private bidding for digital collectibles. All bids remain encrypted on-chain throughout the entire auction process, ensuring true privacy for bidders while maintaining transparency and fairness.

## 🌟 Features

- **🔒 Fully Encrypted Bids**: All bids are encrypted using Zama's FHE technology before being submitted on-chain
- **🎯 Private Auctions**: No one can see your bid amount, not even the contract owner or other bidders
- **⛓️ On-Chain Privacy**: Encrypted bids are stored directly on the blockchain
- **✅ Fair & Transparent**: Smart contracts determine the winning bid without decrypting other bids
- **⚡ Lightning Fast**: Instant bid processing with cryptographic proofs
- **🛡️ Zero Knowledge**: Bid validity is proven without revealing the actual amount

## 🎥 Demo

**Live Demo**: [https://vaultbid-demo.vercel.app](https://vaultbid-demo.vercel.app)

**Video Walkthrough**: Check the demo video in the "How It Works" section on the website

## 🏗️ Architecture

### Smart Contract

VaultBid uses a Solidity smart contract deployed on Ethereum Sepolia testnet that leverages Zama's FHE library for encrypted computations.

**Contract Address**: `0xcb654Ee83E598acB318edc266642fb6094Ba2E90`

#### Key Components

```
CloakedEnergyExchange.sol
├── EnergyListing (Auction)
│   ├── listingId
│   ├── supplier (seller)
│   ├── minPrice (encrypted)
│   ├── topOffer (encrypted)
│   └── status
│
├── Offer (Bid)
│   ├── offerId
│   ├── bidder
│   ├── amount (encrypted - euint64)
│   └── timestamp
│
└── Functions
    ├── createListing() - Create new auction
    ├── submitOffer() - Submit encrypted bid
    ├── finalizeListing() - Close auction
    └── completeListing() - Settle auction
```

#### Contract Structure

**Data Types**:
- `euint64`: Encrypted 64-bit unsigned integer (for bid amounts)
- `ebool`: Encrypted boolean (for comparisons)
- `externalEuint64`: External encrypted input type

**Core Functions**:

1. **createListing**: Sellers create auctions with encrypted minimum prices
2. **submitOffer**: Bidders submit encrypted bids with validity proofs
3. **finalizeListing**: Auction closes and winner is determined using FHE comparisons
4. **completeListing**: Winning bidder pays and receives the NFT

**Access Control**:
- Only the seller can finalize or cancel their listings
- Only non-sellers can submit offers
- Bidders cannot bid on their own auctions

### Frontend

Built with modern web technologies for a seamless user experience:

- **Framework**: React 18 + TypeScript + Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **Web3 Integration**: RainbowKit + Wagmi v2
- **FHE SDK**: @zama-fhe/relayer-sdk v0.2.0
- **Contract Interaction**: ethers.js v6

#### Key Features

- **Wallet Connection**: Seamless MetaMask and other wallet integrations
- **FHE Encryption**: Client-side bid encryption before submission
- **Real-time Updates**: Live auction status and bid tracking
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🔐 How FHE Works in VaultBid

### Encryption Flow

```
1. User enters bid amount in browser
   ↓
2. FHE SDK encrypts bid locally (euint64)
   ↓
3. Encrypted bid + proof sent to smart contract
   ↓
4. Contract stores encrypted bid on-chain
   ↓
5. Contract compares encrypted bids using FHE operations
   ↓
6. Winner determined without decrypting any bids
   ↓
7. Only winning bid is decrypted after auction ends
```

### FHE Operations Used

- `FHE.fromExternal()`: Convert external input to encrypted type
- `FHE.ge()`: Greater than or equal comparison (encrypted)
- `FHE.gt()`: Greater than comparison (encrypted)
- `FHE.select()`: Conditional selection based on encrypted boolean
- `FHE.allow()`: Grant decryption permission
- `FHE.allowThis()`: Grant contract decryption access

### Privacy Guarantees

✅ **What is hidden**:
- Individual bid amounts (except the winner after finalization)
- Number of bids from specific addresses
- Bid ranking and ordering

✅ **What is public**:
- Number of total bids on an auction
- Bidder addresses (but not their bid amounts)
- Winning bid amount (only after auction closes)
- Auction metadata (title, description, end time)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AmyMatthewsweihuang8/VaultBid.git
cd VaultBid
```

2. **Install dependencies**
```bash
# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. **Configure environment**
```bash
# Root directory .env
SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Development

**Run local frontend**:
```bash
cd frontend
npm run dev
```
Visit `http://localhost:8080`

**Compile contracts**:
```bash
npx hardhat compile
```

**Deploy contracts**:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Create test listings**:
```bash
node scripts/createListingsCorrect.js
```

## 📁 Project Structure

```
VaultBid/
├── contracts/
│   └── CloakedEnergyExchange.sol    # Main auction contract
├── scripts/
│   ├── deploy.js                     # Deployment script
│   └── createListingsCorrect.js      # Create test auctions
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Navigation bar
│   │   │   ├── Hero.tsx             # Landing section
│   │   │   ├── AuctionGrid.tsx      # Auction listings
│   │   │   ├── AuctionCard.tsx      # Individual auction
│   │   │   └── HowItWorks.tsx       # Info section
│   │   ├── lib/
│   │   │   ├── fhe.ts               # FHE encryption utils
│   │   │   └── contractABI.ts       # Contract interface
│   │   ├── hooks/
│   │   │   └── useCloakedEnergy.ts  # Contract interaction
│   │   └── pages/
│   │       └── Index.tsx            # Main page
│   └── public/
│       ├── relayer-sdk-js.umd.cjs   # FHE SDK bundle
│       ├── tfhe_bg.wasm             # FHE WASM module
│       └── kms_lib_bg.wasm          # KMS WASM module
├── hardhat.config.js
└── package.json
```

## 🧪 Testing

### Frontend Testing

1. **Connect Wallet**: Click "Connect Wallet" in the navbar
2. **Browse Auctions**: Scroll to "Live Auctions" section
3. **Place Bid**:
   - Click "Place Bid" on any auction
   - Enter bid amount (must be higher than current bid)
   - Confirm wallet transaction
   - Wait for encryption and submission

### Contract Testing

```bash
# Run Hardhat tests (if available)
npx hardhat test

# Verify contract on Etherscan
npx hardhat verify --network sepolia 0xcb654Ee83E598acB318edc266642fb6094Ba2E90
```

## 🔧 Technology Stack

### Smart Contracts
- **Solidity**: 0.8.24
- **Hardhat**: Contract development environment
- **Zama FHE**: Fully homomorphic encryption library
- **OpenZeppelin**: Security utilities (if used)

### Frontend
- **React**: 18.3.1
- **TypeScript**: 5.8.3
- **Vite**: 5.4.19 (build tool)
- **Tailwind CSS**: 3.4.17
- **shadcn/ui**: Component library
- **RainbowKit**: 2.2.9 (wallet connection)
- **Wagmi**: 2.18.1 (Web3 hooks)
- **ethers.js**: 6.15.0 (blockchain interaction)
- **@zama-fhe/relayer-sdk**: 0.2.0

### Infrastructure
- **Blockchain**: Ethereum Sepolia Testnet
- **Hosting**: Vercel
- **Version Control**: Git + GitHub

## 🛣️ Roadmap

- [ ] Mainnet deployment
- [ ] Multi-chain support (Polygon, Arbitrum)
- [ ] NFT minting integration
- [ ] Auction history and analytics
- [ ] Bid retraction mechanism
- [ ] Reserve price auctions
- [ ] Dutch auction support
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama**: For the incredible FHE technology that makes private smart contracts possible
- **OpenZeppelin**: For secure smart contract libraries
- **Ethereum Community**: For the robust decentralized infrastructure

## 📞 Contact & Links

- **Live Demo**: [https://vaultbid-demo.vercel.app](https://vaultbid-demo.vercel.app)
- **GitHub**: [https://github.com/AmyMatthewsweihuang8/VaultBid](https://github.com/AmyMatthewsweihuang8/VaultBid)
- **Contract (Sepolia)**: [0xcb654Ee83E598acB318edc266642fb6094Ba2E90](https://sepolia.etherscan.io/address/0xcb654Ee83E598acB318edc266642fb6094Ba2E90)

## ⚠️ Disclaimer

This project is currently deployed on Sepolia testnet for demonstration purposes. Do not use it with real assets or on mainnet without proper security audits. The smart contracts have not been professionally audited and may contain vulnerabilities.

---

**Built with ❤️ using Zama FHE Technology**
