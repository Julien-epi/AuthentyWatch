import Link from "next/link";
import Layout from "@/components/Layout/Layout";

const List = () => {
    return (
        <Layout>
            <div className="pt-24 px-36">
                <h1 className="text-4xl text-center font-bold text-gray-300 pb-8">List of watches</h1>
                <div className="grid md:grid-cols-4 md:gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                        <Card name="Watch name" brand="Rolex" image="https://product-manager.maier.fr/media/products/c0a3360f-cdcd-465f-b968-fb4684e2853c/d14ac76d-f6f0-4a08-9e1f-81c15bd30eb0/M126233-0039_01_upright-landscape.png" key={item} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

interface CardProps {
    name: string;
    brand: string;
    image: string;
}

function Card({ name, brand, image }: CardProps) {
    return (
        <div className="border border-gray-400 bg-slate-900/70 rounded-lg mx-4 p-4 my-2 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-2 duration-500">
            <div className="overflow-hidden rounded-lg h-52 w-full relative">
                <img src={image} alt="NftImage" className="rounded-lg h-52 w-full object-cover text-gray-400" />
            </div>
            <div className="mt-4">
                <p className="text-xl font-bold text-left leading-tight text-gray-300">{name}</p>
                <p className="italic text-left leading-tight text-gray-300">by<label className="text-lightBlue"> @{brand}</label></p>
            </div>
        </div>
    );
}

export default List;