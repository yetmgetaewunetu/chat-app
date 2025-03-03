import mongoose from "mongoose";

export const connect_db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("connection Successful!, host: ", conn.connection.host);
  } catch (error) {
    console.log("error connecting to database: ", error);
  }
};
