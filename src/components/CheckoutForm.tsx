"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useParams } from "next/navigation";
import orderDetailsStore from "@/store/orderDetails";
/* eslint-disable @typescript-eslint/no-explicit-any */
const CheckoutForm = ({ amount, qty, deliveryAddress, }: { amount: number, qty: string, deliveryAddress: any, }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { placeOrderAndGetIds, orderId } = orderDetailsStore()
  const productId = useParams().id

  console.log(orderId);






  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 100 * amount, qty }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount, qty]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    // send order api call here

    await placeOrderAndGetIds(productId, deliveryAddress, qty)

    // same above destructure example
    await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://nextjs-ecommerce-store-sooty.vercel.app/checkout/process-order/${productId}`,
      },
    });

    setLoading(false);
  };


  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}


      {errorMessage && <div className="text-black">{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full px-5 py-3 bg-blue-500 hover:bg-blue-600 transition-all mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"

      >
        {!loading ? `Pay ₹${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutForm;
