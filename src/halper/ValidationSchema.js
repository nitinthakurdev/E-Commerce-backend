import vine, {errors} from "@vinejs/vine";
import { ReviewValidation,AddressValidate } from "../Validations/user.validation.js";

export const checkReviewValidation = async (req, res, next) => {
    try {
      const data = req.body;
      const validator = vine.compile(ReviewValidation);
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


export const checkAddress = async (req, res, next) => {
    try {
      const data = req.body;
      const validator = vine.compile(AddressValidate);
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
