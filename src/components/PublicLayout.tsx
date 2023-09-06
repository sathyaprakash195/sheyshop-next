"use client";
import { RootStore } from "@/redux/Store";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function PublicLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useSelector((state: RootStore) => state.loaders);
  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
}

export default PublicLayout;
