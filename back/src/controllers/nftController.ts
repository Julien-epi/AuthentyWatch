import { Request, Response } from "express";
import {
  createNFTService,
  updateNFTService,
  getAllNFTService,
  getNFTByIdService,
  deleteNFTService,
  getNFTWithCardIDAndNftIdService
} from "../services/nftServices";

export const createNftController = async (req: Request, res: Response) => {
  try {    
    const nft = await createNFTService(req.body);
    res.status(201).send(nft);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: (error as Error).message });
}
};

export const updateNftController = async (req: Request, res: Response) => {
  try {
    const nft = await updateNFTService(req.params.id, req.body);
    res.send(nft);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};

export const getAllNFTController = async (req: Request, res: Response) => {
  try {
    const nft = await getAllNFTService();
    res.send(nft);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};

export const getNFTByIdController = async (req: Request, res: Response) => {
  try {
    const nft = await getNFTByIdService(req.params.id);
    res.send(nft);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};

export const deleteNftController = async (req: Request, res: Response) => {
  try {
    const result = await deleteNFTService(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
};

export const getNFTWithCardIDAndNftIdController = async (req: Request, res: Response) => {
  try {
    const nfts = await getNFTWithCardIDAndNftIdService();
    res.send(nfts);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
};
