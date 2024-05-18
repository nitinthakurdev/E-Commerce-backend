import mongoose,{Schema} from "mongoose";


const categorySchema = new Schema({
    category_name:{
        type:String,
        require:true,
        lowercase: true,
    },
    category_image:{
        type:String,
        require:true
    },
    public_id:{
        type:String,
        require:true
    }
},{timestamps:true})

export const CategoryModal = mongoose.model("Category",categorySchema)