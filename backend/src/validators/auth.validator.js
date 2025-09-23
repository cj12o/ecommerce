import { body } from "express-validator";



const userLoginValidator=()=>{
    return [
        body("email")
            .notEmpty()
            .isEmail()
            .withMessage("Invalid email")
        ,body("password")
            .notEmpty()
            .withMessage("password is required")
    ]
}



export {userLoginValidator}





