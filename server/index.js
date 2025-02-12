import bodyParser from "body-parser"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import {register} from "./controllers/auth.js"
import authRoutes from "./routes/auth.js"
import passwordRoutes from "./routes/password.js"
import securedRoutes from "./routes/secured.js"

dotenv.config()
const app=express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.post("/auth/register",register)

app.use("/auth",authRoutes)
app.use("/password",passwordRoutes)
app.use("/secured",securedRoutes)

const PORT=process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
})
.catch((error)=>console.error(`${error} did not connect`))