import React from "react";

function PageTitle({ title }: { title: string }) {
  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold text-gray-600 w-full">{title}</h1> 
    </div>
  );
}

export default PageTitle;
