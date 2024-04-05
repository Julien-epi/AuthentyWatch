import { useWriteContract } from 'wagmi';
import abi from '@/utils/abi.json';
import {address} from '@/utils/address';

export const useRemoveNFT = () => {
  const { writeContract, isError, error, isPending, isSuccess } = useWriteContract();

  async function removeNFT(nftId: string) {
    writeContract({
      abi,
      address: address,
      functionName: 'burn',
      args: [nftId],
    });
  }

  return { removeNFT, isError, error, isPending, isSuccess };
};
