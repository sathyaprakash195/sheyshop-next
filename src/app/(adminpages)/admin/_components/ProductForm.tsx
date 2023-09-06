import {
  antdFieldValidation,
  getCatchErrorMessage,
} from "@/helpers/ErrorMessgaes";
import { SetLoading } from "@/redux/LoadersSlice";
import { useEffect } from "react";
import { Button, Form, Upload, message } from "antd";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

function ProductForm({ onFinish, initialValues , files , setFiles }: ProductFormProps) {
  const [images = [], setImages] = React.useState<any>(
    initialValues?.images || []
  );
  const [categories, setCategories] = React.useState<any>([]);
  const dispatch = useDispatch();

  const getCategories = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/admin/categories");
      setCategories(response.data.data);
    } catch (error: unknown) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <Form
      layout="vertical"
      onFinish={(values) =>
        onFinish({
          ...values,
          images,
        })
      }
      initialValues={initialValues}
    >
      <div className="grid grid-cols-3 mt-5 gap-5">
        <div className="col-span-3">
          <Form.Item label="Name" name="name" rules={antdFieldValidation}>
            <input type="text" />
          </Form.Item>
        </div>
        <div className="col-span-3">
          <Form.Item
            label="Description"
            name="description"
            rules={antdFieldValidation}
          >
            <textarea rows={5}></textarea>
          </Form.Item>
        </div>

        <Form.Item label="Price" name="price" rules={antdFieldValidation}>
          <input type="number" />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={antdFieldValidation}>
          <select>
            <option value="">Select Category</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </Form.Item>
        <Form.Item
          label="Count In Stock"
          name="countInStock"
          rules={antdFieldValidation}
        >
          <input type="number" />
        </Form.Item>

        <div className="col-span-3">
          <Upload
            accept="image/*"
            multiple
            beforeUpload={(file) => {
              setFiles((prev: any) => [...prev, file]);
              return false;
            }}
            listType="picture-card"
          >
             Upload Images
          </Upload>
        </div>

        <div className="flex gap-5">
          {images.map((image: any, index: number) => (
            <div
              key={index}
              className="p-5 border-solid border border-gray-300 rounded-md overflow-hidden flex flex-col items-center justify-center gap-2"
            >
              <Image
                className="w-20 h-20 object-cover"
                src={image}
                alt={image}
                width={80}
                height={80}
              />

              <span
                className="underline cursor-pointer text-gray-600"
                onClick={() => {
                  setImages((prev: any) => {
                    const temp = [...prev];
                    temp.splice(index, 1);
                    return temp;
                  });
                }}
              >
                Remove
              </span>
            </div>
          ))}
        </div>

        <div className="col-span-3 flex justify-end">
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default ProductForm;

export interface ProductFormProps {
  onFinish: any;
  initialValues?: any;
  files?: any;
  setFiles?: any;
}
