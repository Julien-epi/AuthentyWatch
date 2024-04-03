import { INFT } from "../interfaces/Inft";
import nftSchema from "../models/Nft";


export const createNFTService = async (data: INFT) => {
  // Vérifiez si le nft existe déjà
  const nftExist = await nftSchema.findOne({ name: data.name });
  if (nftExist) {
    throw new Error("nft with this name already exists");
  }

  const newNFT = new nftSchema({
    ...data,
  });
  

  return newNFT.save();
};

export const updateNFTService = async (
  nftId: string,
  data: Partial<INFT>
) => {
  try {
    const nft = await nftSchema.findByIdAndUpdate(nftId, data, {
      new: true,
    });

    if (!nft) {
      throw new Error("NFT not found");
    }

    return nft;
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
    const nft = await nftSchema.findById(nftId);

    if (!nft) {
      throw new Error("NFT not found");
    }

    return nft;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching the NFT");
  }
};

export const deleteNFTService = async (nftId: string) => {
  try {
    const nft = await nftSchema.findByIdAndDelete(nftId);

    if (!nft) {
      throw new Error("NFT not found");
    }

    return { message: "NFT successfully deleted" };
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting the NFT");
  }
};

export const getNFTWithCardIDAndNftIdService = async () => {
  try {
    const nft = await nftSchema.find({
      nfc_card_id: { $exists: true, $ne: '' },
      nft_id: { $exists: true, $ne: '' }
    });

    if (!nft || nft.length === 0) {
      throw new Error("No NFT with specified IDs found");
    }

    return nft;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching NFT with specified IDs");
  }
};


