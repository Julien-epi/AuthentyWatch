import mongoose from "mongoose";
import { INFT } from "../interfaces/Inft";

const nftSchema = new mongoose.Schema<INFT>({
  name: {
    type: String,
    required: true,
  },
  serial_number: {
    type: String,
    required: true,

    unique: true,
  },
  watch_model: {
    type: String,
    required: true,
  },
  img_ipfs_link: {
    type: String,
    required: true,
  },
  nft_id: {
    type: String,
    required: true,
    unique: true,
  },
  nfc_card_id: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<INFT>("NFT", nftSchema);
