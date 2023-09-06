import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import Category from "@/models/CategoryModel";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      category_id: string;
    };
  }
) {
  try {
    await validateApiRequest(req);
    const category = await Category.findById(params.category_id);
    return NextResponse.json({ data: category });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { category_id: string } }
) {
  try {
    await validateApiRequest(req);
    const reqBody = await req.json();
    await Category.updateOne({ _id: params.category_id }, reqBody);
    return NextResponse.json({ message: "category updated successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { category_id: string } }
) {
  try {
    await validateApiRequest(req);
    await Category.deleteOne({ _id: params.category_id });
    return NextResponse.json({ message: "category deleted successfully" });
  } catch (error : any) {
    return NextResponse.json({ message: error.message });
  }
}
