import vine from "@vinejs/vine";

import { customError } from "./index.validation.js";


vine.errorReporter = () => new customError()



export const ProductSchema = vine.object({
    name:vine.string().minLength(4),
    mrp_price:vine.number(),
    selling_price:vine.number(),
    description:vine.string(),
    product_type:vine.string(),
    product_category:vine.string(),
    product_material:vine.string(),
    product_design:vine.string(),
    product_warranty:vine.string(),
    product_modal:vine.string(),
    product_dimantion:vine.string(),
    product_color:vine.array(vine.string()),
    product_inStock:vine.number(),
    product_brand:vine.string(),
    
})