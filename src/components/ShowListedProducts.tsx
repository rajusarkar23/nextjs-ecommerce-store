"use client";

import { useEffect, useState } from "react";
import ShowProductImage from "./ShowProductImage";

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
  imageUrl: string
}

export default function ShowListedProducts() {
  const [data, setData] = useState<data[]>([]);

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

  const getProducts = async () => {
    try {
      const res = await fetch("/api/admin/product", {
        method: "GET",
      });

      const response = await res.json();

      setData(response.getproducts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="flex ml-20 mt-10 mb-8">
        <div className="fixed mt-20 ml-10">
          <ShowProductImage />
        </div>

        <div className="mt-12 ml-64 mr-8">
          <div>
            {data.map((item, index) => (
              <div key={index}>
                <p className="text-2xl font-bold">{item.title}</p>
                <p className="mt-8">{item.longDescription}</p>
                <div className="mt-8 space-x-4">
                  <button className="bg-black text-white px-6 py-2 text-xl font-semibold transition-all hover:scale-105">Buy</button>
                  <button className="bg-orange-600 text-white px-6 py-2 text-xl font-semibold transition-all hover:scale-105">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <table className="table-auto">
              <thead className="border border-gray-500 border-collapse">
                <tr>
                  <th>{tagsObj.tableTitle}</th>
                </tr>
              </thead>
              {data.map((items, index) => (
                <tbody
                  key={index}
                  className="border border-gray-500 border-collapse"
                >
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.name}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.family}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.family}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.commercialUse}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.commercialUse}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.formerCodename}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.formerCodeName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.architechture}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.architechture}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.cpuCores}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.cpuCores}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.multithreading}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.multithreadingsmt}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.threads}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.threads}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.maxBoostClock}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.maxBoostClock}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.baseClock}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.baseClock}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.l2Cache}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.l2Cache}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.l3Cache}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.l3Cache}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.defaultTdp}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.defaultTdp}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.prokcessorTechnology}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.processorTechForCores}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.cpuComputeDie}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.cpuComputeDieSize}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.packageDie}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.packageDieCount}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.cpuSocket}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.cpuSocket}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.instructionSet}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.instructionSet}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.supportedExtension}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.supportedExtensions}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.maxOperatingTemp}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.maxOperatingTemp}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.launchDate}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.launchDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 border-collapse">
                      {tagsObj.osSupport}
                    </td>
                    <td className="border border-gray-500 border-collapse">
                      {items.supportedOs}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
