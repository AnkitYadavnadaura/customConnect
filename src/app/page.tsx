'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

const projectId = 'your_project_id_here'; // Replace with actual Web3Modal project ID

const chains = [mainnet, goerli];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [injected()],
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Home() {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.getBalance(address).then((bal) => {
        setBalance(ethers.utils.formatEther(bal));
      });
    }
  }, [isConnected, address]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Ethereum Wallet Connection</h1>
        {isConnected ? (
          <div>
            <p>Connected: {address}</p>
            <p>Balance: {balance} ETH</p>
          </div>
        ) : (
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        )}
      </div>
    </WagmiConfig>
  );
}
