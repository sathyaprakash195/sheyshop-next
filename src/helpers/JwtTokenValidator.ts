import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function validateApiRequest(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  try {
    if (!token) {
      throw new Error("No token found");
    }

    // Verify token
    const decodedToken: any = jwt.verify(token, process.env.jwt_secret || "");
    const userId = decodedToken._id;

    return userId;
  } catch (error : any) {
    throw new Error(error.message);
  }
}
