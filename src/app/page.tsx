'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { createAppKit } from '@reown/appkit/react'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const projectId = 'd592fb01c4b7967f0f7d8ce6f06a4fc3'; // Replace with actual Web3Modal project ID

const queryClient = new QueryClient()

const metadata = { //optional
    name: 'AppKit',
    description: 'AppKit Example',
    url: 'https://example.com',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

/* Remove the existing Wagmi Config */
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

/* Create the Wagmi adapter */
 const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, arbitrum],
  projectId
})

// import { createAppKit } from '@reown/appkit/react'
 createAppKit({
 adapters: [wagmiAdapter],
 networks: [mainnet, arbitrum],
 metadata: metadata,
 projectId,
 features: {
   analytics: true,
 }
})

export default function App() {
  return (
    <>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>

      <QueryClientProvider client={queryClient}>
          <HomePage />
       </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
