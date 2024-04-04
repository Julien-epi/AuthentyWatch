import axios from "axios";
import { API_URL } from "@/utils/url";
import { INFT } from "@/interfaces/Inft";

<<<<<<< HEAD

function createNft(data: INFT) {
  return axios.post<INFT>(`${API_URL}/createNFT`, data);
=======
export function createNft(data: Inft) {
  return axios.post<Inft>(`${API_URL}/createNFT`, data);
>>>>>>> 00a2d7b241235f3883be1431f9d6598fb825ad78
}

function update(id: string, data: INFT) {
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
