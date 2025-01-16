"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Spinner } from "@nextui-org/spinner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined.");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

interface data {
  title: string;
  price: string;
  imageUrl: string;
}

interface compProps {
  qty: string
  /* eslint-disable @typescript-eslint/no-explicit-any */
  deliveryAddress: any

}

const StripeCheckout: React.FC<compProps> = ({ qty, deliveryAddress }) => {
  const [data, setData] = useState<data>();
  const [loading, setLoading] = useState(false)
  const id = useParams().id;
  const getProductDetails = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/product/by-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const response = await res.json();
      if (response.success === true) {
        setData(response.find);
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);


  if (!data || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner color="default" />
        <p className="text-gray-300 font-semibold ml-2">Loading...</p>
      </div>
    );
  }

  const priceToNumber = Number(data.price);
  return (
    <main className="flex justify-center items-center mt-20">
      <div className="w-[500px] p-2 text-white text-center border m-10 rounded-md bg-blue-600">
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: priceToNumber * 100,
            currency: "inr",
          }}
        >
          <CheckoutForm amount={priceToNumber} qty={qty} deliveryAddress={deliveryAddress} />
        </Elements>
      </div>
    </main>
  );
};

export default StripeCheckout;
