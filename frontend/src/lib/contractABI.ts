export const CLOAKED_ENERGY_EXCHANGE_ABI = [
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "energyType", type: "string" },
      { internalType: "string", name: "details", type: "string" },
      { internalType: "string", name: "metadataHash", type: "string" },
      { internalType: "uint256", name: "duration", type: "uint256" },
      { internalType: "bytes32", name: "minPriceExt", type: "bytes32" },
      { internalType: "bytes", name: "proof", type: "bytes" }
    ],
    name: "createListing",
    outputs: [{ internalType: "uint256", name: "listingId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "energyType", type: "string" },
      { internalType: "string", name: "details", type: "string" },
      { internalType: "string", name: "metadataHash", type: "string" },
      { internalType: "uint256", name: "duration", type: "uint256" },
      { internalType: "uint64", name: "minPricePlain", type: "uint64" }
    ],
    name: "createListingPlaintext",
    outputs: [{ internalType: "uint256", name: "listingId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" },
      { internalType: "bytes32", name: "offerAmountExt", type: "bytes32" },
      { internalType: "bytes", name: "proof", type: "bytes" }
    ],
    name: "submitOffer",
    outputs: [{ internalType: "uint256", name: "offerId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" }
    ],
    name: "finalizeListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" }
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" }
    ],
    name: "completeListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "offerId", type: "uint256" }
    ],
    name: "withdrawOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" }
    ],
    name: "getListingInfo",
    outputs: [
      { internalType: "address", name: "supplier", type: "address" },
      { internalType: "string", name: "energyType", type: "string" },
      { internalType: "string", name: "details", type: "string" },
      { internalType: "string", name: "metadataHash", type: "string" },
      { internalType: "enum CloakedEnergyExchange.ListingStatus", name: "status", type: "uint8" },
      { internalType: "uint256", name: "openedAt", type: "uint256" },
      { internalType: "uint256", name: "closesAt", type: "uint256" },
      { internalType: "uint256", name: "offerCount", type: "uint256" },
      { internalType: "address", name: "topBidder", type: "address" },
      { internalType: "bool", name: "hasTopBid", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "offerId", type: "uint256" }
    ],
    name: "getOfferInfo",
    outputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" },
      { internalType: "address", name: "buyer", type: "address" },
      { internalType: "uint256", name: "submittedAt", type: "uint256" },
      { internalType: "bool", name: "isProcessed", type: "bool" },
      { internalType: "bool", name: "isWithdrawn", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" }
    ],
    name: "getMinPriceHandle",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" }
    ],
    name: "getTopOfferHandle",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "offerId", type: "uint256" }
    ],
    name: "getOfferAmountHandle",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" }
    ],
    name: "getListingOffers",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "buyer", type: "address" }
    ],
    name: "getBuyerOffers",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" }
    ],
    name: "isListingActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "listingId", type: "uint256" }
    ],
    name: "getTimeRemaining",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "listingCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "listingId", type: "uint256" },
      { indexed: true, internalType: "address", name: "supplier", type: "address" },
      { indexed: false, internalType: "string", name: "energyType", type: "string" },
      { indexed: false, internalType: "uint256", name: "closesAt", type: "uint256" }
    ],
    name: "ListingCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "offerId", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "listingId", type: "uint256" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" },
      { indexed: false, internalType: "bytes32", name: "offerHandle", type: "bytes32" }
    ],
    name: "OfferSubmitted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "listingId", type: "uint256" },
      { indexed: true, internalType: "address", name: "winner", type: "address" },
      { indexed: false, internalType: "bytes32", name: "topOfferHandle", type: "bytes32" }
    ],
    name: "ListingFinalized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "listingId", type: "uint256" }
    ],
    name: "ListingCancelled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "listingId", type: "uint256" },
      { indexed: true, internalType: "address", name: "winner", type: "address" },
      { indexed: true, internalType: "address", name: "supplier", type: "address" }
    ],
    name: "ListingCompleted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "offerId", type: "uint256" },
      { indexed: true, internalType: "address", name: "buyer", type: "address" }
    ],
    name: "OfferWithdrawn",
    type: "event"
  }
] as const;

export const CONTRACT_ADDRESS = "0xcb654Ee83E598acB318edc266642fb6094Ba2E90";
