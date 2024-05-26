import mongoose,{Schema} from "mongoose";

const cartSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product_id:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    product_qty:{
        type:Number,
        required:true,
        trim:true
    },
    product_color:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

export const CartModal = mongoose.model("Cart",cartSchema)