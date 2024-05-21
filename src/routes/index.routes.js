import { Router } from "express";
import userRouter from "./user.routes.js"
import catrgoryRoute from "./category.routes.js"
import productroutes from "./Product.routes.js"

const router = Router()

router.use("/users",userRouter)
router.use("/category",catrgoryRoute)
router.use("/product",productroutes)

export default router