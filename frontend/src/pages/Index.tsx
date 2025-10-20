import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AuctionGrid from "@/components/AuctionGrid";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AuctionGrid />
      <HowItWorks />
    </div>
  );
};

export default Index;
