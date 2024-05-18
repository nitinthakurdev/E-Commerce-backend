import { Router } from "express";
import userRouter from "./user.routes.js"
import catrgoryRoute from "./category.routes.js"

const router = Router()

router.use("/users",userRouter)
router.use("/category",catrgoryRoute)

export default router