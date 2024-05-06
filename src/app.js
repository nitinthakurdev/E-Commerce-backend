import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

// use node middleware

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true,limit:"5mb"}))
app.use(express.static("public"))
app.use(cors())
app.use(cookieParser())


// routes imports
import userRouter from "./routes/user.routes.js"


// routes

app.use("/api/v1/users",userRouter)







export {app}