"use client";
import React, { useEffect } from "react";
import { Tabs } from "antd";
import CategoriesList from "./_components/CategoriesList";
import OrdersList from "./_components/OrdersList";
import ProductsList from "./_components/ProductsList";
import UsersList from "./_components/users/UsersList";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function AdminProfile() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = React.useState(tab || "1");
  const router = useRouter();

  return (
    <div>
      <Tabs
        onTabClick={(key) => {
          router.push(`/admin?tab=${key}`);
          setActiveTab(key);
        }}
        activeKey={activeTab}
      >
        <Tabs.TabPane tab="Products" key="1">
          <ProductsList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Categories" key="2">
          <CategoriesList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Orders" key="3">
          <OrdersList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="4">
          <UsersList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default AdminProfile;
