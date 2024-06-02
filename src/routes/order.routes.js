import { Router } from "express";
import { authenticate } from "../middlewares/Authenticate.middleware.js";
import { checkOrder } from "../halper/ValidationSchema.js";
import { CreateOrder, GetOrder } from "../controllers/order.controller.js";

const router = Router()

router.route("/create").post(authenticate,checkOrder,CreateOrder)
router.route('/get-order').get(authenticate,GetOrder)

export default router