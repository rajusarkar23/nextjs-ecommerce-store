"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const productId = useParams();
  console.log(productId);
  
  const paymentId = searchParams.get("payment_intent");


  const getStatusFromStripe = async () => {
    try {
      const res = await fetch("/api/get-payment-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId }),
      });

      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatusFromStripe();
  }, [paymentId]);

  return (
   <div>
    {paymentId}
   </div>
  );
};

export default SuccessPage;

// pi_3QeETQSIUIZZDI9X1oBe4NDn
