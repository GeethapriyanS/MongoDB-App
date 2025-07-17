import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const ProductModel = mongoose.models.product || mongoose.model("product", productSchema);