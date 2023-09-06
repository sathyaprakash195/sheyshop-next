import mongoose from "mongoose";

export async function connectDB() {
    try {
        const mongoUrl = process.env.mongo_url || "";
        await mongoose.connect(mongoUrl);
        console.log("MongoDB Connection Successfull");
    } catch (error) {
        console.log(error);
    }
}