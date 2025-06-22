import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config()
connectDB()
.then(()=>{
    app.listen(process.env.PORT||3002,()=>{
        console.log(`Server running on PORT ${process.env.PORT}`)
    })
})
.catch((err)=>console.error("DB connection failed. ",err))