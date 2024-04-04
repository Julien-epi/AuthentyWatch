import { ICard } from "@/interfaces/Icard";

export const Card = ({ name, brand, image }: ICard) => {
  return (
    <div className="border border-gray-400 bg-slate-900/70 rounded-lg mx-4 p-4 my-2 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-2 duration-500">
      <div className="overflow-hidden rounded-lg h-52 w-full relative">
        <img
          src={image}
          alt="NftImage"
          className="rounded-lg h-52 w-full object-cover text-gray-400"
        />
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold text-left leading-tight text-gray-300">
          {name}
        </p>
        <p className="italic text-left leading-tight text-gray-300">
          by<label className="text-lightBlue"> @{brand}</label>
        </p>
      </div>
    </div>
  );
};
