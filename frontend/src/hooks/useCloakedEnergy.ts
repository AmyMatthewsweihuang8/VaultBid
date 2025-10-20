import { useState, useCallback } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { Contract, BrowserProvider } from 'ethers';
import { CLOAKED_ENERGY_EXCHANGE_ABI, CONTRACT_ADDRESS } from '@/lib/contractABI';
import { encryptUint64, initializeFHE } from '@/lib/fhe';
import { toast } from 'sonner';

export const useCloakedEnergy = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);

  const getContract = useCallback(async () => {
    if (!walletClient) throw new Error('Wallet not connected');
    const provider = new BrowserProvider(walletClient as any);
    const signer = await provider.getSigner();
    return new Contract(CONTRACT_ADDRESS, CLOAKED_ENERGY_EXCHANGE_ABI, signer);
  }, [walletClient]);

  const submitOffer = useCallback(async (listingId: number, offerAmount: number) => {
    if (!address) {
      toast.error('Connect wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const contract = await getContract();
      const listingInfo = await contract.getListingInfo(listingId);
      const supplier = listingInfo[0];

      if (supplier.toLowerCase() === address.toLowerCase()) {
        toast.error('Suppliers cannot offer on their own listings');
        throw new Error('Suppliers cannot offer on their own listings');
      }

      toast.info('Encrypting offer...');
      await initializeFHE();

      const encrypted = await encryptUint64(offerAmount, CONTRACT_ADDRESS, address);

      toast.info('Submitting offer...');
      const tx = await contract.submitOffer(listingId, encrypted.data, encrypted.signature);
      await tx.wait();

      toast.success('Offer submitted successfully');
      return tx;
    } catch (error: any) {
      const errorMsg = error.message || 'Offer submission failed';
      toast.error(errorMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, getContract]);

  const createListing = useCallback(async (
    energyType: string,
    details: string,
    metadataHash: string,
    durationInDays: number,
    minPrice: number
  ) => {
    if (!address) {
      toast.error('Connect wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const contract = await getContract();
      const durationSeconds = durationInDays * 24 * 60 * 60;
      const tx = await contract.createListingPlaintext(
        energyType,
        details,
        metadataHash,
        durationSeconds,
        minPrice
      );
      await tx.wait();
      toast.success('Listing created');
      return tx;
    } catch (error: any) {
      toast.error(error.message || 'Creation failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, getContract]);

  const getListingInfo = useCallback(async (listingId: number) => {
    const contract = await getContract();
    return await contract.getListingInfo(listingId);
  }, [getContract]);

  return { submitOffer, createListing, getListingInfo, isLoading };
};
