import { ProductModal } from "../models/Product.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { deleteImage, uploadImage } from "../utils/drive-image-uploader.js";

const CreateProduct = asyncHandler(async (req, res) => {
    const data = req.body;
    const files = req.files;

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
    

    const create = await ProductModal.create({...data,product_image:uploadedImages})

    return res.status(200).json({
        message: "Product Created successfully",
        data: create
    });
});

export { CreateProduct };
