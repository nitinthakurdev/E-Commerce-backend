import {Router} from "express"
import { LoginUser, LogoutUser, RegisterUser, UpdateUser, getLoginUser} from "../controllers/user.controller.js"
import { checkAuthValidation } from "../halper/authValidation.js"
import { authenticate } from "../middlewares/Authenticate.middleware.js"

const router = Router()

router.route("/register").post(checkAuthValidation,RegisterUser)
router.route("/login").post(LoginUser)
router.route("/logout").put(authenticate,LogoutUser)
router.route("/get-user").get(authenticate,getLoginUser)
router.route("/update-user").post(authenticate,UpdateUser)

export default router
