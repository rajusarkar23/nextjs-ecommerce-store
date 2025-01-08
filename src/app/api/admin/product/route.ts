import dbConnection from "@/utils/db/db";
import { Product } from "@/utils/models/product.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    title,
    longDescription,
    price,
    name,
    family,
    series,
    commercialUse,
    formerCodeName,
    architechture,
    cpuCores,
    multithreadingsmt,
    threads,
    maxBoostClock,
    baseClock,
    l2Cache,
    l3Cache,
    defaultTdp,
    amdConfigurableTdp,
    processorTechForCores,
    cpuComputeDieSize,
    packageDieCount,
    cpuSocket,
    cpuBoostTech,
    instructionSet,
    supportedExtensions,
    maxOperatingTemp,
    launchDate,
    supportedOs,
    imageUrl,
  } = await req.json();

  await dbConnection();
  try {
    await Product.create({
      title,
      longDescription,
      price,
      name,
      family,
      series,
      commercialUse,
      formerCodeName,
      architechture,
      cpuCores,
      multithreadingsmt,
      threads,
      maxBoostClock,
      baseClock,
      l2Cache,
      l3Cache,
      defaultTdp,
      amdConfigurableTdp,
      processorTechForCores,
      cpuComputeDieSize,
      packageDieCount,
      cpuSocket,
      cpuBoostTech,
      instructionSet,
      supportedExtensions,
      maxOperatingTemp,
      launchDate,
      supportedOs,
      imageUrl,
    });
    return NextResponse.json({
      success: true,
      message: "Listed successfully.",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  await dbConnection();
  try {
    const getproducts = await Product.find({});
    return NextResponse.json({ success: true, getproducts });
  } catch (error) {
    console.log(error);
  }
}
