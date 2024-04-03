import mongoose from "mongoose";
import { INFT } from "../interfaces/Inft";


const nftSchema = new mongoose.Schema<INFT>({
  name: {
    type: String,
  },
  serial_number: {
    type: String,
    unique: true,
  },
  watch_model: {
    type: String,
  },
  img_ipfs_link: {
    type: String,
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
});

export default mongoose.model<INFT>("NFT", nftSchema);
