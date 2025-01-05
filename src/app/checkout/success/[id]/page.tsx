"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const productId = useParams().id;
  console.log(productId);

  const paymentId = searchParams.get("payment_intent");
  const [paymentStatusLoading, setPaymentStatusLoading] = useState(false);
  const [paymentStatusError, setPaymentStatusError] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  console.log(paymentSuccess);

  console.log(paymentId);

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
      console.log(response);
      if (response.success === true) {
        setPaymentSuccess(true);
        //send api call to create order
        try {
          const res = await fetch("/api/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, paymentId }),
          });

          const response = await res.json();
          console.log(response);
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
        {/* <h2 className="text-xl font-bold text-green-600">
          Your payment was successful.
        </h2>
        <h3>
          Payment id is:-
          <span className="text-blue-600 font-semibold"> {paymentId}</span>
        </h3> */}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-orange-600">
          Your order has been placed.
        </h2>
        <h2 className="text-2xl text-center font-bold text-orange-600">
          {" "}
          Thank you!!
        </h2>
      </div>
      <div className="mt-12 text-blue-600 font-bold">Go to Orders</div>
    </div>
  );
};

export default SuccessPage;
