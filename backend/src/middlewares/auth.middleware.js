import { validationResult } from "express-validator";
import Apierror  from "../utils/api-error.js";

const validate=(req,resp,next)=>{
    const errors=validationResult(req) //extracts validation errors out of express request ,return obj containg error
    if(errors.isEmpty()){
        return next()
    }
    const errorArray=[]
    errors.array().map((e)=>{
        const obj={
            [e.path]:e.msg
        }
        errorArray.push(obj)
    })
    console.log(errorArray)
    throw new Apierror(422,"Recieved data is invalid",errorArray)
}

export {validate}