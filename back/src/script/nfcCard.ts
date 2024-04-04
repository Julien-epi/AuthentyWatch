const { NFC, KEY_TYPE_A } = require('nfc-pcsc');
import { NfcCardReader } from "../interfaces/InfcCardReader";

export const write = async (text: string) => {
    return await new Promise((resolve, reject) => {
        let nfc = new NFC();

        nfc.on('reader', async (reader: NfcCardReader) => {
            // console.log(`${reader.reader.name}  device attached`);
            reader.on('card', async (card) => {
                const key: string | Buffer | number[] = "FFFFFFFFFFFF"; // key must be a 12-chars HEX string, an instance of Buffer, or array of bytes
                const keyType = KEY_TYPE_A;
                await reader.authenticate(1, keyType, key);
                // write
                try {
                    const data = Buffer.allocUnsafe(16);
                    data.fill(0);
                    // const text = "12463";
                    data.write(text);
                    await reader.write(1, data, 16); // starts writing in block 1, continues in order to write 16 bytes
                    console.log(`data written`);
                } catch (err) {
                    console.error(`error when writing data`, err);
                }
            });

            reader.on('error', (err) => {
                console.log(`${reader.reader.name}  an error occurred`, err);
            });

            reader.on('end', () => {
                console.log(`${reader.reader.name}  device removed`);
            });
        });

        nfc.on('error', (err: any) => {
            console.log('an error occurred', err);
        });
    });
};

export const read = async () => {
    return await new Promise((resolve, reject) => {
        let nfc = new NFC();

        nfc.on('reader', async (reader: NfcCardReader) => {
            // console.log(`${reader.reader.name}  device attached`);

            reader.once('card', async (card) => {
                const key: string | Buffer | number[] = "FFFFFFFFFFFF";
                const keyType = KEY_TYPE_A;
                try {
                    await reader.authenticate(1, keyType, key);
                    const data = await reader.read(1, 16);
                    const payload = data.toString();
                    nfc.close();
                    resolve(payload);
                } catch (err) {
                    console.error(`error when reading data`, err);
                    reject(err);
                }
            });

            reader.once('error', (err) => {
                reject(err);
            });

            reader.once('card.off', card => {
                nfc.close();
            });

            reader.once('end', () => {
                nfc.close();
            });
        });

        nfc.on('error', (err: any) => {
            console.error('an error occurred', err);
            reject(err);
        });
    });
};
