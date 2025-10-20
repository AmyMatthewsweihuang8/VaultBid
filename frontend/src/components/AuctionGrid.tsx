import AuctionCard from "./AuctionCard";

const AuctionGrid = () => {
  // Display listings #5, #6, #7 from on-chain (with correct ETH prices)
  // Listing #8 is still being created, so using static for now
  const listings = [
    {
      title: "Solar Energy Credits",
      image: "https://images.unsplash.com/photo-1509391366763-d80825a0a3c6?w=800&auto=format&fit=crop",
      currentBid: "0.25",
      endTime: "89d 23h",
      bidders: 0,
      isActive: true,
      listingId: 5,
    },
    {
      title: "Wind Power Futures",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop",
      currentBid: "0.45",
      endTime: "89d 23h",
      bidders: 0,
      isActive: true,
      listingId: 6,
    },
    {
      title: "Hydro Energy Package",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop",
      currentBid: "0.68",
      endTime: "89d 23h",
      bidders: 0,
      isActive: true,
      listingId: 7,
    },
    {
      title: "Green Energy Bundle",
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&auto=format&fit=crop",
      currentBid: "0.92",
      endTime: "89d 23h",
      bidders: 0,
      isActive: true,
      listingId: 8,
    },
  ];

  return (
    <section id="auctions" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Active Energy Listings</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All offers are encrypted using Zama's FHE technology. Top bidder revealed when listing closes.
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
