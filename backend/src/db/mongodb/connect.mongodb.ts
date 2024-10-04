import mongoose from "mongoose";
import SeedData from "./seed";

async function connect(url: string) {
    let environment = process.env.ENVIRONMENT;
    try {
        await mongoose.connect(url);
        console.log(`MongoDB connected successfully in ${environment} mode`);
        SeedData();
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`)
    }
}

export default connect;