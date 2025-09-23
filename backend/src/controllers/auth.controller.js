import Apierror from "../utils/api-error.js"
import Apiresponse from "../utils/api-response.js"
import db from "../index.js"
import userSchema from "../models/user.models.ts"
import { eq } from "drizzle-orm" 
const loginUser=async(req,resp)=>{
    try{
        const {email,password}=req.body
    
        if(!email || !password) throw new Error("Error in Authentication,Incomplete Details")
        // const emailReg=await db.client.query(`Select email from user Where email=${email}`)
        const emailRegObj=await db.conn.select({email:userSchema.email}).from(userSchema).where(eq(userSchema.email,email));
        // console.log(`EMAIL REG=${emailReg.map((obj)=>{
        //     console.log(obj)
        // })}`)
        // const emailReg=Object.values(emailRegObj)
        const emailReg=emailRegObj[0]['email']
        console.log("Email registered==>>",emailReg)
        if(!emailReg) throw new Error("No such User")
        // const passwordReg=await db.client.query(`Select password from user Where email=${email}`)
        const passwordRegObj=await db.conn.select({password:userSchema.password}).from(userSchema).where(eq(userSchema.email,email))
        const passwordReg=passwordRegObj[0]['password']
        console.log("password",passwordReg)
        if(passwordReg!=password) throw new Error("Invalid credentials")
        return resp
            .status(200)
            .json(new Apiresponse(200,{
                user:email
            }
            ,"user Succesfully loged in"))
    }
    catch(e){
        const error_lst=[]
        error_lst.push(e.message)
        console.log(`❌❌ERROR=>${e.message}`)
        throw new Apierror(409,"error in authentication",error_lst)
    }
}

export {loginUser}