    import mongoose,{Schema} from "mongoose";

    const product = new Schema({
        productId:{
            type:Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        product_qty:{
            type:Number,
            required:true
        },
        product_color:{
            type:String,
            required:true
        },
        sellerId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }

    })

    const orderSchema = new Schema({
        address_id:{
            type:Schema.Types.ObjectId,
            ref:"Address",
            required:true
        },
        payement_method:{
            type:String,
            required:true,
            trim:true
        },
        payement_status:{
            type:String,
            trim:true
        },
        product:{
            type:[product],
            required:true
        },
        delivery_status:{
            type:String,
            required:true,
            default:"pending"
        },
        user_id:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },{timestamps:true})

    export const  Ordermodel = mongoose.model("Order",orderSchema)