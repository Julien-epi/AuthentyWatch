import { useWriteContract } from 'wagmi';
import abi from '@/utils/abi.json';
import {address} from '@/utils/address';

export const useAddAdmin = () => {
  const { writeContract, isError, error, isPending, isSuccess } = useWriteContract();

  async function addAdmin(addressAdmin: string) {
    writeContract({
      abi,
      address: address,
      functionName: 'addAdmin',
      args: [addressAdmin],
    });
  }

  return { addAdmin, isError, error, isPending, isSuccess };
};
