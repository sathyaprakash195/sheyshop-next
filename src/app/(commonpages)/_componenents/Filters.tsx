/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { SetLoading } from "@/redux/LoadersSlice";
import { message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, usePathname , useSearchParams } from "next/navigation";

function Filters() {
  const [filters, setFilters] = React.useState({
    categories: [],
  } as any);
  const router = useRouter();
  const pathname = usePathname();
    const searchParams = useSearchParams();
  const [categories, setCategories] = React.useState([]);
  const dispatch = useDispatch();
  const getCategories = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/admin/categories");
      setCategories(response.data.data);
    } catch (error: any) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };
  React.useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categories.length > 0) {
      params.append("categories", filters.categories.join("_"));
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [filters]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700 col-span-6">
        Filters
      </h1>
      <div className="flex flex-col gap-10 mt-5">
        <div className="flex flex-col gap-5">
          {categories.map((category: any) => (
            <div className="flex gap-2 items-center w-52" key={category._id}>
              <input
                type="checkbox"
                className="w-3 h-3"
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      categories: [...filters.categories, category._id],
                    });
                  } else {
                    delete filters.categories[
                      filters.categories.indexOf(category._id)
                    ];
                    setFilters({ ...filters });
                  }
                }}
              />
              <h1 className="text-sm">{category.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
