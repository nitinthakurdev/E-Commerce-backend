import { ReviewModal } from "../models/review.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


const CreateReview = asyncHandler(async(req,res)=>{
    const data = req.body
    
    const create = await ReviewModal.create(data)
    return res.status(200).json({
        message:"Review posted successful",
        data:create
    })
})

const GetReview = asyncHandler(async(req,res)=>{
    const data = await ReviewModal.find({}).populate({
        path: 'user_id',
        select: '-password -refreshToken' 
    })
    return res.status(200).json({
        message:"review Founded",
        data
    })
    
})
export {CreateReview,GetReview}