import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

type ConnectionObj = {
    isConnected?: Number;
}

const connection: ConnectionObj = {}

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
  }
   
const uri = process.env.MONGODB_URI

export const connectDB = async ():Promise<void> => {
    if(connection.isConnected ) {
        console.log("Database already connected");
        return
    }
    try {
        const conn = await mongoose.connect(uri);
        connection.isConnected = conn.connections[0].readyState
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Connection failed - ",error)
        process.exit()
    }
}

let client: MongoClient
const options = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }
 
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}
 
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.


export { client }