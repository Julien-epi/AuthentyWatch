"use client";
import TransfertButton from "@/components/NFTdetails/TransfertButton";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAccount } from "wagmi";

const SeparatorData: React.FC<Props> = ({ brand, watch_model, owner }) => {
  const redirectToNFT = () => {
    window.location.href = "https://www.google.com";
  };

  const account = useAccount();

  return (
    <div className="w-1/4 mx-auto">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none text-gray-300">
          {brand}
        </h4>
        <p className="text-sm text-muted-foreground">{watch_model}</p>
      </div>
      <Separator className="my-4" />
      <div className="pt-2 flex h-5 items-center space-x-4 text-sm">
        <div className="text-gray-300">
          <Button
            onClick={redirectToNFT}
            variant="ghost"
            className="text-gray-200 hover:opacity-90 hover:text-gray-700"
          >
            View NFT
          </Button>
        </div>
        <Separator orientation="vertical" />
        <div className="text-gray-300">
          <TransfertButton />
        </div>
        <Separator orientation="vertical" />
        {owner == account.address && (
          <div className="text-gray-300">
            <Badge>Owner</Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeparatorData;
