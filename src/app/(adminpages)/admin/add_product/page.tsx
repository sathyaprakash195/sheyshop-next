"use client";
import React from "react";
import ProductForm from "../_components/ProductForm";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/LoadersSlice";
import axios from "axios";
import { Button, message } from "antd";
import PageTitle from "@/components/PageTitle";
import { useRouter } from "next/navigation";
import { uploadImages } from "@/helpers/imageUploadAndDelete";

function AddProduct() {
  const [files, setFiles] = React.useState<any>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      values.images = await uploadImages(files);
      await axios.post("/api/admin/products", values);
      message.success("Product Added Successfully");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Add Product" />

        <div className="flex gap-5">
          <Button
            onClick={() => {
              router.push("/admin?tab=1");
            }}
          >
            cancel
          </Button>
          <Button type="primary" htmlType="submit">
            save
          </Button>
        </div>
      </div>
      <ProductForm onFinish={onFinish} files={files} setFiles={setFiles} />
    </div>
  );
}

export default AddProduct;
