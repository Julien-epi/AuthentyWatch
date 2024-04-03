import { INFT } from "../interfaces/INFT";
import nftSchema from "../models/nft";


export const createNFTService = async (data: INFT) => {
  // Vérifiez si l'investissement existe déjà
  const investmentExist = await nftSchema.findOne({ name: data.name });
  if (investmentExist) {
    throw new Error("Investment with this name already exists");
  }

  const newNFT = new nftSchema({
    ...data,
  });
  console.log(
    "🚀 ~ file: investmentService.ts:34 ~ addInvestmentService ~ newInvestment:",
    newNFT
  );

  return newNFT.save();
};

export const updateNFTService = async (
  nftId: string,
  data: Partial<INFT>
) => {
  try {
    const investment = await nftSchema.findByIdAndUpdate(nftId, data, {
      new: true,
    });

    if (!investment) {
      throw new Error("NFT not found");
    }

    return investment;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating the NFT");
  }
};

export const getAllNFTService = async () => {
  try {
    const nft = await nftSchema.find();

    if (!nft || nft.length === 0) {
      throw new Error("No NFT found");
    }

    return nft;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching NFT");
  }
};

export const getNFTByIdService = async (nftId: string) => {
  try {
    const investment = await nftSchema.findById(nftId);

    if (!investment) {
      throw new Error("NFT not found");
    }

    return investment;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching the NFT");
  }
};
