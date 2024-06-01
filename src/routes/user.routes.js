import {Router} from "express"
import { GetOrderSeller, LoginUser, LogoutUser, Payement, RegisterUser, UpadteAvatar, UpdateUser, UserGetOrder, getLoginUser} from "../controllers/user.controller.js"
import { checkAuthValidation } from "../halper/authValidation.js"
import { authenticate } from "../middlewares/Authenticate.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(checkAuthValidation,RegisterUser)
router.route("/login").post(LoginUser)
router.route("/logout").put(authenticate,LogoutUser)
router.route("/get-user").get(authenticate,getLoginUser)
router.route("/update-user").post(authenticate,UpdateUser)
router.route("/avatar").patch(authenticate,upload.single("avatar"),UpadteAvatar)
router.route("/user-get-order").get(authenticate,UserGetOrder)
router.route("/seller-get-order").get(authenticate,GetOrderSeller)


// payement route 

router.route("/payement").post(Payement)



export default router
