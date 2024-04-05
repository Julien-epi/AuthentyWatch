import axios from "axios";
import { API_URL } from "@/utils/url";
import { Inft } from "@/interfaces/Inft";

 function createNft(data: Inft) {
  return axios.post<Inft>(`${API_URL}/createNFT`, data, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    },
  });
}

function update(id: string, data: Inft) {

  return axios.put(`${API_URL}/update/${id}`, data);
}

export function deleteNFT(id: string) {
  return axios.delete(`${API_URL}/delete/${id}`);
}

export function getAllNft() {
  return axios.get(API_URL + "/getAllNFT");
}

export function getNFTById(id: string) {
  return axios.get(`${API_URL}/getNFTById/${id}`);
}

export const NFTService = {
  createNft,
  update,
  deleteNFT,
  getAllNft,
  getNFTById,
};
