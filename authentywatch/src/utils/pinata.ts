import axios from "axios";

const pinFileToIPFS = async (file: Blob) => {
  const url = process.env.NEXT_PUBLIC_PINATA_URL as string;

  const formData = new FormData();
  formData.append("file", file);

  const headers = {
    pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY!,
    pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET!,
    "Content-Type": "multipart/form-data",
  };
  console.log(
    "🚀 ~ pinFileToIPFS ~ NEXT_PUBLIC_PINATA_API_SECRET:",
    process.env.NEXT_PUBLIC_PINATA_API_SECRET
  );
  console.log(
    "🚀 ~ pinFileToIPFS ~ NEXT_PUBLIC_PINATA_API_KEY:",
    process.env.NEXT_PUBLIC_PINATA_API_KEY
  );

  try {
    const response = await axios.post(url, formData, { headers });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'upload du fichier sur IPFS :", error);
    throw error;
  }
};

export { pinFileToIPFS };
