import { Router } from "express";
import { CreateCategory, DeleteCategory, GetAllcategory, Updatecategory } from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/Authenticate.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()


router.route("/create").post(upload.single("category_image"),authenticate,CreateCategory)
router.route("/delete/:id").delete(authenticate,DeleteCategory)
router.route("/get").get(GetAllcategory)
router.route("/update/:id").patch(upload.single("category_image"),authenticate,Updatecategory)


export default router