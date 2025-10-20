import AuctionCard from "./AuctionCard";

const AuctionGrid = () => {
  // Display listings #5, #6, #7 from on-chain (with correct ETH prices)
  // Listing #8 is still being created, so using static for now
  const listings = [
    {
      title: "Cosmic Genesis #001",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop",
      currentBid: "0.25",
      endTime: "2d 14h",
      bidders: 0,
      isActive: true,
      listingId: 5,
      description: "First edition from the Cosmic Genesis collection"
    },
    {
      title: "Digital Dreamscape",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop",
      currentBid: "0.45",
      endTime: "3d 8h",
      bidders: 0,
      isActive: true,
      listingId: 6,
      description: "Rare generative art piece"
    },
    {
      title: "Neon Samurai",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop",
      currentBid: "0.68",
      endTime: "5d 2h",
      bidders: 0,
      isActive: true,
      listingId: 7,
      description: "Exclusive cyberpunk collection"
    },
    {
      title: "Abstract Nexus",
      image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&auto=format&fit=crop",
      currentBid: "0.92",
      endTime: "6d 18h",
      bidders: 0,
      isActive: true,
      listingId: 8,
      description: "Limited edition 1/1 artwork"
    },
  ];

  return (
    <section id="auctions" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Live Auctions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All bids are encrypted using Zama's FHE technology. Winning bid revealed only when auction closes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing, index) => (
            <AuctionCard key={index} {...listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuctionGrid;
