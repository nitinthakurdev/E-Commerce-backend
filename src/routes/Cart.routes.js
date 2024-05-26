import { Router } from "express";
import { AddQty, AddToCart, RemoveCart, RemoveToCart, getCart } from "../controllers/Cart.controller.js";
import { authenticate } from "../middlewares/Authenticate.middleware.js";

const router = Router()

router.route("/add-to-cart").post(authenticate,AddToCart)
router.route("/get-cart").get(authenticate,getCart)
router.route("/remove-cart-item/:id").delete(authenticate,RemoveToCart)
router.route("/remove-cart").delete(authenticate,RemoveCart)
router.route("/add-qty/:id").patch(authenticate,AddQty)

export default router