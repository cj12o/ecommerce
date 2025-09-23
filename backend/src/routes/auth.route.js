import { Router } from "express";
import {loginUser} from "../controllers/auth.controller.js"
import { userLoginValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/auth.middleware.js";
const router=Router()

router.route("/login").post(userLoginValidator(),validate,loginUser)

export default router