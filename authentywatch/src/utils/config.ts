import { http, createConfig } from 'wagmi'
import {sepolia, mainnet } from 'wagmi/chains'

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY; 

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`),
  },
})
