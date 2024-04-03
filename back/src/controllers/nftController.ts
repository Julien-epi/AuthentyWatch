import { Request, Response } from "express";
import {
  createNFTService,
  updateNFTService,
  getAllNFTService,
  getNFTByIdService,
} from "../services/nftServices";

export const createNftController = async (req: Request, res: Response) => {
  try {
    const investment = await createNFTService(req.body);
    res.status(201).send(investment);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};

export const updateNftController = async (req: Request, res: Response) => {
  try {
    const investment = await updateNFTService(req.params.id, req.body);
    res.send(investment);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};

export const getAllNFTController = async (req: Request, res: Response) => {
  try {
    const investments = await getAllNFTService();
    res.send(investments);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};

export const getNFTByIdController = async (req: Request, res: Response) => {
  try {
    const investment = await getNFTByIdService(req.params.id);
    res.send(investment);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};
