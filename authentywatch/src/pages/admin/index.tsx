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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { pinFileToIPFS } from "@/utils/pinata";
import { createNft } from "@/services/nftServices";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  brand: z.string().min(1, { message: "Brand is required." }),
  serial_number: z.string().min(1, { message: "Serial number is required." }),
  watch_model: z.string().min(1, { message: "Watch model is required." }),
  nft_id: z.string().min(1, { message: "NFT ID is required." }),
  nfc_card_id: z.string().min(1, { message: "NFC Card ID is required." }),
  image: z.string().min(1, { message: "File is required." }),
});

const inputValues = [
  { name: "name", type: "text" },
  { name: "brand", type: "text" },
  { name: "serial_number", type: "text" },
  { name: "watch_model", type: "text" },
  { name: "nft_id", type: "text" },
  { name: "nfc_card_id", type: "text" },
  { name: "image", type: "file" },
];

export default function Admin() {
  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: inputValues.reduce(
      (acc, curr) => ({ ...acc, [curr.name]: "" }),
      {}
    ),
  });
  const { register, handleSubmit, setValue, watch } = form;

  useEffect(() => {
    register("image"); 
  }, [register]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      setFile(selectedFile);
      setValue("image", selectedFile.name);
    }
  };

  async function onSubmit(data: any) {
    delete data.image;
    if (file) {
      try {
        const response = await pinFileToIPFS(file);
        if (response) {
          const dataToSubmit = { ...data, img_ipfs_link: response.IpfsHash };
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
          const NFTcreated = await createNft(dataToSubmit);
        }
      } catch (error) {
        console.error("Erreur lors de l'upload :", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong when uploading file.",
          description: "There was a problem with your request.",
        });
      }
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
                <Button type="submit" className="mt-12">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
