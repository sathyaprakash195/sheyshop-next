"use client";
import React from "react";
import {
  AddressElement,
  PaymentElement,
  ShippingAddressElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, message } from "antd";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (!stripe || !elements) throw new Error("Stripe.js hasn't loaded yet.");

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required",
      });

      if (result.error) {
        throw result.error.message;
      }

      message.success("Payment successful");
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <AddressElement
        options={{
          allowedCountries: ["US"],
          mode: "shipping",
        }}
      />
      <Button type="primary" htmlType="submit" block className="mt-5">
        Pay
      </Button>
    </form>
  );
}

export default CheckoutForm;
