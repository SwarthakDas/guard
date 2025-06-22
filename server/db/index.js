import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const connectDB=async()=>{
    try {
        const res=await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("DB connected on host: ",res.connection.host)
    } catch (error) {
        console.log("DB connection failed",error)
        process.exit(1)
    }
}

export default connectDB