"use client";

import { Form, Input } from "@nextui-org/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type inputs = {
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
};

export default function TestListComp() {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<inputs>();

  const onsubmut: SubmitHandler<inputs> = async (data) => {
    try {
      const res = await fetch("/api/admin/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      console.log(response);
      
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return <>something went wrong</>;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const resposne = await res.json();
      if (resposne.success === true) {
        const imageUrl = resposne.url;

        setValue("imageUrl", imageUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onsubmut)}
      className="grid grid-cols-2 gap-6 mt-4 ml-4"
    >
      <Input
        label="Title"
        labelPlacement="outside"
        placeholder="Title"
        {...register("title")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Description"
        labelPlacement="outside"
        placeholder="Write down description"
        {...register("longDescription")}
        size="lg"
        className="w-96"
      />
      <Input
        label="Price"
        labelPlacement="outside"
        placeholder="Price for this product?"
        {...register("price")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Name"
        labelPlacement="outside"
        placeholder="Name of this product?"
        {...register("name")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Family"
        labelPlacement="outside"
        placeholder="Product family?"
        {...register("family")}
        className="w-96"
        size="lg"
      />{" "}
      <Input
        label="Series"
        labelPlacement="outside"
        placeholder="Series of this product?"
        {...register("series")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Commercial use"
        labelPlacement="outside"
        placeholder="Is this for commercial use?"
        {...register("commercialUse")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Former code name"
        labelPlacement="outside"
        placeholder="Former code name of this product?"
        {...register("formerCodeName")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Architechture"
        labelPlacement="outside"
        placeholder="Architecture of this product?"
        {...register("architechture")}
        className="w-96"
        size="lg"
      />
      <Input
        label="CPU cores"
        labelPlacement="outside"
        placeholder="CPU cores for this product?"
        {...register("cpuCores")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Multithreading (SMT)"
        labelPlacement="outside"
        placeholder="Multithreading (SMT) ?"
        {...register("multithreadingsmt")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Threads"
        labelPlacement="outside"
        placeholder="Threads of this product?"
        {...register("threads")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Max boost clock"
        labelPlacement="outside"
        placeholder="What is the max boost clock?"
        {...register("maxBoostClock")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Base clock"
        labelPlacement="outside"
        placeholder="What is the base clock?"
        {...register("baseClock")}
        className="w-96"
        size="lg"
      />
      <Input
        label="L2 cache"
        labelPlacement="outside"
        placeholder="L2 cache?"
        {...register("l2Cache")}
        className="w-96"
        size="lg"
      />
      <Input
        label="L3 cache"
        labelPlacement="outside"
        placeholder="L3 cache?"
        {...register("l3Cache")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Default tdp"
        labelPlacement="outside"
        placeholder="What is the default tdp of this product?"
        {...register("defaultTdp")}
        className="w-96"
        size="lg"
      />
      <Input
        label="AMD configurable tdp"
        labelPlacement="outside"
        placeholder="AMD configurable tdp"
        {...register("amdConfigurableTdp")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Processor tech for cores"
        labelPlacement="outside"
        placeholder="Processor tech for cores?"
        {...register("processorTechForCores")}
        className="w-96"
        size="lg"
      />
      <Input
        label="CPU compute die size"
        labelPlacement="outside"
        placeholder="CPU compute die size"
        {...register("cpuComputeDieSize")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Package die count"
        labelPlacement="outside"
        placeholder="Package die count?"
        {...register("packageDieCount")}
        className="w-96"
        size="lg"
      />
      <Input
        label="CPU socket"
        labelPlacement="outside"
        placeholder="CPU socket"
        {...register("cpuSocket")}
        className="w-96"
        size="lg"
      />
      <Input
        label="CPU boost tech"
        labelPlacement="outside"
        placeholder="CPU boost tech"
        {...register("cpuBoostTech")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Instruction Set"
        labelPlacement="outside"
        placeholder="Instruction Set"
        {...register("instructionSet")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Supported extensions"
        labelPlacement="outside"
        placeholder="Supported extensions"
        {...register("supportedExtensions")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Max. Operating Temperature"
        labelPlacement="outside"
        placeholder="Max. Operating Temperature"
        {...register("maxOperatingTemp")}
        className="w-96"
        size="lg"
      />
      <Input
        label="Launch date"
        labelPlacement="outside"
        placeholder="Launch date"
        {...register("launchDate")}
        className="w-96"
        size="lg"
      />
      <Input
        label="OS Support"
        labelPlacement="outside"
        placeholder="OS Support"
        {...register("supportedOs")}
        className="w-96"
        size="lg"
      />
      <Input type="file" onChange={uploadImage} />
      <Input
        className="hidden"
        type="text"
        hidden={true}
        {...register("imageUrl")}
      />
      <div>
        <input
          type="submit"
          className="bg-orange-400 p-2 px-4 font-bold text-white rounded"
        />
      </div>
    </Form>
  );
}
