import { ethers } from 'ethers';
import JobMarketplaceABI from './JobMarketplaceABI.json';

// The contract address will be set after deployment
let contractAddress = '0xdE84fdD72B0502dbBC1070bC9A6eB78CC51d7b61';

// Function to set contract address after deployment
export const setContractAddress = (address: string) => {
  contractAddress = address;
};

// Function to get provider
export const getProvider = () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

// Function to get signer
export const getSigner = async () => {
  const provider = getProvider();
  if (!provider) return null;
  
  try {
    const signer = await provider.getSigner();
    return signer;
  } catch (error) {
    console.error("Error getting signer:", error);
    return null;
  }
};

// Function to get contract instance
export const getContract = async (withSigner = true) => {
  if (!contractAddress) {
    console.error("Contract address not set");
    return null;
  }

  try {
    if (withSigner) {
      const signer = await getSigner();
      if (!signer) return null;
      return new ethers.Contract(contractAddress, JobMarketplaceABI.abi, signer);
    } else {
      const provider = getProvider();
      if (!provider) return null;
      return new ethers.Contract(contractAddress, JobMarketplaceABI.abi, provider);
    }
  } catch (error) {
    console.error("Error getting contract:", error);
    return null;
  }
};

// Function to connect wallet
export const connectWallet = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { success: true, address };
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return { success: false, error };
    }
  } else {
    return { success: false, error: "MetaMask not installed" };
  }
};

// Add TypeScript types for window
declare global {
  interface Window {
    ethereum: any;
  }
} 