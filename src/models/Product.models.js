import mongoose, {Schema} from "mongoose";

const ImageSchema = new Schema({
  ImageUrl: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
});

const productModal = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mrp_price: {
      type: Number,
      required: true,
      trim: true,
    },
    selling_price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
      trim: true,
    },
    product_category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    product_material: {
      type: String,
      required: true,
      trim: true,
    },
    product_brand: {
      type: String,
      required: true,
      trim: true,
    },
    product_skuId: {
      type: String,
      required: true,
      trim: true,
    },
    product_design: {
      type: String,
      required: true,
      trim: true,
    },
    product_warranty: {
      type: String,
      required: true,
      trim: true,
    },
    product_modal: {
      type: String,
      required: true,
      trim: true,
    },
    product_dimantion: {
      type: String,
      required: true,
      trim: true,
    },
    product_color: {
      type: [String],
      required: true,
      trim: true,
    },
    product_inStock: {
      type: Number,
      required: true,
      trim: true,
    },
    product_image: {
      type: [ImageSchema],
      required: true,
    },
    local_charge: {
      type: Number,
      required: true,
    },
    zonal_charge: {
      type: Number,
      required: true,
    },
    national_charge: {
      type: Number,
      required: true,
    },
    local_dedline: {
      type: String,
      required: true,
    },
    zonal_dedline: {
      type: String,
      required: true,
    },
    national_dedline: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
  }]
  },
  {timestamps: true}
);

export const ProductModal = mongoose.model("Product", productModal);
