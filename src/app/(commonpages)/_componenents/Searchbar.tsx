"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function Searchbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = React.useState(searchParams.get("search") || "");

  useEffect(() => {
    // use debounce to prevent too many requests
    const debounce = setTimeout(() => {
      const params = new URLSearchParams();
      if (value) {
        params.append("search", value);
      }
      router.push(`?${params.toString()}`);
    }, 500);
    return () => clearTimeout(debounce);
  }, [value, router]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default Searchbar;
