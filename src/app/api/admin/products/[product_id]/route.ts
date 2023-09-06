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

export async function PUT(
  req: NextRequest,
  { params }: { params: { product_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    await Product.updateOne({ _id: params.product_id }, reqBody);
    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { product_id: string } }
) {
  try {
    await validateApiRequest(req);
    await Product.deleteOne({ _id: params.product_id });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
