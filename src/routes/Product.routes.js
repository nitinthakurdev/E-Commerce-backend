import { Router } from "express";
import { CreateProduct } from "../controllers/Product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()


router.route("/create").post(upload.array("product_image"),CreateProduct)


export default router