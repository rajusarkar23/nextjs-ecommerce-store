"use client";
import { Button, Input } from "@nextui-org/react";
import { Slider, SliderValue } from "@nextui-org/slider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddAddressComp from "./AddAddressComp";

interface data {
  title: string;
  price: string;
  imageUrl: string;
}

export default function CheckoutPageComp() {
  const id = useParams().id;
  const [quantityValue, setQuantityValue] = useState("1");
  const [data, setData] = useState<data>();
  const router = useRouter();

  const fetchProduct = async () => {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAddress = async() => {
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

  if (!data) {
    return <div>no data</div>;
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
         <AddAddressComp />
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
        </div>
      </div>
    </>
  );
}
