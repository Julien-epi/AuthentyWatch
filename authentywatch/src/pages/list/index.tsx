import Layout from "@/components/Layout/Layout";
import { Card } from "@/components/Card";
import { NFTService } from "@/services/nftServices";
import { useEffect, useState } from "react";
import { INFT } from "@/interfaces/Inft";
import { useAdminStatus } from "@/hooks/useAdminStatus";

const List = () => {
  const [nfts, setNfts] = useState<INFT[]>([]);
  const isAdmin = useAdminStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await NFTService.getAllNft();
      setNfts(response.data);
    } catch (error) {
      console.error("🚀 ~ fetchData ~ error:", error);
    }
  };

  const handleCardDelete = async () => {
    await fetchData(); 
  };

  return (
    <Layout>
      <div className="pt-24 px-36">
      
        <h1 className="text-4xl text-center font-bold text-gray-300 pb-8">List of watches</h1>
        <div className="grid md:grid-cols-4 md:gap-2">
          {nfts.map((nft, index) => (
            <Card
              key={index}
              id={nft._id}
              name={nft.name}
              brand={nft.brand}
              nftId={nft.nft_id}
              image={nft.img_ipfs_link}
              onCardDelete={handleCardDelete}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default List;
