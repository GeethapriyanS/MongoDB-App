import { connectDB } from "@/lib/db";
import { ProductModel } from "@/model/productmodel";

// GET all products
export let GET = async (req) => {
  try {
    await connectDB();
    const products = await ProductModel.find(); // use plural for clarity
    return Response.json(
      {
        status: "success",
        data: {
          products,
        },
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      {
        status: "Failed",
        message: err.message || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
};

// POST new product
export let POST = async (req) => {
  try {
    await connectDB();
    const data = await req.json();
    console.log(data);
    
    const product = await ProductModel.create(data);
    return Response.json(
      {
        status: "success",
        data: product,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error("Error creating product:", err);
  return Response.json(
    {
      status: "Failed",
      message: err.message || "Product creation failed",
      error: err, // helpful for debugging
    },
    {
      status: 500,
    }
  );
  }
};
