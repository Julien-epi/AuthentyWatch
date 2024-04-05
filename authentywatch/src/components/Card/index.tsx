import { ICard } from "@/interfaces/Icard";
import { Trash2 } from "lucide-react";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { NFTService } from "@/services/nftServices";
import { toast } from "@/components/ui/use-toast";
import { useRemoveNFT } from "@/hooks/useRemoveNft";

export const Card = ({ id, nftId, name, brand, image, onCardDelete }: ICard & { onCardDelete: () => Promise<void> }) => {
  const isAdmin = useAdminStatus();

  const {
    removeNFT,
    isError: isErrorRemoveNFT,
    error: errorRemoveNFT,
    isPending: isPendingRemoveNFT,
    isSuccess: isSuccessRemoveNFT,
  } = useRemoveNFT();

  const deleteCard = async () => {
    try {
      await NFTService.deleteNFT(id); 
      await removeNFT(nftId); 
      toast({
        color: "green",
        title: "NFT deleted successfully.",
        duration: 4000,
      });
      onCardDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'NFT :", error);
    }
  };


  if (isSuccessRemoveNFT) toast({ color: "green", title: "NFT deleted successfully.", duration: 4000 });
  if (isErrorRemoveNFT) toast({ color: "red", title: "NFT errors deleted  ", duration: 4000 });

  return (
    <div className="border border-gray-400 bg-slate-900/70 rounded-lg mx-4 p-4 my-2 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-2 duration-500">
      <div className="overflow-hidden rounded-lg h-52 w-full relative">
        <img src={image} alt="NftImage" className="rounded-lg h-52 w-full object-cover text-gray-400" />
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold text-left leading-tight text-gray-300">{name}</p>
        <p className="italic text-left leading-tight text-gray-300">
          by<label className="text-lightBlue"> @{brand}</label>
        </p>
        {isAdmin && (
          <button className="mt-4" onClick={deleteCard} type="button">
            <Trash2 color="red" size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
