"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
);

export default function Checkout() {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    axios.post("/api/stripe_client_secret").then((res) => {
      setClientSecret(res.data);
    });
  }, []);

  return (
    clientSecret && (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 my-5">Checkout</h1>
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
          }}
        >
          <CheckoutForm />
        </Elements>
      </div>
    )
  );
}
