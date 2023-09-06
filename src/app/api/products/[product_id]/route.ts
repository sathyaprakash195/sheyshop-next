import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Product from "@/models/ProductModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      product_id: string;
    };
  }
) {
  try {
    await validateApiRequest(req);
    const product = await Product.findById(params.product_id);
    return NextResponse.json({ data: product });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
