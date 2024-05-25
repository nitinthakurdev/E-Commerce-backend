import mongoose,{Schema} from "mongoose";


const reviewSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    descrition:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        required:true,
        trim:true
    }
},{timestamps:true})

export const ReviewModal = mongoose.model("Review",reviewSchema)