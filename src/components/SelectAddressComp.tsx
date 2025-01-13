import userDataStore from "@/store/userDataStore";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
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
    console.log(address);

    useEffect(() => {
        setAddress(addresses)
    }, [])

    return (
        <div className="flex justify-center items-center border shadow-lg rounded w-[600px] h-[300px] mt-4 px-12">
            <Select
                className="max-w-xl"
                label="Delivery address"
                placeholder="Select an address"
            >
                {
                    address.map((items, index) => (
                        <SelectItem key={index} className="truncate">{`${items.name}, ${items.nearByRoadStreet}, ${items.city}, ${items.state}, ${items.pincode}`}</SelectItem>
                    ))
                }

            </Select>
        </div>
    );
}
