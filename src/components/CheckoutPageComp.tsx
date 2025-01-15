"use client";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { Slider, SliderValue } from "@nextui-org/slider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddAddressComp from "./AddAddressComp";
import userDataStore from "@/store/userDataStore";

interface data {
  title: string;
  price: string;
  imageUrl: string;
}

interface address {
  state: string,
  city: string,
  nearByRoadStreet: string,
  pincode: number,
  name: string,
  _id: string
}

interface address {
  state: string,
  city: string,
  nearByRoadStreet: string,
  pincode: number,
  name: string,
  _id: string
}

export default function CheckoutPageComp() {
  const id = useParams().id;
  const [quantityValue, setQuantityValue] = useState("1");
  const [data, setData] = useState<data>();
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const { addresses } = userDataStore()

  const [address, setAddress] = useState<address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<address>()
  const [value, setValue] = useState(new Set([]))



  useEffect(() => {
    setAddress(addresses)
  }, [])


  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/product/by-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const response = await res.json();

      if (response.success === true) {
        setData(response.find);
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAddress = async () => {
    try {
      const res = await fetch("/api/user-address", {
        method: "GET"
      })

      const response = await res.json()

      console.log(response);

    } catch (error) {
      console.log(error);

    }
  }

  const goForCheckout = () => {
    return router.push(`/checkout/stripe/${id}`);
  };

  useEffect(() => {
    fetchProduct();
    getUserAddress()
  }, []);

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


  if (!data || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner color="default" />
        <p className="text-gray-300 font-semibold ml-2">Loading...</p>
      </div>
    );
  }
  const priceToNumber = Number(data.price);

  return (
    <>
      <div className="mt-8 flex flex-col justify-center items-center">
        <div className="flex flex-row border w-[600px] py-8 rounded shadow-md">
          <div>
            <img src={data.imageUrl} alt="image" width={100} />
          </div>
          <div className="ml-8 ">
            <p className="text-2xl font-semibold">{data.title}</p>
            <p className="text-xl font-semibold">Price: INR {priceToNumber}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-5 border w-[600px] py-8 rounded shadow-md">
          <div>
            <Slider
              className="w-48"
              defaultValue={1}
              label="Quantity"
              maxValue={20}
              minValue={1}
              step={1}
              onChange={(e: SliderValue) => setQuantityValue(e.toString())}
            />
          </div>
          <div>
            <p className="text-xl font-semibold">
              Your quantity is
              <span className="text-blue-600">
                &quot;{quantityValue}&quot;
              </span>
            </p>
          </div>
        </div>
        <div>
          {
            address.length > 0 ? (<div className="flex justify-center items-center border shadow-lg rounded w-[600px] h-[300px] mt-4 px-12">
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

            </div>) : (<AddAddressComp />)
          }


        </div>
        <div className="flex flex-col justify-center items-center mt-5 border w-[600px] py-8 rounded shadow-md">
          <Button
            variant="shadow"
            color="primary"
            size="lg"
            className="font-bold"
            onPress={goForCheckout}
          >
            Pay ₹{priceToNumber}

          </Button>
          <div>
            {selectedAddress?.name}
          </div>
        </div>
      </div>
    </>
  );
}
