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
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    const product = new Product(reqBody);
    await product.save();
    return NextResponse.json({ data: product });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
