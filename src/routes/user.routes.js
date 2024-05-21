import {Router} from "express"
import { LoginUser, LogoutUser, RegisterUser} from "../controllers/user.controller.js"
import { checkAuthValidation } from "../halper/authValidation.js"
import { authenticate } from "../middlewares/Authenticate.middleware.js"

const router = Router()

router.route("/register").post(checkAuthValidation,RegisterUser)
router.route("/login").post(LoginUser)
router.route("/logout").put(authenticate,LogoutUser)

export default router
