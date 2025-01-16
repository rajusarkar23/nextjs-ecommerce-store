import { create } from "zustand"
import { persist } from "zustand/middleware"

interface orderDetails {
    orderId: string | undefined
    placeOrderAndGetIds: (productId: any, deliveryAddress: any, orderedQty: string) => Promise<void>
}

const orderDetailsStore = create(persist<orderDetails>((set) => ({
    orderId: undefined,
    paymentId: undefined,
    placeOrderAndGetIds: async (productId, deliveryAddress, orderedQty) => {
        console.log("ran123-321");

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId, deliveryAddress, qty: orderedQty })
            })

            const response = await res.json()
            console.log(response);
            if (response.success === true) {
                const data = response.createOrder
                set({ orderId: data._id })
            }

        } catch (error) {
            console.log(error);

        }
    }
}), { name: "order-details" }))

export default orderDetailsStore