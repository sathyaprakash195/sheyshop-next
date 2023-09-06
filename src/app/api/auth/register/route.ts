import { connectDB } from "@/config/DbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/UserModel";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // check if user already exists
    const userExists = await User.findOne({ email: reqBody.email });
    if (userExists) {
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;

    // create user
    await User.create(reqBody);

    return NextResponse.json({
      message: "User created successfully",
    });
  } catch (error : any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
