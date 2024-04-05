"use client";
import React, { useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import NFC from "@/utils/assets/NFC.png";
import { NfcCardService } from "@/services/nfcCardService";
import { useRouter } from "next/router";
export default function scanNFC() {

  const router = useRouter();

  useEffect(() => {

    async function fetchData() {
      console.log("Scanning NFC Card");
      const response = await NfcCardService.read();
      const nftId = response.data.tokenId;
      if (nftId) {
        router.push(`/details/${nftId}`);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="pt-24">
        <h1 className="text-4xl text-center font-bold text-gray-300 pb-8">
          Scan Your NFC Card
        </h1>
        <div className="flex justify-center items-center w-full">
          <Image
            src={NFC}
            width={500}
            height={500}
            alt={"nfclogo"}
            className="filter grayscale rounded-2xl"
          />
        </div>
      </div>
    </Layout>
  );
}
