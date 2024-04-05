import { useEffect, useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import abi from '@/utils/abi.json';
import { address } from '@/utils/address';
const contractAddress = address;

export function useLastTokenId() {
    const [lastTokenId, setLastTokenId] = useState<number | null>(null);
    const { writeContract } = useWriteContract();

    const { data: tokensCounterData, isError, isLoading } = useReadContract({
        abi,
        address: contractAddress,
        functionName: 'ids',
    });

    useEffect(() => {

        if (!isLoading && !isError) {
            console.log('tokensCounterData', tokensCounterData);
            
            if (typeof tokensCounterData === 'bigint') {
                setLastTokenId(parseInt(tokensCounterData.toString()));
            }
        } else {
            setLastTokenId(null);
        }
    }, [address, tokensCounterData, isError, isLoading]);

    return lastTokenId;
}
