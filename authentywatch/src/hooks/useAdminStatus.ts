import { useEffect, useState } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import abi from '@/utils/abi.json';
import {address} from '@/utils/address';
const contractAddress = address;

export function useAdminStatus() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { address } = useAccount();

  const { data: isAdminData, isError, isLoading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'isAdmin',
    args: [address], 
  });

  useEffect(() => {

    if (!isLoading && !isError && address) {
      if (typeof isAdminData === 'boolean') {
        setIsAdmin(isAdminData);
      }
    } else if (!address) {
      setIsAdmin(null);
    }
  }, [address, isAdminData, isError, isLoading]);

  return isAdmin;
}
