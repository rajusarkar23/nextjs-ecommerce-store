import { create } from "zustand";
import { persist } from "zustand/middleware";

interface orderStore {
    product: string
    quantity: number,
    address: any
    addAddress: (address: any) => void
}

const useOrderStore = create(persist<orderStore>((set) => ({
    product: "",
    quantity: 1,
    address: null,
    addAddress: (address) => set({ address })
}), { name: "orderData" }))

export default useOrderStore;