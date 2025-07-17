import { connectDB } from "@/lib/db";
import { ProductModel } from "@/model/productmodel";
import mongoose from "mongoose";

export let GET = async (req, { params }) => {
  try {
    await connectDB();
    const id = params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ status: "Wrong ID" }, { status: 400 });
    }
    const product = await ProductModel.findById(id);
    if (!product) {
      return Response.json({ status: "Not Found" }, { status: 404 });
    }
    return Response.json({ status: "success", data: { product } }, { status: 200 });
  } catch (err) {
    return Response.json({ status: "Failed", message: err.message }, { status: 500 });
  }
};

export let DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const id = params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ status: "Wrong ID" }, { status: 400 });
    }
    await ProductModel.findByIdAndDelete(id);
    return Response.json({ status: "Product deleted successfully" }, { status: 200 });
  } catch (err) {
    return Response.json({ status: "Failed to delete", message: err.message }, { status: 500 });
  }
};

export let PATCH = async (req, { params }) => {
  try {
    await connectDB();
    const id = params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ status: "Wrong ID" }, { status: 400 });
    }
    const data = await req.json();
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, { new: true });
    return Response.json({ status: "Updated successfully", data: { updatedProduct } }, { status: 200 });
  } catch (err) {
    return Response.json({ status: "Failed", message: err.message }, { status: 500 });
  }
};
