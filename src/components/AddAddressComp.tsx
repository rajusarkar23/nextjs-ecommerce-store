import { Button, Input } from "@nextui-org/react";

export default function AddAddressComp() {
    return (
        <div className="flex flex-col justify-center items-center mt-5 border w-[600px] py-8 rounded shadow-md">
            <div className="grid grid-cols-2 gap-4">
                <Input label="Name" type="text" />
                <Input label="Mobile" type="text" />
                <Input label="State" type="text" />
                <Input label="City" type="text" />
                <Input label="Near by/ Road/ Street" type="text" />
                <Input label="Pincode" type="text" />
            </div>
            <Button
                variant="ghost"
                color="primary"
                size="lg"
                className="font-bold mt-4"
            >
                Add address
            </Button>
        </div>
    )
}