import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.stripe_secret_key!);

export async function POST() {
  try {
    // return client_secret
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 520*100,
      currency: "usd",
      description: "Example charge",

      // Verify your integration in this guide by including this parameter
      metadata: { integration_check: "accept_a_payment" },
      
    });

    return NextResponse.json(paymentIntent.client_secret);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
