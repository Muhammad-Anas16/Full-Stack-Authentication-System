// import mongoose from "mongoose";

// let isConnected = false;

// async function connectDB() {
//     if (isConnected) return mongoose;

//     await mongoose.connect(process.env.DATABASE_URL);
//     isConnected = true;
//     console.log("Database connected");
//     return mongoose;
// }

// export async function getClient() {
//     const conn = await connectDB();
//     return conn.connection.getClient().db();
// }

import mongoose from "mongoose";

let isConnected = false;

const MONGO_URI = process.env.DATABASE_URL;

if (!MONGO_URI) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

async function connectDB() {
  if (isConnected) return mongoose;

  if (!mongoose.connection.readyState) {
    await mongoose.connect(MONGO_URI, {
      maxPoolSize: 10,
    });
    isConnected = true;
    console.log("Database connected");
  }
  return mongoose;
}

export async function getClient() {
  const conn = await connectDB();
  return conn.connection.getClient().db();
}