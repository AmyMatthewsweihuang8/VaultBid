import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider as RKProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'CloakedEnergy Exchange',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia],
  ssr: false,
});

const queryClient = new QueryClient();

export const RainbowKitProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RKProvider>{children}</RKProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
