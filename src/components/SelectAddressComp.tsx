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
    // addresses from store

    const { addresses } = userDataStore()
    // address array for selection
    const [address, setAddress] = useState<address[]>([])
    // address value => get the object id from here
    const [value, setValue] = useState(new Set([]))
    // set selected address
    const [selectedAddress, setSelectedAddress] = useState<address>()
    
    
   
    // set address on page load
    useEffect(() => {
        setAddress(addresses)
    }, [])

    // onchange set the object id
    const handleSelectionChange = (e: any) => {
        setValue(e.target.value)
    }
    // find object by id
    //@ts-expect-error
    const findById = address.find(obj => obj._id === value)
    // set the object which is found
    useEffect(() => {
        setSelectedAddress(findById)
    }, [findById])



    return (
        <div className="flex justify-center items-center border shadow-lg rounded w-[600px] h-[300px] mt-4 px-12">
            <Select
                className="max-w-xl"
                label="Delivery address"
                placeholder="Select an address"
                onChange={handleSelectionChange}
            >
                {
                    address.map((items) => (
                        <SelectItem key={items._id} className="truncate" value={JSON.stringify(items)}>{`${items.name}, ${items.nearByRoadStreet}, ${items.city}, ${items.state}, ${items.pincode}`}</SelectItem>
                    ))
                }

            </Select>

            <div>
                {selectedAddress?.name}
            </div>
        </div>
    );
}
