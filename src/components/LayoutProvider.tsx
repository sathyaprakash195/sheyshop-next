"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "@/redux/Store";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublic = pathname === "/auth/login" || pathname === "/auth/register";
  
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1F2937",
          },
        }}
      >
        {isPublic ? (
          <PublicLayout>{children}</PublicLayout>
        ) : (
          <PrivateLayout>{children}</PrivateLayout>
        )}
      </ConfigProvider>
    </Provider>
  );
}

export default LayoutProvider;
