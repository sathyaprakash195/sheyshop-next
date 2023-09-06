import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Product from "@/models/ProductModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const products = await Product.find({}).populate("category");
    return NextResponse.json({ data: products });
  } catch (error : any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}