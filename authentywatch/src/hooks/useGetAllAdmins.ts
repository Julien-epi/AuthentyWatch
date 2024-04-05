import { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import abi from '@/utils/abi.json';
import { address } from '@/utils/address';

const contractAddress = address;

export function useGetAllAdmins() {
  const [admins, setAdmins] = useState<string[]>([]);
  const [error, setError] = useState('');
  const { address } = useAccount();

  const { data, isError, isLoading, error: readError, isSuccess } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'getAdmins',
    account: address
  });

  useEffect(() => {
    if (isError && readError) {
      setError(readError.message);
    } else if (data) {
      const adminAddresses = data as string[];
      setAdmins(adminAddresses);
    }
  }, [data, isError, readError]);

  return { admins, isLoading, isError, error, isSuccess };
}
