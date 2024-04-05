import axios from "axios";
import { API_URL } from "@/utils/url";
import { Inft } from "@/interfaces/Inft";

export function read() {
    return axios.get(API_URL + "/readNfcCard");
}

function write(token_id: number) {
    const data = {
        tokenId: token_id.toString(),
    };
    return axios.post(`${API_URL}/writeNfcCard`, data, {
        headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
    });
}

export const NfcCardService = {
    read,
    write
};
