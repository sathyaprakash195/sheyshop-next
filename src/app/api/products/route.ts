export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Product from "@/models/ProductModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.nextUrl).searchParams;
    const search =
      searchParams.get("search") !== "undefined"
        ? searchParams.get("search")
        : "";
    await validateApiRequest(req);

    console.log("searchvalue", search);
    const products = await Product.find({
      name: { $regex: search || "", $options: "i" },
    }).populate("category");
    return NextResponse.json({ data: products });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
