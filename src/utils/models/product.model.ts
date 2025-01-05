import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  longDescription: { type: String, required: true },
  price: { type: String, required: true },
  name: { type: String, required: [true, "name req => model"] },
  family: { type: String, required: [true, "family req => model"] },
  series: { type: String, required: [true, "series req => model"] },
  commercialUse: {
    type: String,
    required: [true, "commercialUse req => model"],
  },
  formerCodeName: {
    type: String,
    required: [true, "formerCodeName req => model"],
  },
  architechture: {
    type: String,
    required: [true, "architechture req => model"],
  },
  cpuCores: { type: String, required: [true, "cpuCores req => model"] },
  multithreadingsmt: {
    type: String,
    required: [true, "multithreadingsmt req => model"],
  },
  threads: { type: String, requires: [true, "threads req => model"] },
  maxBoostClock: { type: String, required: [true, "maxBoostClock req"] },
  baseClock: { type: String, required: [true, "baseClock req"] },
  l2Cache: { type: String, required: [true, "l2Cache req"] },
  l3Cache: { type: String, required: [true, "l3Cache req"] },
  defaultTdp: { type: String, required: [true] },
  amdConfigurableTdp: { type: String, required: true },
  processorTechForCores: { type: String, required: true },
  cpuComputeDieSize: { type: String, required: true },
  packageDieCount: { type: String, required: true },
  cpuSocket: { type: String, required: true },
  cpuBoostTech: { type: String, required: true },
  instructionSet: { type: String, required: true },
  supportedExtensions: { type: String, required: true },
  maxOperatingTemp: { type: String, required: true },
  launchDate: { type: String, required: true },
  supportedOs: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
