import mongoose, { Schema } from "mongoose";


const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    paragraph: {
        type: String,
        required: [true, "Paragraph is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    price: {
        type: String,
        required: [true, "Price required"]
    },
    discountPrice: {
        type: String,
        required: [true, "Discounted price is required."]
    },
    createdBy: {
        type: String,
        required: [true, "Created by is required"]
    }
})

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)

