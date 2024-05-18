import {Router} from "express"
import { LoginUser, RegisterUser} from "../controllers/user.controller.js"
import { checkAuthValidation } from "../halper/authValidation.js"

const router = Router()

router.route("/register").post(checkAuthValidation,RegisterUser)
router.route("/login").post(LoginUser)

export default router
