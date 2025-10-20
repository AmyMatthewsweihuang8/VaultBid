import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AuctionGrid from "@/components/AuctionGrid";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AuctionGrid />
    </div>
  );
};

export default Index;
