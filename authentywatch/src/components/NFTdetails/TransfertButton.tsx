"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

const TransfertButton = () => {
  const [addressToTransfertNFT, setAddressToTransfertNFT] = useState("");

  const handleSubmit = () => {
    console.log("addressToTransfertNFT", addressToTransfertNFT);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-gray-200 hover:opacity-90 hover:text-gray-700"
        >
          Transfert
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently transfert your
            NFT.
          </AlertDialogDescription>

          <Input
            onChange={(e) => setAddressToTransfertNFT(e.target.value)}
            placeholder="Insert the address here"
          ></Input>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>
            Transfert
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TransfertButton;
