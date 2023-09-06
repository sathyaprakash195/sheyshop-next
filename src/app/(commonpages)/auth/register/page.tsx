"use client";
import React from "react";
import { Form, Button, message } from "antd";
import {
  antdFieldValidation,
  getCatchErrorMessage,
} from "@/helpers/ErrorMessgaes";
import Link from "next/link";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/LoadersSlice";
import { useRouter } from "next/navigation";

function Register() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register", values);
      message.success(response.data.message);
      router.push("/auth/login");
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
            <h1 className="my-5 uppercase font-extrabold text-2xl">Register</h1>

            <hr />

            <Form layout="vertical" onFinish={onFinish} className="mt-5">
              <div className="flex flex-col gap-5">
                <Form.Item label="Name" name="name" rules={antdFieldValidation}>
                  <input type="text" />
                </Form.Item>

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
                  Register
                </Button>

                <Link href="/auth/login" className="text-primary">
                  Already have an account? Login
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
