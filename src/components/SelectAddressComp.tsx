import userDataStore from "@/store/userDataStore";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
interface address {
    state: string,
    city: string,
    nearByRoadStreet: string,
    pincode: number,
    name: string,
    _id: string
}

export default function SelectAddressComp() {
    const { addresses } = userDataStore()
    const [address, setAddress] = useState<address[]>([])
    const [value, setValue] = useState(new Set([]))
    console.log(address);

    console.log(typeof (value));

    useEffect(() => {
        setAddress(addresses)
    }, [])


    const handleSelectionChange = (e: any) => {
        setValue(e.target.value)
    }
    //@ts-expect-error
    const findById = address.find(obj => obj._id === value)
    console.log("ran");

    console.log(findById);


    return (
        <div className="flex justify-center items-center border shadow-lg rounded w-[600px] h-[300px] mt-4 px-12">
            <Select
                className="max-w-xl"
                label="Delivery address"
                placeholder="Select an address"
                onChange={handleSelectionChange}
            >
                {
                    address.map((items, index) => (
                        <SelectItem key={items._id} className="truncate" value={JSON.stringify(items)}>{`${items.name}, ${items.nearByRoadStreet}, ${items.city}, ${items.state}, ${items.pincode}`}</SelectItem>
                    ))
                }

            </Select>
        </div>
    );
}
