import vine, {errors} from "@vinejs/vine";
import {RegisterValidation} from "../Validations/user.validation.js";
import { ProductSchema} from "../Validations/product.validation.js";

export const checkAuthValidation = async (req, res, next) => {
  try {
    const data = req.body;
    const validator = vine.compile(RegisterValidation);
    const payload = await validator.validate(data);
    next();
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({
        error: error.messages,
      });
    }else{
      return res.status(500).json({
        message:"internal server error"
      })
    }
  }
};

export const productValidation = async (req, res, next) => {
  try {
    const data = req.body
    const validator = vine.compile(ProductSchema);
    const payload = await validator.validate(data);
    next();
  } catch (error) {
    
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return res.status(400).json({
        error: error.messages,
      });
    }else{
      return res.status(500).json({
        message:"internal server error",
        error
      })
    }
  }
};
