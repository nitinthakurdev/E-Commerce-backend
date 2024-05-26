import {CartModal} from "../models/Cart.models.js";
import {asyncHandler} from "../utils/AsyncHandler.js";

const AddToCart = asyncHandler(async (req, res) => {
  const {product_id, product_qty, product_color} = req.body;

  if (!(product_id || product_qty || product_color)) {
    return res.status(400).json({
      message: `${(!product_id && "Product id is required") || (!product_qty && "Product Quantity is required") || (!product_color && "Product Color is required")}`,
    });
  }

  const find = await CartModal.find({product_id,product_qty,product_color,user_id:req.user?._id});

  if (find.length > 0) {
    return res.status(200).json({
      message: "Item addid in Cart",
    });
  }

  const create = await CartModal.create({
    product_color,
    product_id,
    product_qty,
    user_id: req.user?._id,
  });
  return res.status(200).json({
    message: "Item addid in Cart",
  });
});

const getCart = asyncHandler(async (req, res) => {
  const find = await CartModal.find({user_id: req.user?.id}).populate(
    "product_id"
  );
  if (!find) {
    return res.status(404).json({
      message: "data not found",
    });
  }

  return res.status(200).json({
    message: "Data founded",
    data: find,
  });
});

const RemoveToCart = asyncHandler(async(req,res)=>{
    const {id} = req.params

    const find = await CartModal.findById(id)
    if(!find){
        return res.status(400).json({
            message:"Invalid Id"
        })
    }
    
    const delet = await CartModal.findByIdAndDelete(id)
    return res.status(200).json({
        message:"Item Removed"
    })
})

const AddQty = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {product_qty} = req.body

    const find = await CartModal.findById(id)
    if(!find){
        return res.status(400).json({
            message:"Invalid Id"
        })
    }
    
    const update = await CartModal.findByIdAndUpdate(id,{product_qty})
    return res.status(200).json({
        message:"Add Quantity"
    })
})

const RemoveCart = asyncHandler(async(req,res)=>{
    

    const find = await CartModal.find({user_id:req.user?._id})
    if(!find){
        return res.status(400).json({
            message:"Invalid Id"
        })
    }
   const deleteall = await CartModal.deleteMany({user_id:req.user?._id})
   return res.status(200).json({
    message:"Cart is Empty"
   })
})


export {AddToCart, getCart,RemoveToCart,AddQty,RemoveCart};
