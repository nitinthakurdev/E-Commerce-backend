import { Router } from "express";

// local imports 
import userRouter from "./user.routes.js"
import catrgoryRoute from "./category.routes.js"
import productroutes from "./Product.routes.js"
import ReviewRouter from "./review.routes.js"
import CartRouter from "./Cart.routes.js"
import addressRoute from './address.routes.js'

const router = Router()

router.use("/users",userRouter)
router.use("/category",catrgoryRoute)
router.use("/product",productroutes)
router.use("/review",ReviewRouter)
router.use("/cart-management",CartRouter)
router.use("/address",addressRoute)

export default router