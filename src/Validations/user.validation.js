import vine from "@vinejs/vine";

import { customError } from "./index.validation.js";


vine.errorReporter = () => new customError()


export const RegisterValidation = vine.object({
    fullName:vine.string().minLength(2).maxLength(50) ,
    username:vine.string().minLength(2).maxLength(30) ,
    email:vine.string().email() ,
    password:vine.string().minLength(6).maxLength(16),
    type:vine.string()
})


export const ReviewValidation = vine.object({
    title:vine.string().minLength(4),
    descrition:vine.string().minLength(40),
    rating:vine.number()
})

export const AddressValidate = vine.object({
    fullname: vine.string().minLength(2).maxLength(30),
    phoneNo1: vine.string(),
    pincode: vine.string(),
    country: vine.string(),
    state: vine.string(),
    city: vine.string(),
    houseNo: vine.string(),
    area: vine.string(),
    type: vine.string(),
});
