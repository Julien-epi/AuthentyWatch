import { GetServerSideProps } from "next";
import Layout from "@/components/Layout/Layout";
import TableDetails from "@/components/NFTdetails/TableDetails";
import SeparatorData from "@/components/NFTdetails/SeparatorData";
import { useEffect, useState } from "react";
import { getNFTById } from "@/services/nftServices";
import { ICard } from "@/interfaces/Icard";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;

  return {
    props: { slug },
  };
};

const txHistoric = [
  {
    from: "0x4F472991794c32aac39533d673e0669bE70a80cf",
    to: "0x4Faac39533d673e0669bE70a80cf",
    date: "04/04/2024",
  },
  {
    from: "0x4F472991794c32aac39533d673e0669bE70a80cf",
    to: "0x4Faac39533d673e0669bE70a80cf",
    date: "04/04/2024",
  },
  {
    from: "0x4F472991794c32aac39533d673e0669bE70a80cf",
    to: "0x4Faac39533d673e0669bE70a80cf",
    date: "04/04/2024",
  },
];
const ProductPage: React.FC<Props> = ({ slug }) => {

  const [datas, setDatas] = useState<ICard | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getNFTById(slug);
      console.log(res.data.img_ipfs_link);
      
      setDatas(res.data);
    }
    fetch();
  }, [slug]);

  return (
    <Layout>
      <div className="pt-24">
        <h1 className="text-4xl text-center font-bold text-gray-300 pb-8">
          Watch n°{slug}
        </h1>
        <SeparatorData
          brand={datas?.brand}
          watch_model={datas?.name}
          owner={"0x4F472991794c32aac39533d673e0669bE70a80cf"}
        />
        <div className="px-12 pt-12">
          <div className="grid grid-cols-3 gap-6">
            <img
              src={datas?.img_ipfs_link}
              alt="Dynamic Image"
              width={400}
              height={400}
              className="rounded-2xl col-span-1"
            />
            <div className="col-span-2 text-left text-gray-300">
              <TableDetails txHistoric={txHistoric} />
            </div>
          </div>
          <div className="pt-12"></div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;