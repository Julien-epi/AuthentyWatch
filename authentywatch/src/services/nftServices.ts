import axios from "axios";
import { API_URL } from "@/utils/url";
import { Inft } from "@/interfaces/Inft";

export function createNft(data: Inft) {
  return axios.post<Inft>(`${API_URL}/createNFT`, data);
}

function update(id: string, data: Inft) {
  return axios.put(`${API_URL}/update/${id}`, data);
}

function deleteNFT(id: string) {
  return axios.delete(`${API_URL}/delete/${id}`);
}

function getAllNft() {
  return axios.get(API_URL + "/getAllNFT");
}

function getNFTById(id: string) {
  return axios.get(`${API_URL}/getNFTById/${id}`);
}

export const NFTService = {
  createNft,
  update,
  deleteNFT,
  getAllNft,
  getNFTById,
};
