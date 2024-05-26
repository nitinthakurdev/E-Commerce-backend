import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    phone:{
      type:String,
      trim:true
    },
    gender:{
      type:String,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    type:{
      type:String,
      required:true,
    }
  },
  {timestamps: true}
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return  bcrypt.compareSync(password,this.password)
}

userSchema.methods.generateAccesstoken = function(){
    return jwt.sign({id:this._id,username:this.username,email:this.email},process.env.ACCESS_TOKEN)
}
userSchema.methods.generateRefreshtoken = function(){
    return jwt.sign({id:this._id},process.env.REFRESH_TOKEN)
}

export const User = mongoose.model("User", userSchema);
