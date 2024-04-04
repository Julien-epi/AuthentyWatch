"use client";

import React from "react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
