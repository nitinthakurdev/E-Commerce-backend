import {Router} from "express"
import { UserController} from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(UserController.register)
router.route("/login").post(UserController.login)

export default router
