import { useWriteContract } from 'wagmi';
import abi from '@/utils/abi.json';
import {address} from '@/utils/address';

export const useRemoveAdmin = () => {
  const { writeContract, isError, error, isPending, isSuccess } = useWriteContract();

  async function removeAdmin(addressAdmin: string) {
    writeContract({
      abi,
      address: address,
      functionName: 'removeAdmin',
      args: [addressAdmin],
    });
  }

  return { removeAdmin, isError, error, isPending, isSuccess };
};
