import { create } from "zustand"
import { persist } from "zustand/middleware"

interface userData {
    isLoading: boolean,
    isError: boolean,
    fullName: string,
    email: string,
    isLoggedIn: boolean,
    isSessionAvailable: boolean,
    getUserFromSignin: (email: string, password: string) => Promise<void>,
}

const userDataStore = create(persist<userData>((set) => ({
    isLoading: false,
    isError: false,
    fullName: "",
    email: "",
    isLoggedIn: false,
    isSessionAvailable: false,
    getUserFromSignin: async (email, password) => {
        set({ isLoading: true, isError: false })

        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            const response = await res.json()
            console.log(response);

            if (response.error === false) {
                const userData = response.data;
                console.log(userData);
                set({
                    isLoading: false,
                    fullName: userData.fullName,
                    email: userData.email,
                    isLoggedIn: true,
                    isSessionAvailable: true,
                })

            } else {
                console.log("error!!!fuck");

            }
        } catch (error) {
            console.log("error in signin");
            console.log(error);
        }
    }
}), {name: "user-state"}))

export default userDataStore