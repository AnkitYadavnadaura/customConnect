'use client';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { getAccount } from '@wagmi/core'; // ✅ Use getAccount instead of getNetwork

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const chains = [mainnet, goerli];
const projectId = '38b8fc581b512b74d146334537f16cfd';
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      setProvider(new ethers.providers.Web3Provider((window as any).ethereum));
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return alert('Please install MetaMask');
    try {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      const signer = provider.getSigner();
      const balance = await signer.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Connect Ethereum Wallet</h1>
        {account ? (
          <div>
            <p>Connected: {account}</p>
            <p>Balance: {balance} ETH</p>
          </div>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </div>
    </WagmiConfig>
  );
}
