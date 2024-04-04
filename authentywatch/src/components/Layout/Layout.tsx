"use client";

import React from "react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
const Layout = ({ children }: any) => {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-between">
      <Navbar />
      <div className="bg-black">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
