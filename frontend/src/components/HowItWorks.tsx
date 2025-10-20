import { Shield, Lock, Zap, Eye, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">How VaultBid Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience truly private auctions powered by Zama's fully homomorphic encryption
          </p>
        </div>

        {/* Video Demo Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="rounded-2xl overflow-hidden border border-neon-cyan/30 shadow-glow-cyan bg-gradient-card">
            <video
              controls
              className="w-full"
              poster="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop"
            >
              <source src="/vaultbid_demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Watch how VaultBid protects your bids with end-to-end encryption
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-neon-cyan/20 rounded-full flex items-center justify-center border border-neon-cyan/50">
              <span className="text-2xl font-bold text-neon-cyan">1</span>
            </div>
            <div className="p-6 pt-10 rounded-xl bg-gradient-card border border-border/50 hover:border-neon-cyan/50 transition-all h-full">
              <Eye className="h-10 w-10 text-neon-cyan mb-4" />
              <h3 className="text-xl font-semibold mb-3">Browse Auctions</h3>
              <p className="text-muted-foreground">
                Explore exclusive digital collectibles from verified creators. View current prices and auction end times.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center border border-neon-purple/50">
              <span className="text-2xl font-bold text-neon-purple">2</span>
            </div>
            <div className="p-6 pt-10 rounded-xl bg-gradient-card border border-border/50 hover:border-neon-purple/50 transition-all h-full">
              <Lock className="h-10 w-10 text-neon-purple mb-4" />
              <h3 className="text-xl font-semibold mb-3">Place Encrypted Bid</h3>
              <p className="text-muted-foreground">
                Your bid is encrypted using FHE before being submitted on-chain. No one can see your bid amount.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-neon-pink/20 rounded-full flex items-center justify-center border border-neon-pink/50">
              <span className="text-2xl font-bold text-neon-pink">3</span>
            </div>
            <div className="p-6 pt-10 rounded-xl bg-gradient-card border border-border/50 hover:border-neon-pink/50 transition-all h-full">
              <Shield className="h-10 w-10 text-neon-pink mb-4" />
              <h3 className="text-xl font-semibold mb-3">Bids Stay Private</h3>
              <p className="text-muted-foreground">
                All bids remain encrypted on-chain throughout the auction. Smart contracts compare bids without decrypting.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
              <span className="text-2xl font-bold text-green-500">4</span>
            </div>
            <div className="p-6 pt-10 rounded-xl bg-gradient-card border border-border/50 hover:border-green-500/50 transition-all h-full">
              <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Winner Revealed</h3>
              <p className="text-muted-foreground">
                When auction ends, only the winning bid is decrypted and revealed. All other bids remain private forever.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-card border border-neon-cyan/30">
            <div className="flex items-start gap-4 mb-6">
              <Zap className="h-8 w-8 text-neon-cyan flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3">Powered by Zama FHE</h3>
                <p className="text-muted-foreground mb-4">
                  VaultBid uses Zama's Fully Homomorphic Encryption (FHE) technology to enable computations on encrypted data.
                  This means the smart contract can determine the highest bid without ever seeing the actual bid amounts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                <Lock className="h-6 w-6 text-neon-cyan mb-2" />
                <h4 className="font-semibold mb-1">End-to-End Encryption</h4>
                <p className="text-sm text-muted-foreground">
                  Bids encrypted in your browser before submission
                </p>
              </div>

              <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                <Shield className="h-6 w-6 text-neon-purple mb-2" />
                <h4 className="font-semibold mb-1">On-Chain Privacy</h4>
                <p className="text-sm text-muted-foreground">
                  Encrypted bids stored directly on blockchain
                </p>
              </div>

              <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                <Zap className="h-6 w-6 text-neon-pink mb-2" />
                <h4 className="font-semibold mb-1">Zero Knowledge Proofs</h4>
                <p className="text-sm text-muted-foreground">
                  Cryptographic proofs ensure bid validity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
