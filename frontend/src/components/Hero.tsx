import { Lock, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 mb-6">
            <Lock className="h-4 w-4 text-neon-cyan" />
            <span className="text-sm font-medium text-neon-cyan">Powered by Zama FHE</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <span className="text-gradient">Private Energy Trading</span>
            <br />
            <span className="text-foreground">On the Blockchain</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trade energy contracts with complete privacy. Your offers remain encrypted throughout the entire process, powered by fully homomorphic encryption.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-gradient-cyber hover:opacity-90 text-background font-semibold px-8 shadow-glow-cyan">
              <Zap className="mr-2 h-5 w-5" />
              Explore Listings
            </Button>
            <Button size="lg" variant="outline" className="border-neon-purple/50 hover:bg-neon-purple/10 hover:border-neon-purple">
              <Shield className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            <div className="p-6 rounded-xl bg-gradient-card border border-border/50 hover:border-neon-cyan/50 transition-all">
              <Shield className="h-8 w-8 text-neon-cyan mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Fully Encrypted</h3>
              <p className="text-sm text-muted-foreground">Offers encrypted with Zama FHE technology</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-card border border-border/50 hover:border-neon-purple/50 transition-all">
              <Lock className="h-8 w-8 text-neon-purple mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Fair & Transparent</h3>
              <p className="text-sm text-muted-foreground">On-chain verification after listing closes</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-card border border-border/50 hover:border-neon-pink/50 transition-all">
              <Zap className="h-8 w-8 text-neon-pink mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Instant offer processing on-chain</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
