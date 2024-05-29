import {User} from "../models/user.models.js";
import {asyncHandler} from "../utils/AsyncHandler.js";
import {DeleteOnCloudinary, UploadOnCloudinary} from "../utils/cloudnary.js";
import fs from "fs";
import Stripe from 'stripe';


const stripe = new Stripe(process.env.secret_key_payement);

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
      data: newData,
      accessToken,
    });
});

const LoginUser = asyncHandler(async (req, res) => {
  const {username, password} = req.body;

  const user = await User.findOne({
    $or: [{email: username}, {username: username}],
  });

  if (!user) {
    return res.status(400).json({message: "user not exist"});
  }

  const CheckPassword = await user.isPasswordCorrect(password);

  if (!CheckPassword) {
    return res.status(401).json({
      message: "Wrong password",
    });
  }

  const {accessToken, refreshToken} = await generateAccessAndRefresh(user);

  const userdata = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json({
      message: "user Login successful",
      data: userdata,
      accessToken,
    });
});

const LogoutUser = asyncHandler(async (req, res) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {$set: {refreshToken: null}});

  return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json({
      message: "user Logout successful",
    });
});

const getLoginUser = asyncHandler(async (req, res) => {
  return res.status(200).json({message: "Login user", data: req.user});
});

const UpdateUser = asyncHandler(async (req, res) => {
  const {fullName, phone, gender} = req.body;

  const update = await User.findByIdAndUpdate(
    req.user?._id,
    {fullName, phone, gender},
    {new: true}
  ).select("-password -refreshToken");
  return res.status(200).json({
    message: "user Updated Successful",
    data: update,
  });
});

const UpadteAvatar = asyncHandler(async (req, res) => {
  const file = req.file?.path;
  if (!file) {
    return res.status(400).json({
      message: "File is empty",
    });
  }

  const oldFile = req?.user?.avatar?.public_id;
  if (oldFile) {
    await DeleteOnCloudinary(oldFile);
  }

  const response = await UploadOnCloudinary(file);
  fs.unlinkSync(file);
  const avatar = {
    imageUrl: response.secure_url,
    public_id: response.public_id,
  };
  const update = await User.findByIdAndUpdate(
    req.user?._id,
    {avatar: avatar},
    {new: true}
  ).select("-password -refreshToken");
  return res.status(200).json({
    message: "Profile Updated",
    data: update,
  });
});

// /payement gateway

const Payement = asyncHandler(async (req, res) => {

    const data = req.body;

    const lineItems = data?.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item?.name,
          images: [item?.image],
        },
        unit_amount: Math.floor(item.price * 100),
      },
      quantity: item.product_qty,
    }));

    
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
      });

      
      return res.status(200).json({
        sessionId: session.id,
      });
    

});

export {
  LoginUser,
  RegisterUser,
  LogoutUser,
  getLoginUser,
  UpdateUser,
  UpadteAvatar,
  Payement,
};
