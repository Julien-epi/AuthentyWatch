"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { pinFileToIPFS } from "@/utils/pinata";
import { NFTService } from "@/services/nftServices";
import { useLastTokenId } from "@/hooks/useLastTokenId";
import { NfcCardService } from "@/services/nfcCardService";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  brand: z.string().min(1, { message: "Brand is required." }),
  serial_number: z.string().min(1, { message: "Serial number is required." }),
  watch_model: z.string().min(1, { message: "Watch model is required." }),
  // nft_id: z.string().min(1, { message: "NFT ID is required." }),
  // nfc_card_id: z.string().min(1, { message: "NFC Card ID is required." }),
  image: z.string().min(1, { message: "File is required." }),
});

const inputValues = [
  { name: "name", type: "text" },
  { name: "brand", type: "text" },
  { name: "serial_number", type: "text" },
  { name: "watch_model", type: "text" },
  // { name: "nft_id", type: "text" },
  // { name: "nfc_card_id", type: "text" },
  { name: "image", type: "file" },
];

const Admin = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const token_id = useLastTokenId();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: inputValues.reduce(
      (acc, curr) => ({ ...acc, [curr.name]: "" }),
      {}
    ),
  });
  const { register, handleSubmit, setValue, watch } = form;

  useEffect(() => {
    register("image" as never);
  }, [register]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      setFile(selectedFile);
      setValue("image" as never, selectedFile.name as never);
    }
  };

  async function writeNfcCard() {
    if (token_id) {
      setLoadingMsg("Please connect the NFC card to the device.");
      try {
        const cardWrite = await NfcCardService.write(token_id);
        const nfc_card_id = cardWrite.data.cardId;
        return nfc_card_id;
      } catch (error) {
        console.error("Erreur lors de l'écriture :", error);
      }
    }
  };

  async function onSubmit(data: any) {
    delete data.image;
    if (file && token_id) {
      setIsLoading(true);
      try {
        const nfc_card_id = await writeNfcCard();
        setLoadingMsg("Generating NFT metadata...");
        const response = await pinFileToIPFS(file);
        if (response) {

          const dataToSubmit = {
            ...data,
            nft_id: token_id.toString(),
            nfc_card_id: nfc_card_id,
            img_ipfs_link: `https://ipfs.io/ipfs/${response.IpfsHash}`
          };
          console.log("dataToSubmit", dataToSubmit);
          toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(dataToSubmit, null, 2)}
                </code>
              </pre>
            ),
          });
          await NFTService.createNft(dataToSubmit);
          toast({
            title: "NFT created successfully!",
            description: "The NFT has been created successfully.",
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'upload :", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong when uploading file.",
          description: "There was a problem with your request.",
        });
      }
      setLoadingMsg("");
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="pt-24">
        <h1 className="text-4xl text-center font-bold text-gray-300 pb-8">
          Create NFT
        </h1>
        <div className="flex justify-center items-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-4xl"
            >
              <div className="grid md:grid-cols-2 gap-6 -mx-3">
                <div className="w-full px-3 mb-6 md:mb-0 space-y-8">
                  {inputValues.slice(0, 4).map(({ name, type }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-gray-500">
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                          </FormLabel>
                          <FormControl>
                            <Input type={type} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <div className="w-full px-3 mb-6 md:mb-0 space-y-8">
                  {inputValues.slice(4).map(({ name, type }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-gray-500">
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                          </FormLabel>
                          <FormControl>
                            {type === "file" ? (
                              <Input type="file" onChange={handleFileChange} />
                            ) : (
                              <Input type={type} {...field} />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Button type="submit" className="mt-12" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
                {isLoading && (
                  <p className="text-sm text-gray-500 mt-2">
                    {loadingMsg}
                  </p>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export default Admin;