import { useEffect, useState } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import abi from '@/utils/abi.json';
import { address } from '@/utils/address';
import { Itxstate } from '@/interfaces/Itxstate';
const contractAddress = address;

export function useTxState(stateId: number) { // 0: mint / 1: burn / 2: updateURI
    const [stateData, setStateData] = useState<Itxstate | null>(null);
    const account = useAccount();

    const { data: state, isError, isLoading } = useReadContract({
        abi,
        address: contractAddress,
        functionName: 'getTxState',
        args: ["0"],
        account: account.address,
    });

    useEffect(() => {
        
        if (!isLoading && !isError) {
            if (typeof state === 'object') {
                setStateData(state as Itxstate);
            }

        } else {
            setStateData(null);
        }
    }, [address, state, isError, isLoading]);

    return stateData;
}
