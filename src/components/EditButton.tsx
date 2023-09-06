import React from "react";

function EditButton({ title, onClick }: EditButtonProps) {
  return (
    <span
      onClick={onClick}
      className="bg-yellow-700 cursor-pointer text-white px-3 py-1"
    >
      {title}
    </span>
  );
}

export default EditButton;

export interface EditButtonProps {
  title: string;
  onClick: any;
}
