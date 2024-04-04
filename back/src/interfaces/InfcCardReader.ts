export interface NfcCardReader {
    reader: {
        name: string;
    };
    once: (event: string, callback: (data: any) => void) => void;
    on: (event: string, callback: (data: any) => void) => void;
    close: () => void;
    authenticate: (blockNumber: number, keyType: number, key: string | Buffer | number[]) => Promise<void>;
    write: (blockNumber: number, data: Buffer, blockSize: number) => Promise<void>;
    read: (blockNumber: number, length: number) => Promise<Buffer>;
}