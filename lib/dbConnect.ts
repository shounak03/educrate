import mongoose from "mongoose";

type ConnectionObj = {
    isConnected?: Number;
}

const connection: ConnectionObj = {}

const connectDB = async ():Promise<void> => {
    if(connection.isConnected ) {
        console.log("Database already connected");
        return
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || "")
        connection.isConnected = conn.connections[0].readyState
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Connection failed - ",error)
        process.exit()
    }
}

export default connectDB;