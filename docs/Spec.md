# CloakedEnergy-Exchange

Privacy-preserving energy market using Zama FHE.

## Architecture

- **Encrypted Bids**: Energy, price, and quality remain encrypted on-chain
- **Regional Markets**: Aggregate encrypted bids by geographic region
- **No Gateway Decryption**: All computations in encrypted domain

## Core Functions

- `placeBid()`: Submit encrypted energy supply bid
- `getMyBid()`: View own encrypted bid (provider only)
- `getRegionalMarketTotals()`: View regional encrypted aggregates

## FHE Operations

- `FHE.fromExternal()`: Convert client-side encrypted input
- `FHE.add()`: Encrypted addition for market totals
- `FHE.allowThis()` / `FHE.allow()`: Permission management
