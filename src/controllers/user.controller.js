
import {User} from "../models/user.models.js";
import {asyncHandler} from "../utils/AsyncHandler.js";

const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefresh = async (user) => {
  try {
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

const RegisterUser = asyncHandler(async (req, res) => {
  const data = req.body;
  const existUser = await User.findOne({
    $or: [{email: data.email}, {username: data.username}],
  });
  if (existUser) {
    return res.status(408).json({
      message: "user Already exist",
    });
  }
  const create = await User.create(data);
  const newData = await User.findById({_id: create._id}).select(
    "-password -refreshToken"
  );
  const {accessToken, refreshToken} = await generateAccessAndRefresh(newData);

  return res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json({
      message: "user Login successful",
      data:newData,
      accessToken
    });
});

const LoginUser = asyncHandler(async (req,res) => {
  const {username, password} = req.body;

  const user = await User.findOne({
    $or: [{email: username}, {username: username}],
  });

  if (!user) {
    return res.status(400).json({message: "user not exist"});
  }

  const CheckPassword = await user.isPasswordCorrect(password)

  if (!CheckPassword) {
    return res.status(401).json({
      message: "Wrong password",
    });
  }

  const {accessToken, refreshToken} = await generateAccessAndRefresh(user);

  const userdata = await User.findById(user._id).select("-password -refreshToken")
 

  return res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json({
      message: "user Login successful",
      data:userdata,
      accessToken,
    });
})

const LogoutUser = asyncHandler(async(req,res)=>{
  const {_id} = req.user
  await User.findByIdAndUpdate(_id,{$set:{refreshToken:null}})

  return res
    .status(200)
    .clearCookie("AccessToken",  options)
    .clearCookie("RefreshToken", options)
    .json({
      message: "user Logout successful",
    });
})

export {LoginUser, RegisterUser,LogoutUser};
