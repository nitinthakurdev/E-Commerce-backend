import {CategoryModal} from "../models/category.models.js";
import {asyncHandler} from "../utils/AsyncHandler.js";
import {DeleteOnCloudinary, UploadOnCloudinary} from "../utils/cloudnary.js";
import fs from "fs";

const CreateCategory = asyncHandler(async (req, res) => {
  const {category_name} = req.body;
  const file = req.file?.path;

  if (!category_name) {
    fs.unlinkSync(file);
    return res.status(400).json({
      message: "Category Name is required",
    });
  }

  if (!file) {
    fs.unlinkSync(file);
    return res.status(400).json({
      message: "Image is required",
    });
  }

  const find = await CategoryModal.findOne({category_name});
  if (find) {
    fs.unlinkSync(file);
    return res.status(404).json({
      message: "Category already Exist",
    });
  }

  const response = await UploadOnCloudinary(file);
  fs.unlinkSync(file);
  const Create = await CategoryModal.create({
    category_name,
    category_image: response.secure_url,
    public_id: response.public_id,
    user_id:req.user._id
  });
  return res.status(200).json({
    message: "Category Created Successful",
    data: Create,
  });
});

const DeleteCategory = asyncHandler(async (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.status(401).json({
      message: "Category id not found",
    });
  }
  const find = await CategoryModal.findById({_id: id});
  if (!find) {
    return res.status(404).json({
      message: "Category dose note exist",
    });
  }
  const result = await DeleteOnCloudinary(find.public_id);

  await CategoryModal.findByIdAndDelete({_id: id});
  return res.status(200).json({
    message: "Category deleted successful",
  });
});

const Updatecategory = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const {category_name, category_image} = req.body;
  const file = req.file?.path;
  if (!category_name) {
    fs.unlinkSync(file);
    return res.status(401).json({
      message: "category name is required ",
    });
  }


  const find = await CategoryModal.findById(id);

  if(!find){
    fs.unlinkSync(file);
    return res.status(404).json({message:"Invalid id "})
  }
  let imagepath ;
  if(file){
    await DeleteOnCloudinary(find.public_id)
    imagepath = await UploadOnCloudinary(file)
    fs.unlinkSync(file);
  }

  const newData = {
    category_name,
    category_image:category_image || imagepath.secure_url,
    public_id:imagepath?.public_id || find?.public_id
  }
  await CategoryModal.findByIdAndUpdate(id,newData)
  return  res.status(200).json({
    message:"category updated successful"
  })
});

const GetAllcategory = asyncHandler(async(req,res)=>{
    const data = await CategoryModal.find({})
    return res.status(200).json({
        message:"Category data",
        data
    })
})

export {CreateCategory, DeleteCategory, Updatecategory,GetAllcategory};
