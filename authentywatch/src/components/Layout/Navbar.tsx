import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton";
// import { FaSun, FaMoon } from "react-icons/fa";
import logo from "@/utils/assets/logo.png";
import Image from "next/image";

export default function Navbar() {
  //   const { darkMode, setDarkMode } = useContext(AuthContext);

  return (
    <div className="fixed w-full flex justify-between items-center px-6 top-0 z-10 bg-black/20 backdrop-blur border-b border-neutral-600 py-1">
      <div className="flex items-center space-x-6 text-gray-200">
        <Link href="/">
          <Image
            src={logo}
            alt="logo-app"
            className="dark:border-gray-200 text-gray-200 border-gray-300 w-14 object-contain"
          />
        </Link>

        <Link href="/list" className="hover:text-lightBlue duration-200">
          NFT List
        </Link>
        <Link href="/scanNFC" className="hover:text-lightBlue duration-200">
          Scan
        </Link>
        <Link href="/admin" className="hover:text-lightBlue duration-200">
          Admin
        </Link>
      </div>

      <ConnectWalletButton />
    </div>
  );
}
