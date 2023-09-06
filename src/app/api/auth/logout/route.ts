import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      data: null,
      message: "Logout successfully",
      status: 200,
    });

    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.error();
  }
}
