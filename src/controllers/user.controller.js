import vine, {errors} from "@vinejs/vine";
import {RegisterValidation} from "../Validations/user.validation.js";
import {User} from "../models/user.models.js";
import bcrypt from "bcryptjs";

const generateAccessAndRefresh = async (user) => {
  try {
    // const user = await User.findById({user});
    
    const accessToken = user.generateAccesstoken();
    const refreshToken = user.generateRefreshtoken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});
    return {refreshToken, accessToken};
  } catch (err) {
    console.log("gen token error");
    res.status(500).json({
      message: "Somthing Went Wrong",
    });
  }
};

class UserController {
  static async register(req, res) {
    try {
      const data = req.body;
      const validator = vine.compile(RegisterValidation);
      const payload = await validator.validate(data);
      const existUser = await User.findOne({
        $or: [{email: payload.email}, {username: payload.username}],
      });
      if (existUser) {
        return res.status(408).json({
          message: "user Already exist",
        });
      }
      
      const create = await User.create(payload);
      const newData = await User.findById({_id: create._id}).select(
        "-password -refreshToken"
      );
      return res.status(200).json({
        message: "User Created Successful",
        data: newData,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
       return  res.status(400).json({
          errors: error.messages,
        });
      } else {
        return res.status(500).json({
          message: "somthing went wrong",
        });
      }
    }
  }

  static async login(req, res) {
    try {
      const {username, password} = req.body;

      const user = await User.findOne({
        $or: [{email: username}, {username: username}],
      });

      if (!user) {
        return res.status(400).json({message: "user not exist"});
      }

      const comoarePassword = bcrypt.compareSync(password, user.password);
      if (!comoarePassword) {
       return  res.status(401).json({
          message: "Wrong password",
        });
      }

      const {accessToken,refreshToken} = await generateAccessAndRefresh(user)

      const options = {
        httpOnly:true,
        secure:true
      }

      return res.status(200)
      .cookie("AccessToken",accessToken,options)
      .cookie("RefreshToken",refreshToken,options)
      .json({
        message:"user Login successful",
        accessToken
      })

    } catch (err) {
      console.log("login user error",err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export {UserController};
