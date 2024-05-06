import vine,{errors} from "@vinejs/vine";
import { RegisterValidation } from "../Validations/user.validation.js";
import { User } from "../models/user.models.js";

class UserController {
    static async register(req,res){
        try{

            const data = req.body
            const validator = vine.compile(RegisterValidation)
            const payload = await validator.validate(data)
            const existUser = await User.findOne({$or:[{email:payload.email},{username:payload.username}]})
            if(existUser){
                return res.status(408).json({
                    message:"user Already exist"
                })
            }
            const create = await User.create(payload)
            const newData = await User.findById({_id:create._id}).select("-password -refreshToken")
            return res.status(200).json({
                message:"User Created Successful",
                data:newData
            })
            
        }catch(error){
            if (error instanceof errors.E_VALIDATION_ERROR) {
                res.status(400).json({
                    errors:error.messages
                })
            }else{
                res.status(500).json({
                    message:"somthing went wrong"
                })
            }
        }
    }
}

export {UserController}