import { Router } from "express";
import {loginUser,signupUser} from "../controllers/auth.controller.js"
import { userLoginValidator,userSignupValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/auth.middleware.js";
const router=Router()

router.route("/login").post(userLoginValidator(),validate,loginUser)
router.route("/signup").post(userSignupValidator(),validate,signupUser)

export default router