import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Category from "@/models/CategoryModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(req: NextRequest) {
  try {
    await validateApiRequest(req);
    const categories = await Category.find({});
    return NextResponse.json({ data: categories });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await validateApiRequest(req);
    const category = new Category(reqBody);
    await category.save();
    return NextResponse.json({ data: category });
  } catch (error : any) {
    return NextResponse.json({ message: error.message } , { status: 500 });
  }
}
