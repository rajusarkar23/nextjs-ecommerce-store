import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
  throw new Error("Invalid mongo URI.");
}

async function dbConnection() {
  if (connection.isConnected) {
    console.log("Already connected to the DB.");
    return;
  }
  try {
    const db = await mongoose.connect(MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    return;
  } catch (error) {
    return error;
  }
}

export default dbConnection;
