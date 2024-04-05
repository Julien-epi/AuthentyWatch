"use client";
import React from "react";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import NFC from "@/utils/assets/NFC.png";
export default function scanNFC() {
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
