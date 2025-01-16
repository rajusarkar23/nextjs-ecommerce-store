"use client"

import orderDetailsStore from "@/store/orderDetails";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function ProcessOrderComp() {
    const [loading, setLoading] = useState(false)
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
    const [placingOrder, setPlacingOrder] = useState(false)
    const [isOrderPlaced, setIsOrderPlaced] = useState(false)

    const paramsSearch = useSearchParams()
    const paymentId = paramsSearch.get("payment_intent")

    const getPaymentStatus = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/get-payment-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ paymentId })
            })
            const response = await res.json()
            if (response.success === true) {
                setIsPaymentSuccess(true)
                setPlacingOrder(true)
                const orderId = orderDetailsStore.getState().orderId
                try {
                    console.log(paymentId);

                    const res = await fetch("/api/order", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ orderId })
                    })
                    const response = await res.json()
                    if (response.error === false) {
                        setLoading(false)
                        setPlacingOrder(false)
                        setIsOrderPlaced(true)
                        console.log("order placed");

                    }
                    console.log(response);
                    setLoading(false)
                } catch (error) {
                    console.log(error);
                }
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPaymentStatus()
    }, [paymentId])


    return (
        <div className="flex justify-center items-center mt-20">
            {
                loading ? (<p className="text-2xl font-bold">Loading....</p>) : (<p className="text-2xl font-bold">Order placed.</p>)
            }
            {
                isPaymentSuccess ? (<p>Payment success</p>) : (<p></p>)
            }
            {
                placingOrder ? (<p>Placing order</p>) : (<></>)
            }
            {
                isOrderPlaced ? (<p>Order placed</p>) : (<></>)
            }
        </div>
    )
}