/* eslint-disable @next/next/no-img-element */
"use client";
import { getCatchErrorMessage } from "@/helpers/ErrorMessgaes";
import { SetLoading } from "@/redux/LoadersSlice";
import { Button, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AddItemToCart } from "@/redux/CartSlice";
import { RootStore } from "@/redux/Store";
import { ProductType } from "@/interfaces";

function ProductInfo({ params }: { params: { product_id: string } }) {
  const { items } = useSelector((state: RootStore) => state.cart);
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/products/${params.product_id}`);
      setProduct(response.data.data);
      setSelectedImage(response.data.data.images[0]);
    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-10">
      <Button onClick={() => router.back()}>Back To Products</Button>
      {product && (
        <div className="grid md:grid-cols-2 mt-8 grid-cols-1">
          <div className="flex gap-10 mt-12">
            <div className="flex flex-col gap-5">
              {product?.images.map((image: any) => (
                <img
                  src={image}
                  alt={product.name}
                  className={`p-2 w-16 h-16 object-contain border border-solid border-gray-300 cursor-pointer ${
                    selectedImage === image && "border-blue-500"
                  }`}
                  onClick={() => setSelectedImage(image)}
                  key={image}
                />
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <img
                src={selectedImage}
                alt={product?.name}
                className="w-96 h-96 object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-semibold text-gray-700">
              {product?.name}
            </h1>
            <h1 className="text-lg font-semibold text-gray-700">
              $ {product?.price}
            </h1>
            <h1 className="text-sm text-gray-500">{product?.description}</h1>

            <div className="flex gap-5">
              <Button
                type="default"
                onClick={() => {
                  dispatch(AddItemToCart(product));
                  message.success("Product Added To Cart");
                }}
                disabled={items.find((item: ProductType) => item._id === product._id)}
              >
                Add to cart
              </Button>
              <Button type="primary" onClick={() => router.push("/cart")}>
                View Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
