import { useState } from "react";
import { Clock, Users, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useCloakedEnergy } from "@/hooks/useCloakedEnergy";
import { parseEther } from "ethers";

interface AuctionCardProps {
  title: string;
  image: string;
  currentBid: string;
  endTime: string;
  bidders: number;
  isActive: boolean;
  listingId?: number;
  description?: string;
}

const AuctionCard = ({
  title,
  image,
  currentBid,
  endTime,
  bidders,
  isActive,
  listingId = 1,
  description = ""
}: AuctionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const { address, isConnected } = useAccount();
  const { submitOffer, isLoading } = useCloakedEnergy();

  const handlePlaceBid = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      toast.error("Please enter a valid bid amount");
      return;
    }

    if (parseFloat(bidAmount) < parseFloat(currentBid)) {
      toast.error(`Bid must be at least ${currentBid} ETH`);
      return;
    }

    try {
      const amountInWei = parseEther(bidAmount);
      await submitOffer(listingId, Number(amountInWei));
      setIsOpen(false);
      setBidAmount("");
    } catch (error) {
      console.error("Failed to place bid:", error);
    }
  };

  return (
    <Card className="group overflow-hidden border-gradient hover:shadow-glow-cyan transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
        {isActive && (
          <Badge className="absolute top-4 right-4 bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50">
            <Lock className="h-3 w-3 mr-1" />
            Live
          </Badge>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {bidders} bidders
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {endTime}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Minimum Bid</p>
            <p className="text-lg font-bold text-neon-cyan">{currentBid} ETH</p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-cyber hover:opacity-90 text-background font-semibold shadow-glow-purple">
                Place Bid
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background border-gradient">
              <DialogHeader>
                <DialogTitle className="text-gradient">{title}</DialogTitle>
                <DialogDescription>
                  Your bid will be encrypted using Zama's FHE technology. Only you and the winner will know the final amount.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="bid-amount">Bid Amount (ETH)</Label>
                  <Input
                    id="bid-amount"
                    type="number"
                    step="0.01"
                    min={currentBid}
                    placeholder={`Minimum ${currentBid} ETH`}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="border-neon-cyan/30 focus:border-neon-cyan"
                  />
                  <p className="text-xs text-muted-foreground">
                    Current minimum: {currentBid} ETH
                  </p>
                </div>

                {!isConnected && (
                  <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-3">
                    <p className="text-sm text-neon-purple">
                      Please connect your wallet to place a bid
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border-border/50 hover:bg-background/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePlaceBid}
                  disabled={!isConnected || isLoading}
                  className="flex-1 bg-gradient-cyber hover:opacity-90 text-background font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Encrypting...
                    </>
                  ) : (
                    "Place Encrypted Bid"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
};

export default AuctionCard;
