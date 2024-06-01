import { Router } from "express";
import { authenticate } from "../middlewares/Authenticate.middleware.js";
import { checkOrder } from "../halper/ValidationSchema.js";
import { CreateOrder } from "../controllers/order.controller.js";

const router = Router()

router.route("/create").post(authenticate,checkOrder,CreateOrder)

export default router