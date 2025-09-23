import Apierror from "../utils/api-error.js"
import Apiresponse from "../utils/api-response.js"
import db from "../index.js"
import userSchema from "../models/user.models.ts"
import { eq } from "drizzle-orm" 
const loginUser=async(req,resp)=>{
    try{
        const {email,password}=req.body
    
        if(!email || !password) throw new Error("Error in Authentication,Incomplete Details")
       
        const emailRegObj=await db.conn.select({email:userSchema.email}).from(userSchema).where(eq(userSchema.email,email));
        const emailReg=emailRegObj[0]['email']
        
        if(!emailReg) throw new Error("No such User")
        
        const passwordRegObj=await db.conn.select({password:userSchema.password}).from(userSchema).where(eq(userSchema.email,email))
        const passwordReg=passwordRegObj[0]['password']

        if(passwordReg!=password) throw new Error("Invalid credentials")
        return resp
            .status(200)
            .json(new Apiresponse(200,{
                user:email
            }
            ,"user Succesfully logged in"))
    }
    catch(e){
        const error_lst=[]
        error_lst.push(e.message)
        console.log(`❌❌ERROR=>${e.message}`)
        throw new Apierror(409,"error in authentication",error_lst)
    }
}

export {loginUser}