"use client";
import logo from "@/utils/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <Image src={logo} alt="logo-app" className="w-auto h-10" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-200">AuthentyWatch</h1>
          <p className="max-w-lg mx-auto mt-2 text-gray-400">
            Verify the authenticity of your luxury watches.
          </p>

          <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
            <a
              href="https://www.figma.com/file/7tqH5LtVF5549Crj8S1y5Z/Untitled?type=design&node-id=10%3A60&mode=design&t=4Plcx83m9Hc9bEI6-1"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center order-1 w-full px-2 py-2 mt-3 text-sm tracking-wide capitalize transition-colors duration-300 transform border rounded-md sm:mx-2 border-gray-400 text-gray-300 sm:mt-0 sm:w-auto focus:outline-none focus:ring hover:bg-gray-800 focus:ring-transparent focus:ring-opacity-40"
            >
              <svg
                className="w-5 h-5 mx-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
              </svg>
              <span className="mx-1">View Doc</span>
            </a>

            <a
              href="https://sepolia.etherscan.io/address/0x400a5f8d3636a697973f5be14b222de8aa3074d7"
              target="_blank"
              rel="noreferrer"
              className="w-full px-5 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-darkBlue rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-gray-500 focus:outline-none focus:ring focus:ring-transparent focus:ring-opacity-80"
            >
              Smart Contract
            </a>
          </div>
        </div>

        <hr className="my-10 border-neutral-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-neutral-500">
            © Copyright 2024. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
