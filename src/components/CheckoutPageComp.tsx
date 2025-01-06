"use client";
import { Input } from "@nextui-org/react";
import { Slider, SliderValue } from "@nextui-org/slider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const goForCheckout = () => {
    return router.push(`/checkout/stripe/${id}`);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!data) {
    return <div>no data</div>;
  }
  const priceToNumber = Number(data.price);

  return (
    <>
      <div className="mt-8 flex flex-col justify-center items-center">
        <div className="flex flex-row border  w-[600px] py-8 rounded shadow-md">
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
              <span className="text-blue-600"> "{quantityValue}"</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-5 border w-[600px] py-8 rounded shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Name" type="text" />
            <Input label="Mobile" type="text" />
            <Input label="State" type="text" />
            <Input label="City" type="text" />
            <Input label="Near by/ Road/ Street" type="text" />
            <Input label="Pincode" type="text" />
          </div>
          <button className="bg-black text-white px-6 py-3 text-xl font-semibold transition-all hover:scale-105 mt-4">
            Add address
          </button>
        </div>
        <div className="flex flex-col justify-center items-center mt-5 border w-[600px] py-8 rounded shadow-md">
          <button
            className="bg-orange-500 text-white px-6 py-3 text-xl font-semibold transition-all hover:scale-105 mt-4"
            onClick={goForCheckout}
          >
           Pay ₹{priceToNumber}
          </button>
        </div>
      </div>
    </>
  );
}
