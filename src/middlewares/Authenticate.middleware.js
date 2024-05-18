import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js";

export const authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.headers("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Unauthtorized",
      });
    }

    const data = jwt.verify(token, process.env.ACCESS_TOKEN);
   
    const user = await User.findById(data.id).select("-password -refreshToken");
    
    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
