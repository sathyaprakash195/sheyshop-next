/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Form, Button, message } from "antd";
import {
  antdFieldValidation,
  getCatchErrorMessage,
} from "@/helpers/ErrorMessgaes";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

function Login() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", values);
      message.success(response.data.message);
      router.push("/");
    } catch (error) {
      message.error(getCatchErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="bg-primary flex items-center justify-center">
        <h1 className="text-7xl text-red-500">Shey</h1>
        <h1 className="text-7xl text-blue-500">-</h1>
        <h1 className="text-7xl text-yellow-500">Shop</h1>
      </div>
      <div className="items-center justify-center flex">
        <div className="w-96 xl:w-[500px]">
          <div>
            <h1 className="my-5 uppercase font-extrabold text-2xl">Login</h1>

            <hr />

            <Form layout="vertical" onFinish={onFinish} className="mt-5">
              <div className="flex flex-col gap-5">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={antdFieldValidation}
                >
                  <input type="email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={antdFieldValidation}
                >
                  <input type="password" />
                </Form.Item>

                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={loading}
                >
                  Login
                </Button>

                <Link href="/auth/register" className="text-primary">
                  Dont have an account? Register
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
