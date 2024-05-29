import { Router } from "express";
import {checkAddress} from "../halper/ValidationSchema.js"
import { authenticate } from "../middlewares/Authenticate.middleware.js";
import { CreateAddress, DeletAddress, GetAllAddress } from "../controllers/address.controller.js";

const router = Router()

router.route("/create").post(authenticate,checkAddress,CreateAddress)
router.route("/get").get(authenticate,GetAllAddress)
router.route("/delete/:id").delete(authenticate,DeletAddress)

export default router