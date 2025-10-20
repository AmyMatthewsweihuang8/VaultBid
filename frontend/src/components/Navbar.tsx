import { Gavel } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Gavel className="h-8 w-8 text-neon-cyan glow-cyan" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">VaultBid</h1>
              <p className="text-xs text-muted-foreground">Private NFT Auctions</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#auctions" className="text-sm font-medium text-foreground/80 hover:text-neon-cyan transition-colors">
              Auctions
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-neon-cyan transition-colors">
              How It Works
            </a>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
