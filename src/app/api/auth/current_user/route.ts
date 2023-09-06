import { connectDB } from "@/config/DbConfig";
import { validateApiRequest } from "@/helpers/JwtTokenValidator";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await validateApiRequest(request);
    const user = await User.findById(userId).select("-password");
    return NextResponse.json(
      {
        data: user,
        message: "Current user fetched successfully",
      },
      { status: 200 }
    );
  } catch (error : any) {
    return NextResponse.json(
      {
        data: null,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
