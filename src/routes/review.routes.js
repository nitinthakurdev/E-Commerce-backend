import { Router } from "express";
import { checkReviewValidation } from "../halper/ValidationSchema.js";
import { CreateReview, GetReview } from "../controllers/reviews.controller.js";

const router = Router()

router.route("/create").post(checkReviewValidation,CreateReview)
router.route("/get").get(GetReview)


export default router