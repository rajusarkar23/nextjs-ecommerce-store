import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface userData {
    isLoading: boolean,
    isError: boolean,
    setErrorMessage: string,
    fullName: string,
    userId: string,
    email: string,
    addresses: any,
    isLoggedIn: boolean,
    isSessionAvailable: boolean,
    getUserFromSignin: (email: string, password: string) => Promise<void>,
    getUserAddresses: () => Promise<void>
}

const userDataStore = create(persist<userData>((set) => ({
    isLoading: false,
    isError: false,
    setErrorMessage: "",
    fullName: "",
    userId: "",
    email: "",
    addresses: [],
    isLoggedIn: false,
    isSessionAvailable: false,
    // function to send api reqs
    getUserFromSignin: async (email, password) => {
        set({ isLoading: true, isError: false })
        try {
            // login api req
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            const response = await res.json()
            console.log(response);
            // if error => false
            if (response.error === false) {
                const userData = response.data;
                console.log(userData);
                set({
                    isLoading: false,
                    fullName: userData.fullName,
                    userId: userData._id,
                    email: userData.email,
                    isLoggedIn: true,
                })
                // send api req to get session
                const getSession = await fetch("/api/auth/get-session", {
                    method: "GET"
                })
                const sessionResponse = await getSession.json()
                // if error => false
                if (sessionResponse.error === false) {
                    set({
                        isSessionAvailable: true,
                        isLoading: false
                    })
                } else {
                    set({
                        isError: true,
                        setErrorMessage: sessionResponse.message,
                        isLoading: false
                    })
                }
            } else {
                set({
                    isError: true,
                    setErrorMessage: response.message,
                    isLoading: false
                })
            }
        } catch (error) {
            console.log("error in signin");
            console.log(error);
            set({ isLoading: false })
        }
    },
    getUserAddresses: async() => {
        set({isLoading: true, isError: false})

        try {
            const res = await fetch("/api/user-address",{
                method: "GET"
            })
            const response = await res.json()

            if (response.error === false) {
                console.log(response.getAddresses);
                set({addresses: response.getAddresses,isLoading: false})
            } else {
                set({isLoading: false, isError: true, setErrorMessage: response.message})
            }
        } catch (error) {
            
        }
    }
}), { name: "user" }))

export default userDataStore