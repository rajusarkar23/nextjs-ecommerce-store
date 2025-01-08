"use client";

import { Spinner } from "@nextui-org/spinner";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface data {
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

const tagsObj = {
  tableTitle: "#General Specifications",
  name: "Name",
  family: "Family",
  series: "Series",
  commercialUse: "Commercial Use",
  formerCodename: "Former Codename",
  architechture: "Architechture",
  cpuCores: "CPU Cores",
  multithreading: "Multithreading (SMT)",
  threads: "Threads",
  maxBoostClock: "Max. Boost Clock",
  baseClock: "Base Clock",
  l2Cache: "L2 Cache",
  l3Cache: "L3 Cache",
  defaultTdp: "Default TDP",
  prokcessorTechnology: "Processor Technology for CPU Cores",
  cpuComputeDie: "CPU Compute Die (CCD) Size",
  packageDie: "Package Die Count",
  cpuSocket: "CPU Socket",
  instructionSet: "Instruction Set",
  supportedExtension: "Supported Extensions",
  maxOperatingTemp: "Max. Operating Temperature (Tjmax)",
  launchDate: "Launch Date",
  osSupport: "OS Support",
};

export default function ProductByIdComp() {
  const [data, setData] = useState<data>();
  const [loadig, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(error);
  

  const id = useParams().id;
  const router = useRouter()

  const getPrpoductById = async () => {
    setError(false);
    setLoading(true);
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
        setLoading(false);
      }

      setError(true);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getPrpoductById();
  }, []);

  const goToCheckout = () => {
    return router.push(`/checkout/${id}`)
  }

  if (!data || loadig) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner color="default" />
        <p className="text-gray-300 font-semibold ml-2">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex">
        <div className="">
          <img src={data.imageUrl} alt="product-image" width={600} />
        </div>
        <div className="ml-10">
          <div className="mt-10">
            <p className="text-2xl font-bold">{data.title}</p>
            <p className="mt-8">{data.longDescription}</p>
            <div className="mt-8 space-x-4">
              <button onClick={goToCheckout} className="bg-black text-white px-6 py-2 text-xl font-semibold transition-all hover:scale-105">
                Buy
              </button>
              <button className="bg-orange-600 text-white px-6 py-2 text-xl font-semibold transition-all hover:scale-105">
                Add to cart
              </button>
            </div>
          </div>
          <table className="table-auto mt-20 mr-20">
            <thead className="border border-gray-500 border-collapse">
              <tr>
                <th>{tagsObj.tableTitle}</th>
              </tr>
            </thead>
            <tbody className="border border-gray-500 border-collapse">
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.name}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.name}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.family}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.family}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.commercialUse}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.commercialUse}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.formerCodename}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.formerCodeName}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.architechture}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.architechture}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.cpuCores}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.cpuCores}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.multithreading}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.multithreadingsmt}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.threads}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.threads}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.maxBoostClock}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.maxBoostClock}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.baseClock}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.baseClock}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.l2Cache}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.l2Cache}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.l3Cache}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.l3Cache}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.defaultTdp}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.defaultTdp}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.prokcessorTechnology}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.processorTechForCores}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.cpuComputeDie}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.cpuComputeDieSize}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.packageDie}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.packageDieCount}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.cpuSocket}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.cpuSocket}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.instructionSet}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.instructionSet}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.supportedExtension}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.supportedExtensions}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.maxOperatingTemp}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.maxOperatingTemp}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.launchDate}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.launchDate}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 border-collapse">
                  {tagsObj.osSupport}
                </td>
                <td className="border border-gray-500 border-collapse">
                  {data.supportedOs}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
