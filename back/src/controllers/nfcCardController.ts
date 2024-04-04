const { NFC, KEY_TYPE_A } = require('nfc-pcsc');
import { Request, Response } from "express";
import { read, write } from "../script/nfcCard";

export const readNfcCard = async (req: Request, res: Response) => {
    const tokenId = await read();
    console.log(tokenId);
    res.json({ tokenId });
};

export const writeNfcCard = async (req: Request, res: Response) => {
    if(!req.body.tokenId) return res.status(400).json({ message: "Missing tokenId" });
    write(req.body.tokenId);
    res.json({ message: "NFC card written" });
};