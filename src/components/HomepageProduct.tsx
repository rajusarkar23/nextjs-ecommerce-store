"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import Link from "next/link";

interface data {
  _id: string;
  title: string;
  longDescription: string;
  price: string;
  series: string;
  name: string;
  family: string;
  commercialUse: boolean;
  formerCodeName: string;
  architechture: string;
  cpuCores: number;
  multithreadingsmt: boolean;
  threads: number;
  maxBoostClock: string;
  baseClock: string;
  l2Cache: string;
  l3Cache: string;
  defaultTdp: string;
  amdConfigurableTdp: string;
  processorTechForCores: string;
  cpuComputeDieSize: string;
  packageDieCount: string;
  cpuSocket: string;
  cpuBoostTech: string;
  instructionSet: string;
  supportedExtensions: string;
  maxOperatingTemp: string;
  launchDate: string;
  supportedOs: string;
  imageUrl: string;
}

export default function HomepageProduct() {
  const [data, setData] = useState<data[]>([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/product", {
        method: "GET",
      });

      const response = await res.json();

      if (response.success === true) {
        setData(response.getproducts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  if (!data || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner color="default" />
        <p className="text-gray-300 font-semibold ml-2">Loading...</p>
      </div>
    );
  }

  return (
    // <div className="flex justify-between">
    //   <div className="space-y-4 flex flex-row mt-8">
    //     {data.map((item, index) => (
    //       <Link href={`/product/${item.title}/${item._id}`} key={index}>
    //         <Card className="ml-2 w-96">
    //           <CardHeader>
    //             <img src={item.imageUrl} alt="image" />
    //           </CardHeader>
    //           <CardBody className="flex justify-center items-center">
    //             <p>{item.title}</p>
    //           </CardBody>
    //         </Card>
    //       </Link>
    //     ))}
        
    //   </div>
    // </div>

    <div className="flex py-4 justify-center">
        {data.map((item, index) => (
          <Link href={`/product/${item.title}/${item._id}`} key={index}>
            <Card className="ml-2 w-96">
              <CardHeader>
                <img src={item.imageUrl} alt="image" />
              </CardHeader>
              <CardBody className="flex justify-center items-center">
                <p>{item.title}</p>
              </CardBody>
            </Card>
          </Link>
        ))}
    </div>
  );
}
