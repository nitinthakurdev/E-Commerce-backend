import { Router } from "express";
import { CreateProduct, DeleteProduct, GetProduct } from "../controllers/Product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { productValidation } from "../halper/authValidation.js";
import { authenticate } from "../middlewares/Authenticate.middleware.js";

const router = Router()


router.route("/create").post(upload.array("product_image"),authenticate,productValidation,CreateProduct)
router.route("/getall").get(GetProduct)
router.route("/delete/:id").delete(authenticate,DeleteProduct)


export default router