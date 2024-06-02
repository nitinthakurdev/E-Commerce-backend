import { CartModal } from "../models/Cart.models.js"
import { Ordermodel } from "../models/order.models.js"
import { asyncHandler } from "../utils/AsyncHandler.js"


const CreateOrder = asyncHandler(async(req,res)=>{
    const data = req.body

    if(data.product.length === 0){
        return res.status(400).json({
            message:"Product is required"
        })
    }
    const create = await Ordermodel.create({...data,user_id:req.user?._id})
    if(data?.payement_status != "cancel"){
        const deleteall = await CartModal.deleteMany({user_id:req.user?._id})
    }
    return res.status(201).json({
        message:"Product Ordered successful"
    })
})

const GetOrder = asyncHandler(async(req,res)=>{
    const data = await Ordermodel.find({}).populate("address_id")

    return res.status(200).json({
        data
    })
})



export {
    CreateOrder,
    GetOrder
}