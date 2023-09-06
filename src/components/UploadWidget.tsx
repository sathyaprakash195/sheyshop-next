"use client";
import { Button } from "antd";
import React from "react";

function UploadWidget({
  setImages,
  buttonTitle = "Upload Images",
}: UploadWidgetProps) {
  const cloud_name = "sathya195";

  const { cloudinary }: any = window;
  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloud_name,
      uploadPreset: "sathya9989",
      cropping: true,
    },
    (error : any, result: any) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        setImages((prev: any) => [...prev, result.info.secure_url]);
      }
    }
  );

  return (
    <div>
      <Button onClick={() => myWidget.open()} type="primary">
        {buttonTitle}
      </Button>
    </div>
  );
}

export default UploadWidget;

export interface UploadWidgetProps {
  setImages: any;
  buttonTitle: string;
}
