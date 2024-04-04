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
    const fetchData = async () => {
      try {
        const response = await NFTService.getAllNft();
        setNfts(response.data);
      } catch (error) {
        console.error("🚀 ~ fetchData ~ error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="pt-24 px-36">
      {isAdmin !== null && (
        <div>
          {isAdmin ? <div className="text-white">Vous êtes un administrateur.</div> : <div className="text-white">Vous n'êtes pas un administrateur.</div>}
        </div>
      )}
        <h1 className="text-4xl text-center font-bold text-gray-300 pb-8">
          List of watches
        </h1>
        <div className="grid md:grid-cols-4 md:gap-2">
          {nfts.map((nft, index) => (
            <Card
              name={nft.name}
              brand={nft.brand}
              image={nft.img_ipfs_link}
              key={index}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default List;
