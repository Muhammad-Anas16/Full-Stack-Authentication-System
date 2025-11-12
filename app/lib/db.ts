import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) return mongoose;
  
  await mongoose.connect(process.env.DATABASE_URL as string);
  isConnected = true;
  console.log("Database connected");
  return mongoose;
}

export async function getClient() {
  const conn = await connectDB();
  return conn.connection.getClient().db();
}