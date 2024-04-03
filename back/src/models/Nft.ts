import mongoose from "mongoose";
import { INFT } from "../interfaces/INFT";


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
  nfc_card: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<INFT>("Investment", nftSchema);
