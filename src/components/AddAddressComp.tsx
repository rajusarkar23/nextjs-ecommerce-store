import userDataStore from "@/store/userDataStore";
import { Button, Form, Input } from "@nextui-org/react";
import { useEffect } from "react";

export default function AddAddressComp() {

    const {getUserAddresses, addresses} = userDataStore()

    const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
            const res = await fetch("/api/user-address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const response = await res.json()

            if (response.error === false) {
                console.log("no error");
                await getUserAddresses()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(addresses);
        
    }, [getUserAddresses])
    return (
        <Form className="flex justify-center items-center border shadow-lg rounded w-[600px] h-[300px] mt-4" onSubmit={onsubmit}>
            <div className="flex justify-center items-center flex-col">
                <div className="grid grid-cols-2 gap-4">
                    <Input name="name" label="Name" type="text" />
                    <Input name="mobile" label="Mobile" type="number" />
                    <Input name="state" label="State" type="text" />
                    <Input name="city" label="City" type="text" />
                    <Input name="nearByRoadStreet" label="Near by/ Road/ Street" type="text" />
                    <Input name="pincode" label="Pincode" type="number" />
                </div>
                <div>
                    <Button
                        variant="ghost"
                        color="primary"
                        size="lg"
                        className="font-bold mt-4"
                        type="submit"
                    >
                        Add address
                    </Button>
                </div>
            </div>
        </Form>
    )
}