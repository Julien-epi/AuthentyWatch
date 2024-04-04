import { GetServerSideProps } from "next";
import Layout from "@/components/Layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;
  const imageUrl = `https://picsum.photos/200/${slug}`;

  return {
    props: { imageUrl, slug },
  };
};

interface Props {
  imageUrl: string;
}

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
const ProductPage: React.FC<Props> = ({ imageUrl, slug }) => {
  return (
    <Layout>
      <div className="pt-24">
        <h1 className="text-4xl text-center font-bold text-gray-300 pb-8">
          Watch n°{slug}
        </h1>
        <h1>Image Dynamique Basée sur le Slug</h1>
        <div className="px-12">
          <div className="grid grid-cols-2 gap-6">
            <img
              src={imageUrl}
              alt="Dynamic Image"
              width={300}
              height={300}
              className="rounded-2xl col-span-1"
            />
            <div className="col-span-1"></div>
          </div>
          <div className="pt-12">
            <h2 className="text-gray-300 text-center font-bold">
              Txs historic
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] hover:text-gray-100">
                    FROM
                  </TableHead>
                  <TableHead className="hover:text-gray-100">TO</TableHead>
                  <TableHead className="text-right hover:text-gray-100">
                    DATE
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {txHistoric.map((tx) => (
                  <TableRow key={tx.from}>
                    <TableCell className="font-medium text-gray-500 hover:text-gray-100">
                      {tx.from}
                    </TableCell>
                    <TableCell className="text-gray-500 hover:text-gray-100">
                      {tx.to}
                    </TableCell>
                    <TableCell className="text-right text-gray-500 hover:text-gray-100">
                      {tx.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
