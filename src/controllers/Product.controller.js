import { ProductModal } from "../models/Product.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { deleteImage, uploadImage } from "../utils/drive-image-uploader.js";

const CreateProduct = asyncHandler(async (req, res) => {
    const data = req.body;
    const files = req.files;
    const {_id} = req.user

    if (!files || files.length === 0) {
        return res.status(400).json({
            message: "Images field is empty"
        });
    }

    let uploadedImages = [];

    for (const file of files) {
        try {
            const imageData = await uploadImage(file);
            const newImage = {
                ImageUrl: imageData.url,
                Image: imageData.id
            };
            uploadedImages.push(newImage);
        } catch (error) {
            return res.status(500).json({
                message: "Error uploading images",
                error: error.message
            });
        }
    }
    

    const create = await ProductModal.create({...data,product_image:uploadedImages,user_id:_id})

    return res.status(200).json({
        message: "Product Created successfully",
        data: create
    });
});

const GetProduct = asyncHandler(async (req,res)=>{
    const data = await ProductModal.find({})
    return res.status(200).json({
        message:"Product data",
        data
    })
})

const DeleteProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    
    const find = await ProductModal.findById(id)
    if(!find){
        return res.status(400).json({
            message:"Invalid Product Id"
        })
    }

    const files = find.product_image

    for (const file of files) {
       const imageData = await deleteImage(file.Image);            
    }

    const delet = await ProductModal.findByIdAndDelete(id)

    return res.status(200).json({
        message:"Product Delete Successful"
    })

})

export { CreateProduct,GetProduct,DeleteProduct };
