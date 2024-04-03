import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton";
// import { FaSun, FaMoon } from "react-icons/fa";
import logo from "@/utils/assets/logo.png"
import Image from "next/image";

export default function Navbar() {
  //   const { darkMode, setDarkMode } = useContext(AuthContext);

  return (
    <div className="sticky flex top-0 z-10 bg-gray-200 dark:bg-gray-800 py-4">
        <Link href="/">
          <Image src={logo} alt="logo-app" className="px-4 py-2 border-black dark:border-gray-200 text-black dark:text-gray-200 hover:border-gray-300 hover:text-gray-400 h-12 w-16" />
        </Link>
      <div className="mx-auto px-4 flex justify-center items-center space-x-6 text-black dark:text-gray-200">

        <Link href="/admin">
          <p className="px-4 py-2 border-2 border-black dark:border-gray-200 text-black dark:text-gray-200 hover:border-gray-300 hover:text-gray-400 rounded-xl">
            Admin
          </p>
        </Link>

        <Link href="/uploadNFT">
          <p className="px-4 py-2 border-2 border-black dark:border-gray-200 text-black dark:text-gray-200 hover:border-gray-300 hover:text-gray-400 rounded-xl">
          uploadNFT
          </p>
        </Link>

        <Link href="/list">
          <p className="px-4 py-2 border-2 border-black dark:border-gray-200 text-black dark:text-gray-200 hover:border-gray-300 hover:text-gray-400 rounded-xl">
            NFT List
          </p>
        </Link>

        <Link href="/nftDetail">
          <p className="px-4 py-2 border-2 border-black dark:border-gray-200 text-black dark:text-gray-200 hover:border-gray-300 hover:text-gray-400 rounded-xl">
            NFT Detail
          </p>
        </Link>

        <ConnectWalletButton />

      </div>
    </div>
  );
}
