import {Router} from "express"
import { UserController} from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(UserController.register)

export default router
