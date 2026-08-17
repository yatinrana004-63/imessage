import mongoose from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8","0.0.0.0"]);
export async function connectDb() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    const conn  =await mongoose.connect(mongoUri);
   console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
    
  }
};
export default connectDb;