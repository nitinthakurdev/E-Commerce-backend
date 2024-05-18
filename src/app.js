import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../swagger.json" assert { type: 'json' };

const app = express()

// use node middleware
app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true,limit:"5mb"}))
app.use(express.static("public"))
app.use(cors())
app.use(cookieParser())

// routes imports
import AllRoutes from "./routes/index.routes.js"

// routes
app.use("/api/v1",AllRoutes)

// implement swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export {app}