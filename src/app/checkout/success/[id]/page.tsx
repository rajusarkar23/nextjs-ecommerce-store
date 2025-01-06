"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const productId = useParams().id;
  const paymentId = searchParams.get("payment_intent");
  const [paymentStatusLoading, setPaymentStatusLoading] = useState(false);
  const [paymentStatusError, setPaymentStatusError] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const getStatusFromStripe = async () => {
    setPaymentStatusLoading(true);
    setPaymentStatusError(false);
    try {
      const res = await fetch("/api/get-payment-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId }),
      });

      const response = await res.json();
      if (response.success === true) {
        setPaymentSuccess(true);
        //send api call to create order
        setPlacingOrder(true);
        try {
          const res = await fetch("/api/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, paymentId }),
          });

          const response = await res.json();
          if (response.success === true) {
            setPlacingOrder(false);
            setOrderPlaced(true);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setPaymentStatusLoading(false);
        setPaymentStatusError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatusFromStripe();
  }, [paymentId]);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div>
        {paymentSuccess ? (
          <div>
            <h2 className="text-xl font-bold text-green-600">
              Your payment was successful.
            </h2>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {placingOrder ? (
        <p className="text-xl font-bold text-orange-500">
          Placing your order...
        </p>
      ) : orderPlaced ? (
        <p className="text-xl font-bold text-green-500">
          Order placed successfully!
          <Link href={"/"} className="text-blue-500">
            Go to orders.
          </Link>
        </p>
      ) : (
        <p className="text-xl font-bold text-orange-500">
          Getting your payment status...
        </p>
      )}
    </div>
  );
};

export default SuccessPage;

// pi_3QeETQSIUIZZDI9X1oBe4NDn
