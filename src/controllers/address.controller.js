import {AddressModel} from "../models/address.models.js"
import { asyncHandler } from "../utils/AsyncHandler.js"


const CreateAddress = asyncHandler(async(req,res)=>{
    const data = req.body
    
    const find = await AddressModel.find(data)
    if(find.length > 0){
        return res.status(404).json({
            message:"Address is Already register"
        })
    }
    const create = await AddressModel.create({...data,user_id:req.user?._id})

    return res.status(201).json({
        message:"Address Aided successful",
        data:create
    })
})

const GetAllAddress = asyncHandler(async(req,res)=>{
    const find = await AddressModel.find({user_id:req.user?._id})

    return res.status(200).json({
        message:"Data founded",
        data:find
    })
})

const DeletAddress = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const find = await AddressModel.findById(id)
    if(!find){
        return res.status(400).json({
            message:"Invalid Credentials "
        })
    }
    const over = await AddressModel.findByIdAndDelete(id)
    return res.status(200).json({
        message:"Address deleted Successful"
    })
})

export {CreateAddress,GetAllAddress,DeletAddress}